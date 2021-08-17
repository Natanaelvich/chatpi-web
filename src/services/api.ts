/* eslint-disable no-underscore-dangle */
import { signOut } from '@/hooks/modules/AuthContext';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

import { urls } from '../constants';

const api = axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    Authorization: `Bearer ${Cookies.get('chatpitoken')}`,
  },
});

let isRefreshing = false;
let failedRequestsQueue: any[] = [];

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response.status === 401) {
      const chatpirefreshtoken = Cookies.get('chatpirefreshtoken');
      const originalConfig = error.config;

      if (!isRefreshing) {
        isRefreshing = true;

        return api
          .post(`sessions/refresh-token?token=${chatpirefreshtoken}`)
          .then(response => {
            const { token, refresh_token } = response.data;

            Cookies.set('chatpirefreshtoken', refresh_token);
            Cookies.set('chatpitoken', token);

            api.defaults.headers.Authorization = `Bearer ${token}`;

            failedRequestsQueue.forEach(request => request.onSuccess(token));
            failedRequestsQueue = [];
          })
          .catch(err => {
            failedRequestsQueue.forEach(request => request.onFailure(err));
            failedRequestsQueue = [];

            signOut();
          })
          .finally(() => {
            isRefreshing = false;
          });
      }

      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          onSuccess: (token: string) => {
            originalConfig.headers.Authorization = `Bearer ${token}`;

            resolve(api(originalConfig));
          },
          onFailure: (err: AxiosError) => {
            reject(err);
          },
        });
      });
    }
    return Promise.reject(error);
  },
);

export default api;
