// 🧪 PAYLOAD VALIDATION TEST SCRIPT
// Run this in browser console or Node.js to validate your payload

/**
 * Validates tenant registration payload structure
 * @param {Object} payload - The payload to validate
 * @returns {Object} - Validation results
 */
function validateTenantPayload(payload) {
  console.log('🔍 Starting Payload Validation...\n');
  
  const results = {
    passed: [],
    failed: [],
    warnings: []
  };

  // Helper function to check field
  const check = (condition, message, isWarning = false) => {
    if (condition) {
      results.passed.push(`✅ ${message}`);
      return true;
    } else {
      if (isWarning) {
        results.warnings.push(`⚠️  ${message}`);
      } else {
        results.failed.push(`❌ ${message}`);
      }
      return false;
    }
  };

  console.log('📋 Checking Root Level Fields...');
  
  // Root level required fields
  check(payload.tenantType, 'tenantType exists');
  check(payload.tenantStatus, 'tenantStatus exists');
  check(payload.companyName, 'companyName exists');
  check(payload.firstName, 'firstName exists');
  check(payload.lastName, 'lastName exists');
  check(payload.email, 'email exists');
  check(payload.mobile, 'mobile exists (not mobileNumber)');
  check(payload.password, 'password exists (not passwordHash)');
  
  // Check for wrong field names
  check(!payload.mobileNumber, 'mobileNumber does NOT exist (should be mobile)');
  check(!payload.passwordHash, 'passwordHash does NOT exist (should be password)');
  check(!payload.externalUserId, 'externalUserId does NOT exist (not needed)');
  check(!payload.role, 'role does NOT exist (not needed)');
  check(!payload.agentType, 'agentType does NOT exist (not needed)');
  check(!payload.status, 'status does NOT exist (should be tenantStatus)');
  check(!payload.userSource, 'userSource does NOT exist (not needed)');

  console.log('\n📦 Checking Nested Objects...');
  
  // tenantAdditionalInfo
  check(payload.tenantAdditionalInfo, 'tenantAdditionalInfo exists');
  if (payload.tenantAdditionalInfo) {
    check('rc' in payload.tenantAdditionalInfo, 'tenantAdditionalInfo.rc exists');
    check('aud' in payload.tenantAdditionalInfo, 'tenantAdditionalInfo.aud exists');
    check('iaad' in payload.tenantAdditionalInfo, 'tenantAdditionalInfo.iaad exists');
    check('iev' in payload.tenantAdditionalInfo, 'tenantAdditionalInfo.iev exists');
    check('imv' in payload.tenantAdditionalInfo, 'tenantAdditionalInfo.imv exists');
    check('notes' in payload.tenantAdditionalInfo, 'tenantAdditionalInfo.notes exists');
  }

  // kycDetails
  check(payload.kycDetails, 'kycDetails exists (not kycInfo)');
  check(!payload.kycInfo, 'kycInfo does NOT exist (should be kycDetails)');
  if (payload.kycDetails) {
    check('firmType' in payload.kycDetails, 'kycDetails.firmType exists');
    check('gst' in payload.kycDetails, 'kycDetails.gst exists');
    check('pan' in payload.kycDetails, 'kycDetails.pan exists');
    check('aadhaar' in payload.kycDetails, 'kycDetails.aadhaar exists');
    check('companyPan' in payload.kycDetails, 'kycDetails.companyPan exists');
    check('cin' in payload.kycDetails, 'kycDetails.cin exists');
  }

  // addressDetails
  check(payload.addressDetails, 'addressDetails exists (not addressInfo)');
  check(!payload.addressInfo, 'addressInfo does NOT exist (should be addressDetails)');
  if (payload.addressDetails) {
    check('address' in payload.addressDetails, 'addressDetails.address exists');
    check('pinCode' in payload.addressDetails, 'addressDetails.pinCode exists');
    check('cityName' in payload.addressDetails, 'addressDetails.cityName exists');
    check('state' in payload.addressDetails, 'addressDetails.state exists');
    check('country' in payload.addressDetails, 'addressDetails.country exists');
  }

  // callbackUrls
  check(payload.callbackUrls, 'callbackUrls exists');
  if (payload.callbackUrls) {
    check('paymentSuccess' in payload.callbackUrls, 'callbackUrls.paymentSuccess exists');
    check('paymentFailure' in payload.callbackUrls, 'callbackUrls.paymentFailure exists');
  }

  // tenantSecurityInfo
  check(payload.tenantSecurityInfo, 'tenantSecurityInfo exists (not securityInfo)');
  check(!payload.securityInfo, 'securityInfo does NOT exist (should be tenantSecurityInfo)');
  if (payload.tenantSecurityInfo) {
    check('ip' in payload.tenantSecurityInfo, 'tenantSecurityInfo.ip exists');
    check('ipwl' in payload.tenantSecurityInfo, 'tenantSecurityInfo.ipwl exists');
    check(Array.isArray(payload.tenantSecurityInfo.ipwl), 'tenantSecurityInfo.ipwl is ARRAY');
    check('di' in payload.tenantSecurityInfo, 'tenantSecurityInfo.di exists');
    check('gl' in payload.tenantSecurityInfo, 'tenantSecurityInfo.gl exists');
    check('lati' in payload.tenantSecurityInfo, 'tenantSecurityInfo.lati exists');
    check('longi' in payload.tenantSecurityInfo, 'tenantSecurityInfo.longi exists');
  }

  // tenantProfileInfo
  check(payload.tenantProfileInfo, 'tenantProfileInfo exists');
  if (payload.tenantProfileInfo) {
    check('gdr' in payload.tenantProfileInfo, 'tenantProfileInfo.gdr exists');
    check('dob' in payload.tenantProfileInfo, 'tenantProfileInfo.dob exists');
    check('zip' in payload.tenantProfileInfo, 'tenantProfileInfo.zip exists');
    check('fn' in payload.tenantProfileInfo, 'tenantProfileInfo.fn exists');
    check('zd' in payload.tenantProfileInfo, 'tenantProfileInfo.zd exists');
    check('co' in payload.tenantProfileInfo, 'tenantProfileInfo.co exists');
    check('pi' in payload.tenantProfileInfo, 'tenantProfileInfo.pi exists');
    check('tz' in payload.tenantProfileInfo, 'tenantProfileInfo.tz exists');
    check('lang' in payload.tenantProfileInfo, 'tenantProfileInfo.lang exists (not language)');
    check(!('language' in payload.tenantProfileInfo), 'tenantProfileInfo.language does NOT exist (should be lang)');
    check('lurl' in payload.tenantProfileInfo, 'tenantProfileInfo.lurl exists');
    check('dom' in payload.tenantProfileInfo, 'tenantProfileInfo.dom exists');
  }

  // bankAccountInfo
  check(payload.bankAccountInfo, 'bankAccountInfo exists');
  if (payload.bankAccountInfo) {
    check('bn' in payload.bankAccountInfo, 'bankAccountInfo.bn exists');
    check('accNo' in payload.bankAccountInfo, 'bankAccountInfo.accNo exists');
    check('ifsc' in payload.bankAccountInfo, 'bankAccountInfo.ifsc exists');
    check('cmts' in payload.bankAccountInfo, 'bankAccountInfo.cmts exists');
    check('ahn' in payload.bankAccountInfo, 'bankAccountInfo.ahn exists');
    check('vl' in payload.bankAccountInfo, 'bankAccountInfo.vl exists');
    check('bt' in payload.bankAccountInfo, 'bankAccountInfo.bt exists');
  }

  console.log('\n📄 Checking Array Fields...');
  
  // tenantDocument
  check(payload.tenantDocument, 'tenantDocument exists (not identityDocuments)');
  check(!payload.identityDocuments, 'identityDocuments does NOT exist (should be tenantDocument)');
  check(Array.isArray(payload.tenantDocument), 'tenantDocument is ARRAY');
  if (Array.isArray(payload.tenantDocument) && payload.tenantDocument.length > 0) {
    const doc = payload.tenantDocument[0];
    check('pan' in doc, 'tenantDocument[0].pan exists');
    check('adr' in doc, 'tenantDocument[0].adr exists');
    check('pspt' in doc, 'tenantDocument[0].pspt exists');
    check('gst' in doc, 'tenantDocument[0].gst exists');
  }

  // agencies
  check(payload.agencies, 'agencies exists');
  check(Array.isArray(payload.agencies), 'agencies is ARRAY');

  console.log('\n🚫 Checking for Extra Fields...');
  
  // Check for fields that shouldn't exist
  check(!payload.contactPersonInfo, 'contactPersonInfo does NOT exist (not needed)');
  check(!payload.businessInfo, 'businessInfo does NOT exist (not needed)');
  check(!payload.lifeCycleInfo, 'lifeCycleInfo does NOT exist (not needed)');

  // Print results
  console.log('\n' + '='.repeat(60));
  console.log('📊 VALIDATION RESULTS');
  console.log('='.repeat(60));
  
  console.log(`\n✅ PASSED: ${results.passed.length}`);
  results.passed.forEach(msg => console.log(msg));
  
  if (results.warnings.length > 0) {
    console.log(`\n⚠️  WARNINGS: ${results.warnings.length}`);
    results.warnings.forEach(msg => console.log(msg));
  }
  
  if (results.failed.length > 0) {
    console.log(`\n❌ FAILED: ${results.failed.length}`);
    results.failed.forEach(msg => console.log(msg));
  }
  
  console.log('\n' + '='.repeat(60));
  
  const totalChecks = results.passed.length + results.failed.length + results.warnings.length;
  const passRate = ((results.passed.length / totalChecks) * 100).toFixed(2);
  
  console.log(`\n📈 Pass Rate: ${passRate}% (${results.passed.length}/${totalChecks})`);
  
  if (results.failed.length === 0) {
    console.log('\n🎉 PAYLOAD STRUCTURE IS CORRECT! ✅');
    console.log('Your payload matches the developer\'s format.');
  } else {
    console.log('\n❌ PAYLOAD STRUCTURE HAS ISSUES!');
    console.log(`Please fix ${results.failed.length} failed check(s).`);
  }
  
  console.log('\n' + '='.repeat(60));
  
  return {
    isValid: results.failed.length === 0,
    passed: results.passed.length,
    failed: results.failed.length,
    warnings: results.warnings.length,
    passRate: passRate,
    details: results
  };
}

// Example usage with your corrected payload
const examplePayload = {
  "tenantType": "WHITE_LABEL",
  "tenantStatus": "ACTIVE",
  "companyName": "newsroom",
  "firstName": "Aman",
  "lastName": "Dubey",
  "email": "aman@gmail.com",
  "mobile": "9009001212",
  "password": "Abcd@123",
  "tenantAdditionalInfo": {
    "rc": "22222",
    "aud": 0,
    "iaad": false,
    "iev": false,
    "imv": false,
    "notes": ""
  },
  "kycDetails": {
    "firmType": "PRIVATE_LIMITED",
    "gst": "07ABCDE1234F1Z5",
    "pan": "ABCDE1234F",
    "aadhaar": "662223509284",
    "companyPan": "",
    "cin": ""
  },
  "addressDetails": {
    "address": "abc",
    "pinCode": "452001",
    "cityName": "indore",
    "state": "madhya pradesh",
    "country": "India"
  },
  "callbackUrls": {
    "paymentSuccess": "",
    "paymentFailure": ""
  },
  "tenantSecurityInfo": {
    "ip": "",
    "ipwl": [],
    "di": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "gl": "",
    "lati": 0,
    "longi": 0
  },
  "tenantProfileInfo": {
    "gdr": "MALE",
    "dob": "",
    "zip": "452001",
    "fn": "Aman Dubey",
    "zd": "indore",
    "co": "",
    "pi": "",
    "tz": "Asia/Kolkata",
    "lang": "en",
    "lurl": "",
    "dom": ""
  },
  "bankAccountInfo": {
    "bn": "",
    "accNo": "",
    "ifsc": "",
    "cmts": "",
    "ahn": "newsroom",
    "vl": "ACTIVE",
    "bt": "CURRENT"
  },
  "tenantDocument": [{
    "pan": "ABCDE1234F",
    "adr": "662223509284",
    "pspt": "",
    "gst": "07ABCDE1234F1Z5"
  }],
  "agencies": []
};

// Run validation
console.log('🧪 Testing Example Payload...\n');
const result = validateTenantPayload(examplePayload);

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { validateTenantPayload };
}

// Instructions
console.log('\n📖 HOW TO USE THIS SCRIPT:');
console.log('1. Copy your payload object');
console.log('2. Run: validateTenantPayload(yourPayload)');
console.log('3. Check the results');
console.log('4. Fix any failed checks');
console.log('5. Re-run until all checks pass\n');
