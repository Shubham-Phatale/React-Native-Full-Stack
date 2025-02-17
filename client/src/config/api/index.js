import axios from 'axios';

const BASE_URL = 'http://192.168.1.152:8080/api/v1';

export const axiosClient = axios.create({
  baseURL: BASE_URL,
});

export const REGISTER = '/auth/register';
export const LOGIN = '/auth/login';
export const HOME = '/home';
