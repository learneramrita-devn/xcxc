# 🎴 QUICK REFERENCE CARD - Tenant Registration Payload

## ✅ 5 MUST-HAVE Fields (Backend Required)

```javascript
{
  tenantId: 1,                    // ✅ Cannot be null
  role: 'TENANT_ADMIN',           // ✅ Cannot be null
  status: 'ACTIVE',               // ✅ Cannot be null
  identityDocuments: { ... },     // ✅ Cannot be null
  tenantProfileInfo: {
    dob: '1990-01-01'             // ✅ Cannot be null
  }
}
```

## 🔄 Field Name Mappings

| ❌ Wrong | ✅ Correct |
|---------|-----------|
| `mobileNumber` | `mobile` |
| `passwordHash` | `password` |
| `identityDocuments` (for array) | `tenantDocument` |
| `addressInfo` | `addressDetails` |
| `securityInfo` | `tenantSecurityInfo` |
| `kycInfo` | `kycDetails` |
| `language` | `lang` |

## 📦 Array Fields (Must Be Arrays)

```javascript
ipwl: []              // ✅ Array of strings
tenantDocument: []    // ✅ Array of objects
agencies: []          // ✅ Array of objects
```

## 🏗️ Complete Structure (Minimal)

```javascript
{
  // Required by Backend
  tenantId: 1,
  role: 'TENANT_ADMIN',
  status: 'ACTIVE',
  
  // Basic Info
  tenantType: 'WHITE_LABEL',
  tenantStatus: 'ACTIVE',
  companyName: 'Company Name',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  mobile: '9876543210',
  password: 'Pass@123',
  
  // Additional Info
  tenantAdditionalInfo: {
    rc: '', aud: 0, iaad: false, iev: false, imv: false, notes: ''
  },
  
  // KYC Details
  kycDetails: {
    firmType: 'PRIVATE_LIMITED', gst: '', pan: '', aadhaar: '', companyPan: '', cin: ''
  },
  
  // Address
  addressDetails: {
    address: '', pinCode: '', cityName: '', state: '', country: 'India'
  },
  
  // Identity Documents (Backend Required)
  identityDocuments: {
    pan: '', adr: '', cin: '', gst: ''
  },
  
  // Callback URLs
  callbackUrls: {
    paymentSuccess: '', paymentFailure: ''
  },
  
  // Security Info
  tenantSecurityInfo: {
    ip: '', ipwl: [], di: '', gl: '', lati: 0, longi: 0
  },
  
  // Profile Info
  tenantProfileInfo: {
    gdr: 'MALE', dob: '1990-01-01', zip: '', fn: '', zd: '', co: '', 
    pi: '', tz: 'Asia/Kolkata', lang: 'en', lurl: '', dom: ''
  },
  
  // Bank Info
  bankAccountInfo: {
    bn: '', accNo: '', ifsc: '', cmts: '', ahn: '', vl: 'ACTIVE', bt: 'CURRENT'
  },
  
  // Documents Array
  tenantDocument: [{
    pan: '', adr: '', pspt: '', gst: ''
  }],
  
  // Agencies
  agencies: []
}
```

## 🚫 DO NOT Include

```javascript
❌ externalUserId
❌ agentType (at root level)
❌ userSource
❌ contactPersonInfo
❌ businessInfo
❌ lifeCycleInfo
```

## 🔍 Quick Validation

```javascript
// Check these in console:
console.log('Has tenantId?', 'tenantId' in payload);
console.log('Has role?', 'role' in payload);
console.log('Has status?', 'status' in payload);
console.log('Has identityDocuments?', 'identityDocuments' in payload);
console.log('dob is not null?', payload.tenantProfileInfo.dob !== null);
console.log('ipwl is array?', Array.isArray(payload.tenantSecurityInfo.ipwl));
console.log('tenantDocument is array?', Array.isArray(payload.tenantDocument));
```

## 📝 Default Values

```javascript
dob: '1990-01-01'           // If user doesn't provide
role: 'TENANT_ADMIN'        // Fixed value
status: 'ACTIVE'            // Fixed value
tenantStatus: 'ACTIVE'      // Fixed value
country: 'India'            // Fixed value
tz: 'Asia/Kolkata'          // Fixed value
lang: 'en'                  // Fixed value
```

## 🎯 Common Errors & Fixes

| Error | Fix |
|-------|-----|
| "role must not be null" | Add `role: 'TENANT_ADMIN'` |
| "status must not be null" | Add `status: 'ACTIVE'` |
| "tenantId must not be null" | Add `tenantId: resolvedTenantId` |
| "identityDocuments must not be null" | Add `identityDocuments: { pan, adr, cin, gst }` |
| "dob must not be null" | Use `form.dob \|\| '1990-01-01'` |
| "ipwl must be array" | Use `ipwl: []` not `ipwl: ''` |
| "tenantDocument must be array" | Use `tenantDocument: [{}]` not `tenantDocument: {}` |

## 📊 Field Abbreviations

| Short | Full Name |
|-------|-----------|
| `rc` | Referral Code |
| `aud` | Audit |
| `gdr` | Gender |
| `dob` | Date of Birth |
| `fn` | Full Name |
| `zd` | Zone/District |
| `co` | Care Of |
| `pi` | Profile Image |
| `lurl` | Logo URL |
| `dom` | Domain |
| `bn` | Bank Name |
| `accNo` | Account Number |
| `ifsc` | IFSC Code |
| `cmts` | Comments |
| `ahn` | Account Holder Name |
| `vl` | Validation Status |
| `bt` | Bank Type |
| `adr` | Aadhaar |
| `pspt` | Passport |
| `di` | Device Info |
| `gl` | Geo Location |
| `lati` | Latitude |
| `longi` | Longitude |

## 🧪 Test Payload

```javascript
const testPayload = {
  tenantId: 1,
  role: 'TENANT_ADMIN',
  status: 'ACTIVE',
  tenantType: 'WHITE_LABEL',
  tenantStatus: 'ACTIVE',
  companyName: 'Test Company',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@test.com',
  mobile: '9876543210',
  password: 'Test@123',
  tenantAdditionalInfo: { rc: '', aud: 0, iaad: false, iev: false, imv: false, notes: '' },
  kycDetails: { firmType: 'PRIVATE_LIMITED', gst: '', pan: '', aadhaar: '', companyPan: '', cin: '' },
  addressDetails: { address: 'Test', pinCode: '123456', cityName: 'Test', state: 'Test', country: 'India' },
  identityDocuments: { pan: '', adr: '', cin: '', gst: '' },
  callbackUrls: { paymentSuccess: '', paymentFailure: '' },
  tenantSecurityInfo: { ip: '', ipwl: [], di: navigator.userAgent, gl: '', lati: 0, longi: 0 },
  tenantProfileInfo: { gdr: 'MALE', dob: '1990-01-01', zip: '123456', fn: 'John Doe', zd: 'Test', co: '', pi: '', tz: 'Asia/Kolkata', lang: 'en', lurl: '', dom: '' },
  bankAccountInfo: { bn: '', accNo: '', ifsc: '', cmts: '', ahn: 'Test Company', vl: 'ACTIVE', bt: 'CURRENT' },
  tenantDocument: [{ pan: '', adr: '', pspt: '', gst: '' }],
  agencies: []
};
```

## 📞 Quick Help

**Problem:** Backend validation error
**Solution:** Check this card for required fields

**Problem:** Field name wrong
**Solution:** Check "Field Name Mappings" section

**Problem:** Type error (array vs object)
**Solution:** Check "Array Fields" section

**Problem:** Null value error
**Solution:** Check "Default Values" section

---

**Print this card and keep it handy! 📌**
