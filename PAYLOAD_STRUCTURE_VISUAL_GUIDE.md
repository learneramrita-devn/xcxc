# 📊 Tenant Payload Structure - Visual Guide

## 🏗️ Complete Structure Hierarchy

```
TENANT REGISTRATION PAYLOAD
│
├── 📋 Basic Info (Root Level)
│   ├── tenantType: "API_PARTNER" | "WHITE_LABEL" | "CORP_PARTNER"
│   ├── tenantStatus: "ACTIVE" | "INACTIVE"
│   ├── companyName: string
│   ├── firstName: string
│   ├── lastName: string
│   ├── email: string
│   ├── mobile: string
│   └── password: string
│
├── 📦 tenantAdditionalInfo (Object)
│   ├── rc: string (Referral Code)
│   ├── aud: number (Audit)
│   ├── iaad: boolean
│   ├── iev: boolean
│   ├── imv: boolean
│   └── notes: string
│
├── 🏢 kycDetails (Object)
│   ├── firmType: "PRIVATE_LIMITED" | "PUBLIC_LIMITED" | "PARTNERSHIP" | "PROPRIETORSHIP"
│   ├── gst: string
│   ├── pan: string
│   ├── aadhaar: string
│   ├── companyPan: string
│   └── cin: string
│
├── 📍 addressDetails (Object)
│   ├── address: string
│   ├── pinCode: string
│   ├── cityName: string
│   ├── state: string
│   └── country: string
│
├── 🔗 callbackUrls (Object)
│   ├── paymentSuccess: string (URL)
│   └── paymentFailure: string (URL)
│
├── 🔒 tenantSecurityInfo (Object)
│   ├── ip: string
│   ├── ipwl: string[] (Array of IP whitelist)
│   ├── di: string (Device Info)
│   ├── gl: string (Geo Location)
│   ├── lati: number (Latitude)
│   └── longi: number (Longitude)
│
├── 👤 tenantProfileInfo (Object)
│   ├── gdr: "MALE" | "FEMALE" | "OTHER"
│   ├── dob: string (YYYY-MM-DD)
│   ├── zip: string
│   ├── fn: string (Full Name)
│   ├── zd: string (Zone/District)
│   ├── co: string (Care Of)
│   ├── pi: string (Profile Image URL)
│   ├── tz: string (Timezone)
│   ├── lang: string (Language)
│   ├── lurl: string (Logo URL)
│   └── dom: string (Domain)
│
├── 🏦 bankAccountInfo (Object)
│   ├── bn: string (Bank Name)
│   ├── accNo: string (Account Number)
│   ├── ifsc: string (IFSC Code)
│   ├── cmts: string (Comments)
│   ├── ahn: string (Account Holder Name)
│   ├── vl: "ACTIVE" | "INACTIVE" (Validation Status)
│   └── bt: "SAVINGS" | "CURRENT" (Bank Type)
│
├── 📄 tenantDocument (Array of Objects)
│   └── [
│       {
│         pan: string,
│         adr: string (Aadhaar),
│         pspt: string (Passport),
│         gst: string
│       }
│     ]
│
└── 🏢 agencies (Array of Objects)
    └── [
        {
          agentType: "DISTRIBUTOR" | "AGENT",
          agentCode: string,
          agencyUrl: string
        }
      ]
```

## 🔄 Data Flow Diagram

```
FORM DATA
    ↓
    ↓ (User fills registration form)
    ↓
FORM VALIDATION
    ↓
    ↓ (Validate all fields)
    ↓
PAYLOAD MAPPING
    ↓
    ├─→ Basic Info (firstName, lastName, email, mobile, password)
    ├─→ tenantAdditionalInfo (referralCode → rc)
    ├─→ kycDetails (pan, aadhaar, gst, cin, firmType)
    ├─→ addressDetails (address, pincode, city, state)
    ├─→ callbackUrls (empty for now)
    ├─→ tenantSecurityInfo (ip, device info, location)
    ├─→ tenantProfileInfo (gender, dob, fullname, timezone)
    ├─→ bankAccountInfo (bank details if provided)
    ├─→ tenantDocument (documents as array)
    └─→ agencies (empty array)
    ↓
TENANT PAYLOAD
    ↓
    ↓ (Send to backend API)
    ↓
BACKEND API
    ↓
    ├─→ ✅ Success (200/201) → User/Tenant Created
    └─→ ❌ Error (400/500) → Show error message
```

## 📊 Field Type Reference

### String Fields
```javascript
tenantType: "WHITE_LABEL"
tenantStatus: "ACTIVE"
companyName: "Company Name"
firstName: "John"
lastName: "Doe"
email: "john@example.com"
mobile: "9876543210"
password: "SecurePass@123"
```

### Number Fields
```javascript
aud: 0
lati: 28.5355
longi: 77.3910
```

### Boolean Fields
```javascript
iaad: false
iev: false
imv: false
```

### Array Fields
```javascript
ipwl: ["192.168.1.0/24", "10.0.0.0/8"]
tenantDocument: [{ pan: "...", adr: "...", pspt: "...", gst: "..." }]
agencies: [{ agentType: "DISTRIBUTOR", agentCode: "DIST001", agencyUrl: "..." }]
```

### Object Fields
```javascript
tenantAdditionalInfo: { rc: "", aud: 0, iaad: false, iev: false, imv: false, notes: "" }
kycDetails: { firmType: "", gst: "", pan: "", aadhaar: "", companyPan: "", cin: "" }
addressDetails: { address: "", pinCode: "", cityName: "", state: "", country: "" }
callbackUrls: { paymentSuccess: "", paymentFailure: "" }
tenantSecurityInfo: { ip: "", ipwl: [], di: "", gl: "", lati: 0, longi: 0 }
tenantProfileInfo: { gdr: "", dob: "", zip: "", fn: "", zd: "", co: "", pi: "", tz: "", lang: "", lurl: "", dom: "" }
bankAccountInfo: { bn: "", accNo: "", ifsc: "", cmts: "", ahn: "", vl: "", bt: "" }
```

## 🎯 Critical Points

### ⚠️ Must Be Arrays
```javascript
✅ ipwl: []           // Array of strings
✅ tenantDocument: [] // Array of objects
✅ agencies: []       // Array of objects

❌ ipwl: ""           // Wrong! Should be array
❌ tenantDocument: {} // Wrong! Should be array
```

### ⚠️ Must Be Objects
```javascript
✅ tenantAdditionalInfo: {}
✅ kycDetails: {}
✅ addressDetails: {}
✅ callbackUrls: {}
✅ tenantSecurityInfo: {}
✅ tenantProfileInfo: {}
✅ bankAccountInfo: {}

❌ kycDetails: []     // Wrong! Should be object
```

### ⚠️ Correct Field Names
```javascript
✅ mobile             ❌ mobileNumber
✅ password           ❌ passwordHash
✅ addressDetails     ❌ addressInfo
✅ kycDetails         ❌ kycInfo
✅ tenantSecurityInfo ❌ securityInfo
✅ tenantDocument     ❌ identityDocuments
✅ lang               ❌ language
```

## 📋 Validation Rules

### Required Fields (Root Level)
- ✅ tenantType
- ✅ tenantStatus
- ✅ companyName
- ✅ firstName
- ✅ lastName
- ✅ email
- ✅ mobile
- ✅ password

### Required Nested Objects
- ✅ tenantAdditionalInfo
- ✅ kycDetails
- ✅ addressDetails
- ✅ callbackUrls
- ✅ tenantSecurityInfo
- ✅ tenantProfileInfo
- ✅ bankAccountInfo
- ✅ tenantDocument (array)
- ✅ agencies (array)

### Optional Fields
- callbackUrls.paymentSuccess (can be empty)
- callbackUrls.paymentFailure (can be empty)
- bankAccountInfo fields (can be empty)
- agencies array (can be empty)
- tenantAdditionalInfo.notes (can be empty)

## 🔍 Debugging Checklist

When debugging payload issues, check:

```javascript
// 1. Check data types
console.log('ipwl is array?', Array.isArray(payload.tenantSecurityInfo.ipwl));
console.log('tenantDocument is array?', Array.isArray(payload.tenantDocument));

// 2. Check field names
console.log('Has mobile?', 'mobile' in payload);
console.log('Has password?', 'password' in payload);
console.log('Has addressDetails?', 'addressDetails' in payload);
console.log('Has kycDetails?', 'kycDetails' in payload);

// 3. Check required fields
console.log('Has tenantStatus?', 'tenantStatus' in payload);
console.log('Has tenantAdditionalInfo?', 'tenantAdditionalInfo' in payload);
console.log('Has callbackUrls?', 'callbackUrls' in payload);
console.log('Has bankAccountInfo?', 'bankAccountInfo' in payload);

// 4. Check for wrong fields
console.log('Has mobileNumber?', 'mobileNumber' in payload); // Should be false
console.log('Has passwordHash?', 'passwordHash' in payload); // Should be false
console.log('Has identityDocuments?', 'identityDocuments' in payload); // Should be false
console.log('Has kycInfo?', 'kycInfo' in payload); // Should be false
```

## 📊 Size Comparison

```
OLD PAYLOAD (Your Structure)
├── Root fields: 11
├── Nested objects: 8
├── Total fields: ~35
└── Missing: 6 sections

NEW PAYLOAD (Developer's Structure)
├── Root fields: 8
├── Nested objects: 9
├── Total fields: ~50
└── Complete: All sections present
```

## ✅ Final Verification

```javascript
// Run this to verify your payload
function verifyPayload(payload) {
  const checks = {
    'Has tenantType': 'tenantType' in payload,
    'Has tenantStatus': 'tenantStatus' in payload,
    'Has mobile (not mobileNumber)': 'mobile' in payload && !('mobileNumber' in payload),
    'Has password (not passwordHash)': 'password' in payload && !('passwordHash' in payload),
    'Has addressDetails (not addressInfo)': 'addressDetails' in payload && !('addressInfo' in payload),
    'Has kycDetails (not kycInfo)': 'kycDetails' in payload && !('kycInfo' in payload),
    'Has tenantSecurityInfo (not securityInfo)': 'tenantSecurityInfo' in payload && !('securityInfo' in payload),
    'Has tenantDocument (not identityDocuments)': 'tenantDocument' in payload && !('identityDocuments' in payload),
    'tenantDocument is array': Array.isArray(payload.tenantDocument),
    'ipwl is array': Array.isArray(payload.tenantSecurityInfo?.ipwl),
    'Has tenantAdditionalInfo': 'tenantAdditionalInfo' in payload,
    'Has callbackUrls': 'callbackUrls' in payload,
    'Has bankAccountInfo': 'bankAccountInfo' in payload,
    'Has agencies': 'agencies' in payload,
    'No externalUserId': !('externalUserId' in payload),
    'No role': !('role' in payload),
    'No contactPersonInfo': !('contactPersonInfo' in payload),
    'No businessInfo': !('businessInfo' in payload),
    'No lifeCycleInfo': !('lifeCycleInfo' in payload)
  };
  
  console.table(checks);
  
  const passed = Object.values(checks).filter(v => v).length;
  const total = Object.keys(checks).length;
  
  console.log(`\n✅ Passed: ${passed}/${total}`);
  
  if (passed === total) {
    console.log('🎉 Payload structure is CORRECT!');
  } else {
    console.log('❌ Payload structure has issues!');
  }
  
  return passed === total;
}

// Usage
verifyPayload(yourPayload);
```

---

**Use this guide to verify your payload structure is correct!** ✅
