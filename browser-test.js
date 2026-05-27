// BROWSER CONSOLE TEST - Copy paste this in browser console

console.log('🧪 Testing Backend API from Browser...\n');

// Test 1: Check environment
console.log('1️⃣ Environment Check:');
console.log('API Base URL:', import.meta?.env?.VITE_API_BASE_URL || 'Not available (run after page load)');

// Test 2: Simple fetch test
console.log('\n2️⃣ Testing user-check endpoint...');
fetch('http://13.126.207.62/ums/v1/users/user-check', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    mobileIn: ['9999999999']
  })
})
.then(response => {
  console.log('✅ Response received');
  console.log('Status:', response.status);
  console.log('Status Text:', response.statusText);
  console.log('Headers:', Object.fromEntries(response.headers.entries()));
  return response.json();
})
.then(data => {
  console.log('✅ Data:', data);
})
.catch(error => {
  console.error('❌ Error:', error);
  console.error('Error name:', error.name);
  console.error('Error message:', error.message);
  
  if (error.message.includes('CORS')) {
    console.log('\n🔴 CORS ERROR DETECTED!');
    console.log('Backend needs to add CORS headers:');
    console.log('Access-Control-Allow-Origin: http://localhost:5173');
    console.log('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    console.log('Access-Control-Allow-Headers: Content-Type');
  }
});

// Test 3: Registration endpoint
console.log('\n3️⃣ Testing registration endpoint...');
setTimeout(() => {
  fetch('http://13.126.207.62/ums/v1/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tenantId: 1,
      name: "Browser Test",
      email: "test@browser.com",
      mobileNumber: "9999999999",
      passwordHash: "Test@123",
      role: "AGENT",
      agentType: "AGENCY",
      status: "ENABLED",
      userSource: "WEB"
    })
  })
  .then(response => {
    console.log('✅ Registration response received');
    console.log('Status:', response.status);
    return response.json();
  })
  .then(data => {
    console.log('✅ Registration data:', data);
  })
  .catch(error => {
    console.error('❌ Registration error:', error);
  });
}, 2000);

console.log('\n⏳ Tests running... Check results above ☝️');
