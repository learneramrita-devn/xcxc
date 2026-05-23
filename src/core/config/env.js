export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '',
  FLIGHT_API_BASE_URL: import.meta.env.VITE_FLIGHT_API_BASE_URL || '',
  API_TIMEOUT: 30000,
  TENANT_ID: import.meta.env.VITE_TENANT_ID ? Number(import.meta.env.VITE_TENANT_ID) : null,
};
