import axios from 'axios';

const API_BASE_URL = 'https://car-rental-api.goit.global';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
