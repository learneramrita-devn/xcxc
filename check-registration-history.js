// REGISTRATION DEBUG SCRIPT
// Run this in console to see what happened during registration

console.log('🔍 Checking Registration History...\n');

// Check localStorage
const regData = localStorage.getItem('registrationFormData');
if (regData) {
  const data = JSON.parse(regData);
  console.log('📦 Registration Data Found:');
  console.log('   Mobile:', data.mobile);
  console.log('   Registration Type:', data.registrationType);
  console.log('   Current Step:', data.step);
  console.log('   Register Data:', data.registerData);
  console.log('\n');
  
  if (data.step === 'success') {
    console.log('✅ Registration reached SUCCESS step');
    console.log('   But tenant check shows: isExist = false');
    console.log('   This means API call failed or returned error');
  } else {
    console.log('❌ Registration did NOT complete');
    console.log('   Stopped at step:', data.step);
  }
} else {
  console.log('❌ No registration data in localStorage');
  console.log('   Registration may not have started');
}

// Check if there are any console errors
console.log('\n📋 Instructions:');
console.log('1. Open Network tab');
console.log('2. Filter by: Fetch/XHR');
console.log('3. Look for: /ums/v1/tenant/save or /api/v1/users/create');
console.log('4. Check if request was made');
console.log('5. Check response status and data');
console.log('\nIf NO request found:');
console.log('   → Registration form did not submit');
console.log('   → Check if Terms were accepted');
console.log('   → Check console for JavaScript errors');
console.log('\nIf request found with ERROR:');
console.log('   → Check response body for error message');
console.log('   → Share the error details');
