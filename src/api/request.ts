import axios, { AxiosRequestConfig } from 'axios';
import router from '@/router';
import { API_ROOT } from '@/constants';
import Auth from '@/Auth';

export const baseRequest = axios.create({ baseURL: `${API_ROOT}` });

baseRequest.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token');

  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

baseRequest.interceptors.response.use((response) => response, (error) => {
  if (error && error.response.status === 401) {
    Auth.deauthenticateUser();
    router.push({ name: 'Login' });
  }

  return Promise.reject(error);
});

export default function<T> (config: AxiosRequestConfig): Promise<T> {
  return baseRequest(config).then((response) => response.data);
}
