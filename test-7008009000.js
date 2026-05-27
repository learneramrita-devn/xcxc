// Test Script for 7008009000 Registration Issue
// Run this in browser console to debug

console.log('=== TESTING USER 7008009000 ===');

const API_BASE = 'http://localhost:8080';
const MOBILE = '7008009000';

// Test 1: Check if user exists
async function testUserCheck() {
  console.log('\n--- TEST 1: User Check ---');
  try {
    const response = await fetch(`${API_BASE}/ums/v1/users/user-check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobileIn: [MOBILE] })
    });
    
    const data = await response.json();
    console.log('Response Status:', response.status);
    console.log('Response Data:', data);
    console.log('User Exists:', data?.isExist);
    console.log('Type of isExist:', typeof data?.isExist);
    
    return data;
  } catch (error) {
    console.error('User Check Failed:', error);
    return null;
  }
}

// Test 2: Check if tenant exists
async function testTenantCheck() {
  console.log('\n--- TEST 2: Tenant Check ---');
  try {
    const response = await fetch(`${API_BASE}/ums/v1/tenant/tenant-check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobileIn: [MOBILE] })
    });
    
    const data = await response.json();
    console.log('Response Status:', response.status);
    console.log('Response Data:', data);
    console.log('Tenant Exists:', data?.isExist);
    
    return data;
  } catch (error) {
    console.error('Tenant Check Failed:', error);
    return null;
  }
}

// Test 3: Check localStorage
function testLocalStorage() {
  console.log('\n--- TEST 3: LocalStorage Check ---');
  const registrationData = localStorage.getItem('registrationFormData');
  if (registrationData) {
    console.log('Registration Data Found:');
    console.log(JSON.parse(registrationData));
  } else {
    console.log('No registration data in localStorage');
  }
}

// Test 4: Try login
async function testLogin(password) {
  console.log('\n--- TEST 4: Login Test ---');
  if (!password) {
    console.log('Please provide password: testLogin("your_password")');
    return;
  }
  
  try {
    const response = await fetch(`${API_BASE}/ums/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: MOBILE,
        password: password,
        tenantId: 1,
        deviceId: 'test-device',
        deviceInfo: {
          browser: 'Chrome',
          os: 'Windows',
          isMobile: false
        }
      })
    });
    
    const data = await response.json();
    console.log('Response Status:', response.status);
    console.log('Response Data:', data);
    
    if (data.accessToken) {
      console.log('✅ Login Successful!');
      console.log('Access Token:', data.accessToken.substring(0, 50) + '...');
    } else {
      console.log('❌ Login Failed');
    }
    
    return data;
  } catch (error) {
    console.error('Login Failed:', error);
    return null;
  }
}

// Run all tests
async function runAllTests() {
  console.log('🚀 Starting All Tests...\n');
  
  const userCheck = await testUserCheck();
  const tenantCheck = await testTenantCheck();
  testLocalStorage();
  
  console.log('\n=== SUMMARY ===');
  console.log('User Exists:', userCheck?.isExist || false);
  console.log('Tenant Exists:', tenantCheck?.isExist || false);
  console.log('\nTo test login, run: testLogin("your_password")');
}

// Export functions to window
window.testUserCheck = testUserCheck;
window.testTenantCheck = testTenantCheck;
window.testLocalStorage = testLocalStorage;
window.testLogin = testLogin;
window.runAllTests = runAllTests;

console.log('✅ Test functions loaded!');
console.log('Run: runAllTests() to start testing');
console.log('Or run individual tests:');
console.log('  - testUserCheck()');
console.log('  - testTenantCheck()');
console.log('  - testLocalStorage()');
console.log('  - testLogin("password")');
