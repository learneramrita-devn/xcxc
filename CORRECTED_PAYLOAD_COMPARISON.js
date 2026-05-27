// ✅ CORRECTED TENANT PAYLOAD - Matches Developer's Structure

const DEVELOPER_PAYLOAD = {
  "tenantType": "BUSINESS",
  "tenantStatus": "ACTIVE",
  "companyName": "Insane Technologies Pvt Ltd",
  "firstName": "Abhinav",
  "lastName": "Dubey",
  "email": "abhinav.dubey@insane.com",
  "mobile": "9876543210",
  "password": "StrongPass@123",
  "tenantAdditionalInfo": {
    "rc": "REF2025",
    "aud": 25,
    "iaad": true,
    "iev": true,
    "imv": true,
    "notes": "Premium tenant onboarded via partner"
  },
  "kycDetails": {
    "firmType": "PRIVATE_LIMITED",
    "gst": "09ABCDE1234F1Z5",
    "pan": "ABCDE1234F",
    "aadhaar": "123412341234",
    "companyPan": "AAACI1234P",
    "cin": "U12345UP2023PTC012345"
  },
  "addressDetails": {
    "address": "Plot 21, Sector 62",
    "pinCode": "201309",
    "cityName": "Noida",
    "state": "Uttar Pradesh",
    "country": "India"
  },
  "callbackUrls": {
    "paymentSuccess": "https://insane.com/callback/payment/success",
    "paymentFailure": "https://insane.com/callback/payment/failure"
  },
  "tenantSecurityInfo": {
    "ip": "192.168.1.10",
    "ipwl": ["192.168.1.0/24"], // ✅ ARRAY, not string
    "di": "Chrome on macOS",
    "gl": "India",
    "lati": 28.5355,
    "longi": 77.3910
  },
  "tenantProfileInfo": {
    "gdr": "MALE",
    "dob": "1998-06-15",
    "zip": "201309",
    "fn": "Abhinav Kumar Dubey",
    "zd": "UP-NOIDA",
    "co": "S/O Ram Dubey",
    "pi": "https://cdn.insane.com/profile/abhinav.png",
    "tz": "Asia/Kolkata",
    "lang": "en",
    "lurl": "https://insane.com/logo.png",
    "dom": "insane.com"
  },
  "bankAccountInfo": {
    "bn": "HDFC Bank",
    "accNo": "123456789012",
    "ifsc": "HDFC0001234",
    "cmts": "Primary settlement account",
    "ahn": "Insane Technologies Pvt Ltd",
    "vl": "ACTIVE",
    "bt": "CURRENT"
  },
  "tenantDocument": [{ // ✅ ARRAY of objects, not single object
    "pan": "ABCDE1234F",
    "adr": "123412341234",
    "pspt": "N1234567",
    "gst": "09ABCDE1234F1Z5"
  }],
  "agencies": [
    {
      "agentType": "DISTRIBUTOR",
      "agentCode": "DIST001",
      "agencyUrl": "https://agency.insane.com/dist001"
    },
    {
      "agentType": "AGENT",
      "agentCode": "AGT002",
      "agencyUrl": "https://agency.insane.com/agt002"
    }
  ]
};

// ✅ YOUR CORRECTED PAYLOAD (After Fix)
const YOUR_CORRECTED_PAYLOAD = {
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
    "ipwl": [], // ✅ Now array
    "di": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36",
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
  "tenantDocument": [{ // ✅ Now array
    "pan": "ABCDE1234F",
    "adr": "662223509284",
    "pspt": "",
    "gst": "07ABCDE1234F1Z5"
  }],
  "agencies": []
};

// ❌ OLD PAYLOAD (Before Fix) - For Reference
const YOUR_OLD_PAYLOAD = {
  "externalUserId": "EXT-USR-1779732970467", // ❌ Not in developer's payload
  "role": "AGENT", // ❌ Not in developer's payload
  "firstName": "Aman",
  "lastName": "Dubey",
  "email": "aman@gmail.com",
  "mobileNumber": "9009001212", // ❌ Should be "mobile"
  "passwordHash": "Abcd@123", // ❌ Should be "password"
  "agentType": "WHITE_LABEL", // ❌ Not in developer's payload
  "status": "ENABLED", // ❌ Should be "tenantStatus": "ACTIVE"
  "userSource": "WEB", // ❌ Not in developer's payload
  "tenantType": "WHITE_LABEL",
  "companyName": "newsroom",
  "tenantProfileInfo": {
    "gdr": "MALE",
    "dob": null,
    "zip": "452001",
    "fn": "Aman",
    "ln": "Dubey", // ❌ Should be in "fn" as full name
    "zd": "indore",
    "co": "India",
    "pi": null,
    "tz": "Asia/Kolkata",
    "language": "EN", // ❌ Should be "lang"
    "lurl": null
    // ❌ Missing "dom" field
  },
  "identityDocuments": { // ❌ Should be "tenantDocument" (array)
    "pan": "ABCDE1234F",
    "adr": "662223509284",
    "cin": null,
    "gst": "07ABCDE1234F1Z5"
  },
  "addressInfo": { // ❌ Should be "addressDetails"
    "address": "abc",
    "pinCode": "452001",
    "cityName": "indore",
    "state": "madhya pradesh",
    "country": "India"
  },
  "contactPersonInfo": { // ❌ Not in developer's payload
    "name": "Aman Dubey",
    "mobileNumber": "9009001212",
    "email": "aman@gmail.com"
  },
  "businessInfo": { // ❌ Not in developer's payload
    "bstp": "TRAVEL",
    "bsn": "newsroom",
    "rflcd": "22222"
  },
  "securityInfo": { // ❌ Should be "tenantSecurityInfo"
    "ip": null,
    "di": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36",
    "gl": null
    // ❌ Missing ipwl, lati, longi
  },
  "kycInfo": { // ❌ Should be "kycDetails" with different structure
    "ks": "PENDING",
    "ksa": "2026-05-25T18:16:10.467Z"
  },
  "lifeCycleInfo": { // ❌ Not in developer's payload
    "iat": "2026-05-25T18:16:10.467Z",
    "aat": null,
    "sat": null,
    "ovat": null
  }
  // ❌ Missing: tenantStatus, tenantAdditionalInfo, callbackUrls, bankAccountInfo, agencies
};

console.log('✅ All payloads defined for comparison');
console.log('Developer payload keys:', Object.keys(DEVELOPER_PAYLOAD));
console.log('Your corrected payload keys:', Object.keys(YOUR_CORRECTED_PAYLOAD));
console.log('Your old payload keys:', Object.keys(YOUR_OLD_PAYLOAD));

// Verify structure
console.log('\n=== STRUCTURE VERIFICATION ===');
console.log('tenantDocument is array (Developer):', Array.isArray(DEVELOPER_PAYLOAD.tenantDocument));
console.log('tenantDocument is array (Corrected):', Array.isArray(YOUR_CORRECTED_PAYLOAD.tenantDocument));
console.log('ipwl is array (Developer):', Array.isArray(DEVELOPER_PAYLOAD.tenantSecurityInfo.ipwl));
console.log('ipwl is array (Corrected):', Array.isArray(YOUR_CORRECTED_PAYLOAD.tenantSecurityInfo.ipwl));
