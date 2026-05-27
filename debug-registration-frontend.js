// Run this in browser console to debug registration issue

console.log('=== FRONTEND REGISTRATION DEBUG ===\n');

// 1. Check localStorage for tokens
console.log('1. Checking localStorage:');
console.log('Access Token:', localStorage.getItem('accessToken') ? 'EXISTS' : 'NOT FOUND');
console.log('Refresh Token:', localStorage.getItem('refreshToken') ? 'EXISTS' : 'NOT FOUND');
console.log('User ID:', localStorage.getItem('userId'));
console.log('User Role:', localStorage.getItem('userRole'));
console.log('\n');

// 2. Check sessionStorage
console.log('2. Checking sessionStorage:');
console.log('Access Token:', sessionStorage.getItem('accessToken') ? 'EXISTS' : 'NOT FOUND');
console.log('Refresh Token:', sessionStorage.getItem('refreshToken') ? 'EXISTS' : 'NOT FOUND');
console.log('\n');

// 3. Check environment variables
console.log('3. Environment Variables:');
console.log('API Base URL:', import.meta?.env?.VITE_API_BASE_URL || 'NOT SET');
console.log('Tenant ID:', import.meta?.env?.VITE_TENANT_ID || 'NOT SET');
console.log('\n');

// 4. Test registration endpoint WITHOUT token
console.log('4. Testing registration endpoint (without token):');
const testPayload = {
  tenant: { tenantId: 1 },
  externalUserId: "EXT-USR-" + Date.now(),
  role: "AGENT",
  name: "TEST USER",
  email: "test" + Date.now() + "@example.com",
  mobileNumber: "9999999999",
  passwordHash: "Test@123",
  agentType: "AGENCY",
  status: "ENABLED",
  userSource: "WEB",
  userAdditionalInfo: {
    rc: "", rfb: "SYSTEM", grade: "A", ft: "PRIVATE",
    bal: [{ bn: "", accNo: "", ifsc: "", cmts: "", ahn: "TEST USER", vl: "PRIMARY", bt: "SAVINGS" }],
    ael: [], cncd: "IN", curr: "INR"
  },
  userProfileInfo: {
    gdr: "MALE", dob: "1995-01-01", zip: "110001", fn: "TEST USER",
    zd: "Delhi", co: "", pi: "", tz: "Asia/Kolkata", language: "EN", lurl: ""
  },
  userDocuments: { pan: "ABCDE1234F", adr: "123412341234" },
  addressInfo: {
    address: "Test Address", pinCode: "110001", cityName: "Delhi",
    state: "Delhi", country: "India"
  },
  contactPersonInfo: {
    name: "TEST USER", mobileNumber: "9999999999", email: "test@example.com"
  },
  businessInfo: { bstp: "TRAVEL", bsn: "Test Agency", rflcd: "" },
  securityInfo: { ip: "", di: navigator.userAgent, gl: "" },
  kycInfo: { ks: "PENDING", ksa: new Date().toISOString() },
  lifeCycleInfo: { iat: new Date().toISOString(), aat: null, sat: null, ovat: null }
};

fetch('http://13.126.207.62:8080/api/v1/users/create', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json'
    // NO Authorization header
  },
  body: JSON.stringify(testPayload)
})
.then(response => {
  console.log('Response Status:', response.status);
  return response.json();
})
.then(data => {
  console.log('Response Data:', data);
  if (data.userId) {
    console.log('✅ SUCCESS: User created with ID:', data.userId);
  } else if (data.errors) {
    console.log('❌ ERROR:', data.errors[0]?.message);
    console.log('Error Code:', data.errors[0]?.errCode);
  }
})
.catch(error => {
  console.error('❌ FETCH ERROR:', error);
});

console.log('\n5. Instructions:');
console.log('- If you see "EXISTS" for tokens, clear them: localStorage.clear()');
console.log('- If response is 401, backend needs to make endpoint public');
console.log('- If response is 200, registration is working!');
