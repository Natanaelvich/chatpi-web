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

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    const originalConfig = error.config;
    if (error.response.status === 401) {
      const chatpirefreshtoken = Cookies.get('chatpirefreshtoken');

      if (chatpirefreshtoken && !isRefreshing) {
        isRefreshing = true;

        return api
          .post(`sessions/refresh-token?token=${chatpirefreshtoken}`)
          .then(response => {
            const { token, refresh_token } = response.data;

            Cookies.set('chatpirefreshtoken', refresh_token);
            Cookies.set('chatpitoken', token);

            api.defaults.headers.Authorization = `Bearer ${token}`;
            originalConfig.headers.Authorization = `Bearer ${token}`;

            return api(originalConfig);
          })
          .catch(() => {
            signOut();
            return Promise.reject(error);
          })
          .finally(() => {
            isRefreshing = false;
          });
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);
export default api;
