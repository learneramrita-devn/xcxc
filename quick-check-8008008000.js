// QUICK CHECK SCRIPT - Run in Browser Console
// Copy and paste this entire script

console.log('🔍 Starting Quick Check for 8008008000...\n');

const API_BASE = 'http://localhost:8080';
const MOBILE = '8008008000';

// Function 1: Check User
async function checkUser() {
  console.log('1️⃣ Checking User API...');
  try {
    const response = await fetch(`${API_BASE}/ums/v1/users/user-check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobileIn: [MOBILE] })
    });
    const data = await response.json();
    console.log('   Status:', response.status);
    console.log('   Response:', data);
    console.log('   User Exists:', data?.isExist ? '✅ YES' : '❌ NO');
    return data;
  } catch (error) {
    console.error('   ❌ Error:', error.message);
    return null;
  }
}

// Function 2: Check Tenant
async function checkTenant() {
  console.log('\n2️⃣ Checking Tenant API...');
  try {
    const response = await fetch(`${API_BASE}/ums/v1/tenant/tenant-check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobileIn: [MOBILE] })
    });
    const data = await response.json();
    console.log('   Status:', response.status);
    console.log('   Response:', data);
    console.log('   Tenant Exists:', data?.isExist ? '✅ YES' : '❌ NO');
    return data;
  } catch (error) {
    console.error('   ❌ Error:', error.message);
    return null;
  }
}

// Function 3: Check LocalStorage
function checkLocalStorage() {
  console.log('\n3️⃣ Checking LocalStorage...');
  const regData = localStorage.getItem('registrationFormData');
  if (regData) {
    const parsed = JSON.parse(regData);
    console.log('   Mobile:', parsed.mobile);
    console.log('   Registration Type:', parsed.registrationType);
    console.log('   Step:', parsed.step);
    console.log('   Full Data:', parsed);
  } else {
    console.log('   ❌ No registration data found');
  }
}

// Run all checks
async function runAllChecks() {
  const userResult = await checkUser();
  const tenantResult = await checkTenant();
  checkLocalStorage();
  
  console.log('\n📊 SUMMARY:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Mobile Number:', MOBILE);
  console.log('User Exists:', userResult?.isExist ? '✅ YES' : '❌ NO');
  console.log('Tenant Exists:', tenantResult?.isExist ? '✅ YES' : '❌ NO');
  
  if (userResult?.isExist) {
    console.log('\n✅ FOUND AS USER');
    console.log('   User ID:', userResult?.userId);
    console.log('   This is a USER registration, not TENANT');
  }
  
  if (tenantResult?.isExist) {
    console.log('\n✅ FOUND AS TENANT');
    console.log('   Tenant ID:', tenantResult?.tenantId);
    console.log('   This is a TENANT registration');
  }
  
  if (!userResult?.isExist && !tenantResult?.isExist) {
    console.log('\n❌ NOT FOUND');
    console.log('   Registration may have failed');
    console.log('   Or backend is not running');
  }
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// Execute
runAllChecks();
