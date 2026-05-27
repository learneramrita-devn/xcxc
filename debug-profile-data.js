// Debug script for user profile data
// Run this in browser console after login

console.log('=== USER PROFILE DEBUG ===\n');

// 1. Check logged in user info
const userId = localStorage.getItem('userId');
const userRole = localStorage.getItem('userRole');
const tenantId = localStorage.getItem('tenantId');

console.log('1. User Info from localStorage:');
console.log('User ID:', userId);
console.log('User Role:', userRole);
console.log('Tenant ID:', tenantId);
console.log('\n');

// 2. Fetch user profile data
if (userId) {
  console.log('2. Fetching profile data from API...');
  
  fetch('http://13.126.207.62:8080/ums/v1/users/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (localStorage.getItem('authToken') || sessionStorage.getItem('authToken'))
    },
    body: JSON.stringify({
      userIdList: [parseInt(userId)]
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('API Response:', data);
    
    if (data.userList && data.userList[0]) {
      const user = data.userList[0];
      
      console.log('\n3. User Profile Data:');
      console.log('Name:', user.name);
      console.log('Email:', user.email);
      console.log('Mobile:', user.mobileNumber);
      
      console.log('\n4. Address Info:');
      console.log('Full Object:', user.addressInfo);
      console.log('Address:', user.addressInfo?.address);
      console.log('Country:', user.addressInfo?.country);
      console.log('State:', user.addressInfo?.state);
      console.log('City:', user.addressInfo?.cityName);
      console.log('Pincode:', user.addressInfo?.pinCode);
      
      console.log('\n5. User Documents:');
      console.log('Full Object:', user.userDocuments);
      console.log('Aadhaar:', user.userDocuments?.adr);
      console.log('PAN:', user.userDocuments?.pan);
      console.log('GST:', user.userDocuments?.gst);
      
      console.log('\n6. Profile Info:');
      console.log('Full Object:', user.userProfileInfo);
      console.log('Full Name:', user.userProfileInfo?.fn);
      console.log('Gender:', user.userProfileInfo?.gdr);
      console.log('DOB:', user.userProfileInfo?.dob);
      console.log('Zip:', user.userProfileInfo?.zip);
      console.log('City:', user.userProfileInfo?.zd);
      
      console.log('\n7. Business Info:');
      console.log('Full Object:', user.businessInfo);
      console.log('Business Name:', user.businessInfo?.bsn);
      console.log('Business Type:', user.businessInfo?.bstp);
      
      console.log('\n=== ANALYSIS ===');
      console.log('Missing Fields:');
      if (!user.addressInfo?.address) console.log('❌ Address is empty');
      if (!user.addressInfo?.country) console.log('❌ Country is empty');
      if (!user.addressInfo?.state) console.log('❌ State is empty');
      if (!user.addressInfo?.cityName) console.log('❌ City is empty');
      if (!user.addressInfo?.pinCode) console.log('❌ Pincode is empty');
      if (!user.userDocuments?.adr) console.log('❌ Aadhaar is empty');
      if (!user.userDocuments?.pan) console.log('❌ PAN is empty');
      
      console.log('\n✅ Fields with data:');
      if (user.addressInfo?.address) console.log('✅ Address:', user.addressInfo.address);
      if (user.addressInfo?.country) console.log('✅ Country:', user.addressInfo.country);
      if (user.addressInfo?.state) console.log('✅ State:', user.addressInfo.state);
      if (user.addressInfo?.cityName) console.log('✅ City:', user.addressInfo.cityName);
      if (user.addressInfo?.pinCode) console.log('✅ Pincode:', user.addressInfo.pinCode);
      if (user.userDocuments?.adr) console.log('✅ Aadhaar:', user.userDocuments.adr);
      if (user.userDocuments?.pan) console.log('✅ PAN:', user.userDocuments.pan);
    }
  })
  .catch(error => {
    console.error('❌ Error fetching profile:', error);
  });
} else {
  console.log('❌ User ID not found in localStorage');
  console.log('Please login first');
}
