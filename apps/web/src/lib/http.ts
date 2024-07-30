import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { env } from './env';

export const apiUrl = `${env.NEXT_PUBLIC_API_PROTOCOL}://${env.NEXT_PUBLIC_API_HOST}:${env.NEXT_PUBLIC_API_PORT}`;

axios.defaults.baseURL = apiUrl;

export type HttpRequestConfig = AxiosRequestConfig;

export type HttpError = AxiosError;

function setJwt(token: string) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

function isNotFoundError(error: unknown): boolean {
  if (axios.isAxiosError(error) && error.response?.status === 404) {
    return true;
  }
  return false;
}

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
  setJwt,
  isError: axios.isAxiosError,
  isNotFoundError,
};

export default http;
