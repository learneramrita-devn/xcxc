// PROFILE DATA CHECK - Run in Browser Console
// Login first with: 9889880000 / vedam@gmail.com / Test#123

console.clear();
console.log('🔍 CHECKING PROFILE DATA...\n');

const userId = localStorage.getItem('userId');
const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

if (!userId || !token) {
  console.error('❌ Not logged in! Please login first.');
} else {
  console.log('✅ User ID:', userId);
  console.log('✅ Token found\n');
  
  fetch('http://13.126.207.62:8080/ums/v1/users/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ userIdList: [parseInt(userId)] })
  })
  .then(r => r.json())
  .then(data => {
    console.log('📦 API Response:', data);
    
    if (!data.userList || !data.userList[0]) {
      console.error('❌ No user data found in response');
      return;
    }
    
    const user = data.userList[0];
    
    console.log('\n📋 BASIC INFO:');
    console.log('Name:', user.name || '❌ EMPTY');
    console.log('Email:', user.email || '❌ EMPTY');
    console.log('Mobile:', user.mobileNumber || '❌ EMPTY');
    
    console.log('\n🏠 ADDRESS INFO:');
    if (!user.addressInfo) {
      console.log('❌ addressInfo object is NULL/UNDEFINED');
    } else {
      console.log('Address:', user.addressInfo.address || '❌ EMPTY');
      console.log('Country:', user.addressInfo.country || '❌ EMPTY');
      console.log('State:', user.addressInfo.state || '❌ EMPTY');
      console.log('City:', user.addressInfo.cityName || '❌ EMPTY');
      console.log('Pincode:', user.addressInfo.pinCode || '❌ EMPTY');
    }
    
    console.log('\n📄 DOCUMENTS:');
    if (!user.userDocuments) {
      console.log('❌ userDocuments object is NULL/UNDEFINED');
    } else {
      console.log('Aadhaar:', user.userDocuments.adr || '❌ EMPTY');
      console.log('PAN:', user.userDocuments.pan || '❌ EMPTY');
      console.log('GST:', user.userDocuments.gst || '❌ EMPTY');
    }
    
    console.log('\n🏢 COMPANY/BUSINESS INFO:');
    if (!user.businessInfo) {
      console.log('❌ businessInfo object is NULL/UNDEFINED');
    } else {
      console.log('Agency Name:', user.businessInfo.bsn || '❌ EMPTY');
      console.log('Business Type:', user.businessInfo.bstp || '❌ EMPTY');
    }
    
    console.log('\n👤 PROFILE INFO:');
    if (!user.userProfileInfo) {
      console.log('❌ userProfileInfo object is NULL/UNDEFINED');
    } else {
      console.log('Full Name:', user.userProfileInfo.fn || '❌ EMPTY');
      console.log('Gender:', user.userProfileInfo.gdr || '❌ EMPTY');
      console.log('DOB:', user.userProfileInfo.dob || '❌ EMPTY');
    }
    
    console.log('\n💰 BANK INFO:');
    if (!user.userAdditionalInfo || !user.userAdditionalInfo.bal || !user.userAdditionalInfo.bal[0]) {
      console.log('❌ Bank info is NULL/UNDEFINED');
    } else {
      const bank = user.userAdditionalInfo.bal[0];
      console.log('Account Name:', bank.ahn || '❌ EMPTY');
      console.log('Account Number:', bank.accNo || '❌ EMPTY');
      console.log('IFSC:', bank.ifsc || '❌ EMPTY');
      console.log('Bank Name:', bank.bn || '❌ EMPTY');
    }
    
    console.log('\n\n📊 SUMMARY:');
    const hasAddress = user.addressInfo?.address;
    const hasAadhaar = user.userDocuments?.adr;
    const hasPAN = user.userDocuments?.pan;
    const hasCompany = user.businessInfo?.bsn;
    
    if (!hasAddress && !hasAadhaar && !hasPAN && !hasCompany) {
      console.log('❌ ALL FIELDS ARE EMPTY!');
      console.log('\n💡 REASON: Data was not saved during registration.');
      console.log('📝 SOLUTION: Fill these fields in profile page and click Save.');
    } else {
      console.log('✅ Some fields have data:');
      if (hasAddress) console.log('  ✅ Address');
      if (hasAadhaar) console.log('  ✅ Aadhaar');
      if (hasPAN) console.log('  ✅ PAN');
      if (hasCompany) console.log('  ✅ Company');
      
      console.log('\n❌ Missing fields:');
      if (!hasAddress) console.log('  ❌ Address');
      if (!hasAadhaar) console.log('  ❌ Aadhaar');
      if (!hasPAN) console.log('  ❌ PAN');
      if (!hasCompany) console.log('  ❌ Company');
    }
  })
  .catch(error => {
    console.error('❌ API ERROR:', error);
  });
}
