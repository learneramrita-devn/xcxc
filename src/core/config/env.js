export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://13.126.207.62:8080',
  FLIGHT_API_BASE_URL: import.meta.env.VITE_FLIGHT_API_BASE_URL || 'http://13.126.207.62',
  API_TIMEOUT: 30000,
  TENANT_ID: import.meta.env.VITE_TENANT_ID ? Number(import.meta.env.VITE_TENANT_ID) : 1,
};

// Log configuration in development
if (import.meta.env.DEV) {
  console.log('🔧 Environment Configuration:');
  console.log('API_BASE_URL:', ENV.API_BASE_URL);
  console.log('FLIGHT_API_BASE_URL:', ENV.FLIGHT_API_BASE_URL);
  console.log('TENANT_ID:', ENV.TENANT_ID);
}
