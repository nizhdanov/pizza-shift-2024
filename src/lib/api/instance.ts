import axios from 'axios';

export const dadataInstance = axios.create({
  baseURL: import.meta.env.DADATA_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Token ${import.meta.env.DADATA_API_KEY}`
  }
});
