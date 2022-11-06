import * as axiosLib from 'axios';
import { BASE_URL, API_VERSION, CLIENT_ID } from '../../config';

const axios = axiosLib.default.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Accept-Version": API_VERSION,
    "Authorization": `Client-ID ${CLIENT_ID}`
  }
});

export default axios;
