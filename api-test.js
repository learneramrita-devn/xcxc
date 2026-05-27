// API Test Utility - Run this in browser console to diagnose issues

console.log('=== API DIAGNOSTICS ===');

// 1. Check environment variables
console.log('1. Environment Variables:');
console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
console.log('VITE_TENANT_ID:', import.meta.env.VITE_TENANT_ID);

// 2. Test basic connectivity
console.log('\n2. Testing Backend Connectivity...');
fetch('http://13.126.207.62')
  .then(res => {
    console.log('✅ Backend is reachable');
    console.log('Status:', res.status);
    return res.text();
  })
  .then(text => console.log('Response:', text))
  .catch(err => console.error('❌ Backend not reachable:', err));

// 3. Test registration endpoint
console.log('\n3. Testing Registration Endpoint...');
const testPayload = {
  tenantId: 1,
  name: "Test User",
  email: "test@example.com",
  mobileNumber: "9999999999",
  passwordHash: "Test@123",
  role: "AGENT",
  agentType: "AGENCY",
  status: "ENABLED",
  userSource: "WEB"
};

fetch('http://13.126.207.62/ums/v1/users/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testPayload)
})
  .then(res => {
    console.log('✅ Registration endpoint responded');
    console.log('Status:', res.status);
    console.log('Headers:', Object.fromEntries(res.headers.entries()));
    return res.json();
  })
  .then(data => console.log('Response Data:', data))
  .catch(err => {
    console.error('❌ Registration endpoint error:', err);
    console.error('Error name:', err.name);
    console.error('Error message:', err.message);
  });

// 4. Check CORS
console.log('\n4. CORS Check:');
console.log('If you see CORS error above, backend needs to add:');
console.log('Access-Control-Allow-Origin: *');
console.log('Access-Control-Allow-Methods: POST, GET, OPTIONS');
console.log('Access-Control-Allow-Headers: Content-Type');

console.log('\n=== END DIAGNOSTICS ===');
