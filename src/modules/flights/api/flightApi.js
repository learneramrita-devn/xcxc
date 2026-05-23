import axios from 'axios';
import { ENV } from '../../../core/config/env';

const flightClient = axios.create({
  baseURL: ENV.FLIGHT_API_BASE_URL,
  timeout: ENV.API_TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
});

flightClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

flightClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.errors?.[0]?.details
      || error.response?.data?.errors?.[0]?.message
      || error.response?.data?.message
      || error.message
      || 'Something went wrong';
    const err = new Error(message);
    err.status = error.response?.status;
    err.errCode = error.response?.data?.errors?.[0]?.errCode;
    return Promise.reject(err);
  }
);

const ENDPOINTS = {
  SEARCH:          '/fms/v1/search',
  REVIEW:          '/fms/v1/airlines/review',
  BOOK:            '/fms/v1/airlines/book',
  BOOK_RETRIEVE:   '/fms/v1/airlines/book-retrieve',
  AIRLINES_LIST:   '/fms/v1/airlines/list',
  AIRLINES_SAVE:   '/fms/v1/airlines/save',
  AIRLINES_UPDATE: '/fms/v1/airlines/update',
  AIRLINES_DELETE: '/fms/v1/airlines/delete',
  AIRPORT_SAVE:    '/fms/v1/airport/save',
};

export const searchFlightsApi    = (payload) => flightClient.post(ENDPOINTS.SEARCH, payload);
export const reviewFlightApi     = (payload) => flightClient.post(ENDPOINTS.REVIEW, payload);
export const bookFlightApi       = (payload) => flightClient.post(ENDPOINTS.BOOK, payload);
export const bookRetrieveApi     = (payload) => flightClient.post(ENDPOINTS.BOOK_RETRIEVE, payload);
export const getAirlinesListApi  = ()         => flightClient.get(ENDPOINTS.AIRLINES_LIST);
export const saveAirlineApi      = (payload) => flightClient.post(ENDPOINTS.AIRLINES_SAVE, payload);
export const updateAirlineApi    = (payload) => flightClient.put(ENDPOINTS.AIRLINES_UPDATE, payload);
export const deleteAirlineApi    = (payload) => flightClient.delete(ENDPOINTS.AIRLINES_DELETE, { data: payload });
export const saveAirportApi      = (payload) => flightClient.post(ENDPOINTS.AIRPORT_SAVE, payload);
