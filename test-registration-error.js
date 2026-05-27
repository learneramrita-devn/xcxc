// Run this in browser console to see detailed error

console.clear();
console.log('🔍 Testing Registration API...\n');

// Get form data from localStorage
const savedData = localStorage.getItem('registrationFormData');
if (savedData) {
  const data = JSON.parse(savedData);
  console.log('📋 Saved Registration Data:', data);
  console.log('\n');
}

// Test payload
const testPayload = {
  firstName: "John",
  lastName: "Doe",
  email: "test" + Date.now() + "@example.com",
  mobile: "9999999999",
  mobileNumber: "9999999999",
  passwordHash: "Test@123",
  tenantType: "API_PARTNER",
  agentType: "API_PARTNER",
  status: "ENABLED",
  userSource: "WEB",
  role: "AGENT",
  name: "JOHN DOE",
  externalUserId: "EXT-USR-" + Date.now(),
  
  tenantProfileInfo: {
    gdr: "MALE",
    dob: "1990-01-01",
    zip: "110001",
    fn: "JOHN DOE",
    ln: "Doe",
    zd: "Delhi",
    co: "India",
    tz: "Asia/Kolkata",
    language: "EN",
    lurl: ""
  },
  
  identityDocuments: {
    pan: "ABCDE1234F",
    adr: "123456789012",
    cin: "",
    gst: ""
  },
  
  addressInfo: {
    address: "Test Address",
    pinCode: "110001",
    cityName: "Delhi",
    state: "Delhi",
    country: "India"
  },
  
  contactPersonInfo: {
    name: "JOHN DOE",
    mobileNumber: "9999999999",
    email: "test@example.com"
  },
  
  businessInfo: {
    bstp: "TRAVEL",
    bsn: "Test Company",
    rflcd: ""
  },
  
  securityInfo: {
    ip: "",
    di: navigator.userAgent,
    gl: ""
  },
  
  kycInfo: {
    ks: "PENDING",
    ksa: new Date().toISOString()
  },
  
  lifeCycleInfo: {
    iat: new Date().toISOString(),
    aat: null,
    sat: null,
    ovat: null
  }
};

console.log('📦 Test Payload:', JSON.stringify(testPayload, null, 2));
console.log('\n🚀 Sending request to backend...\n');

fetch('http://13.126.207.62:8080/ums/v1/tenant/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(testPayload)
})
.then(response => {
  console.log('📡 Response Status:', response.status);
  console.log('📡 Response Status Text:', response.statusText);
  return response.json();
})
.then(data => {
  console.log('\n✅ Response Data:', data);
  
  if (data.errors) {
    console.log('\n❌ Backend Errors:');
    data.errors.forEach((err, index) => {
      console.log(`\nError ${index + 1}:`);
      console.log('  Code:', err.errCode);
      console.log('  Message:', err.message);
      console.log('  Details:', err.details);
    });
  }
  
  if (data.status) {
    console.log('\n📊 Status:', data.status);
  }
})
.catch(error => {
  console.error('\n❌ Fetch Error:', error);
  console.error('Error Message:', error.message);
});

console.log('\n⏳ Waiting for response...');
console.log('Check Network tab for more details');
