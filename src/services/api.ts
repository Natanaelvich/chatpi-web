import axios from 'axios';
import { urls } from '../constants';

const api = axios.create({
  baseURL: urls[process.env.NODE_ENV],
});

export default api;
