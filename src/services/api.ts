import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.pi.mundotech.dev',
});

export default api;
