# Payload Comparison - Frontend vs Backend Expected

## Backend Developer's Expected Payload:

```json
{
  "tenantType": "BUSINESS",
  "tenantStatus": "ACTIVE",
  "companyName": "Insane Technologies Pvt Ltd",
  "firstName": "Abhinav",
  "lastName": "Dubey",
  "email": "abhinav.dubey@insane.com",
  "mobile": "9876543210",
  "password": "StrongPass@123",
  
  "tenantAdditionalInfo": { ... },
  "kycDetails": { ... },
  "addressDetails": { ... },
  "callbackUrls": { ... },
  "tenantSecurityInfo": { ... },
  "tenantProfileInfo": { ... },
  "bankAccountInfo": { ... },
  "tenantDocument": { ... },
  "agencies": [ ... ]
}
```

## Our Current Payload:

```json
{
  "externalUserId": "EXT-USR-1779732970467",
  "role": "AGENT",
  "firstName": "Aman",
  "lastName": "Dubey",
  "email": "aman@gmail.com",
  "mobileNumber": "9009001212",
  "passwordHash": "Abcd@123",
  "agentType": "WHITE_LABEL",
  "status": "ENABLED",
  "userSource": "WEB",
  "tenantType": "WHITE_LABEL",
  "companyName": "newsroom",
  
  "tenantProfileInfo": { ... },
  "identityDocuments": { ... },
  "addressInfo": { ... },
  "contactPersonInfo": { ... },
  "businessInfo": { ... },
  "securityInfo": { ... },
  "kycInfo": { ... },
  "lifeCycleInfo": { ... }
}
```

---

## Key Differences:

### 1. Field Names:
| Our Field | Backend Expected |
|-----------|------------------|
| `mobileNumber` | `mobile` |
| `passwordHash` | `password` |
| `status` | `tenantStatus` |
| `identityDocuments` | `tenantDocument` |
| `addressInfo` | `addressDetails` |
| `securityInfo` | `tenantSecurityInfo` |
| `kycInfo` | `kycDetails` |

### 2. Missing Fields in Our Payload:
- ❌ `tenantAdditionalInfo`
- ❌ `callbackUrls`
- ❌ `bankAccountInfo`
- ❌ `agencies`

### 3. Extra Fields in Our Payload:
- ❌ `externalUserId`
- ❌ `role`
- ❌ `agentType`
- ❌ `userSource`
- ❌ `contactPersonInfo`
- ❌ `businessInfo`
- ❌ `lifeCycleInfo`

### 4. tenantType Values:
- Our: `API_PARTNER`, `WHITE_LABEL`, `CORP_PARTNER`
- Backend: `BUSINESS`

### 5. tenantStatus Values:
- Our: `ENABLED`
- Backend: `ACTIVE`

---

## Required Changes:

### Change 1: Field Names
```javascript
// Change these field names:
mobile: String(mobile || ''),           // Not mobileNumber
password: form.password || '',          // Not passwordHash
tenantStatus: 'ACTIVE',                 // Not status: 'ENABLED'
```

### Change 2: Rename Objects
```javascript
tenantDocument: { ... },                // Not identityDocuments
addressDetails: { ... },                // Not addressInfo
tenantSecurityInfo: { ... },            // Not securityInfo
kycDetails: { ... },                    // Not kycInfo
```

### Change 3: Add Missing Fields
```javascript
tenantAdditionalInfo: {
  rc: form.referralCode || '',
  aud: 0,
  iaad: false,
  iev: false,
  imv: false,
  notes: ''
},

callbackUrls: {
  paymentSuccess: '',
  paymentFailure: ''
},

bankAccountInfo: {
  bn: '',
  accNo: '',
  ifsc: '',
  cmts: '',
  ahn: fullName,
  vl: 'ACTIVE',
  bt: 'CURRENT'
},

agencies: []
```

### Change 4: Remove Extra Fields
```javascript
// Remove these:
- externalUserId
- role
- agentType
- userSource
- contactPersonInfo
- businessInfo
- lifeCycleInfo
```

### Change 5: Update tenantProfileInfo
```javascript
tenantProfileInfo: {
  gdr: form.gender || 'MALE',
  dob: form.dob || null,
  zip: form.pincode || null,
  fn: form.firstName || '',          // Just first name
  zd: form.city || null,
  co: '',
  pi: null,
  tz: 'Asia/Kolkata',
  lang: 'en',                        // Not language: 'EN'
  lurl: null,
  dom: ''
}
```

---

## Correct Payload Structure:

```json
{
  "tenantType": "BUSINESS",
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
    "firmType": "PROPRIETOR",
    "gst": "07ABCDE1234F1Z5",
    "pan": "ABCDE1234F",
    "aadhaar": "662223509284",
    "companyPan": null,
    "cin": null
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
    "ip": null,
    "ipwl": null,
    "di": "Mozilla/5.0...",
    "gl": null,
    "lati": null,
    "longi": null
  },
  
  "tenantProfileInfo": {
    "gdr": "MALE",
    "dob": null,
    "zip": "452001",
    "fn": "Aman",
    "zd": "indore",
    "co": "India",
    "pi": null,
    "tz": "Asia/Kolkata",
    "lang": "en",
    "lurl": null,
    "dom": ""
  },
  
  "bankAccountInfo": {
    "bn": "",
    "accNo": "",
    "ifsc": "",
    "cmts": "",
    "ahn": "Aman Dubey",
    "vl": "ACTIVE",
    "bt": "CURRENT"
  },
  
  "tenantDocument": {
    "pan": "ABCDE1234F",
    "adr": "662223509284",
    "pspt": null,
    "gst": "07ABCDE1234F1Z5"
  },
  
  "agencies": []
}
```

---

## Summary:

**Issue:** Our payload structure doesn't match backend's expected structure!

**Solution:** Need to completely restructure the payload to match backend's format.

**Action:** Update `onboardingService.js` to create payload matching backend's structure.

---

**This is why 500 error was happening!** Backend couldn't parse our payload structure.
