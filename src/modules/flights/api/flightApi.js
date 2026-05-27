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
  SEARCH:           '/fms/v1/search',
  REVIEW:           '/fms/v1/review',
  BOOK:             '/fms/v1/book',
  BOOK_RETRIEVE:    '/fms/v1/book-retrieve',
  AIRLINE_LIST:     '/fms/v1/airline/list',
  AIRLINES_SAVE:    '/fms/v1/airlines/save',
  AIRPORT_SAVE:     '/fms/v1/airport/save',
  SUPPLIER_SAVE:    '/fms/v1/supplier-info/save',
  SUPPLIER_LIST:    '/fms/v1/supplier/list',
};

export const searchFlightsApi     = (payload) => flightClient.post(ENDPOINTS.SEARCH, payload);
export const reviewFlightApi      = (payload) => flightClient.post(ENDPOINTS.REVIEW, payload);
export const bookFlightApi        = (payload) => flightClient.post(ENDPOINTS.BOOK, payload);
export const bookRetrieveApi      = (payload) => flightClient.post(ENDPOINTS.BOOK_RETRIEVE, payload);
export const getAirlineListApi    = ()         => flightClient.get(ENDPOINTS.AIRLINE_LIST);
export const saveAirlinesApi      = (payload) => flightClient.post(ENDPOINTS.AIRLINES_SAVE, payload);
export const saveAirportApi       = (payload) => flightClient.post(ENDPOINTS.AIRPORT_SAVE, payload);
export const saveSupplierInfoApi  = (payload) => flightClient.post(ENDPOINTS.SUPPLIER_SAVE, payload);
export const getSupplierListApi   = ()         => flightClient.get(ENDPOINTS.SUPPLIER_LIST);
