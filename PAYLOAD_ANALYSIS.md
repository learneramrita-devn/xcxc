# Test with Actual Payload

## Payload Being Sent (Decoded):

```json
{
  "externalUserId": "EXT-USR-1779731359600",
  "role": "AGENT",
  "name": "SIVAY DUBEY",
  "firstName": "Sivay",
  "lastName": "Dubey",
  "email": "sivay@gmail.com",
  "mobile": "8008008000",
  "mobileNumber": "8008008000",
  "passwordHash": "Abcd@123",
  "agentType": "API_PARTNER",
  "status": "ENABLED",
  "userSource": "WEB",
  "tenantType": "API_PARTNER",
  "companyName": "newsroom",
  "tenantProfileInfo": {
    "gdr": "MALE",
    "dob": "",
    "zip": "452001",
    "fn": "SIVAY DUBEY",
    "ln": "Dubey",
    "zd": "indore",
    "co": "India",
    "pi": "",
    "tz": "Asia/Kolkata",
    "language": "EN",
    "lurl": ""
  },
  "identityDocuments": {
    "pan": "ABCDE1234F",
    "adr": "662223509284",
    "cin": "",
    "gst": "07ABCDE1234F1Z5"
  },
  "addressInfo": {
    "address": "abc",
    "pinCode": "452001",
    "cityName": "indore",
    "state": "madhya pradesh",
    "country": "India"
  },
  "contactPersonInfo": {
    "name": "Sivay Dubey",
    "mobileNumber": "8008008000",
    "email": "sivay@gmail.com"
  },
  "businessInfo": {
    "bstp": "TRAVEL",
    "bsn": "newsroom",
    "rflcd": "22222"
  },
  "securityInfo": {
    "ip": "",
    "di": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36",
    "gl": ""
  },
  "kycInfo": {
    "ks": "PENDING",
    "ksa": "2026-05-25T17:49:19.600Z"
  },
  "lifeCycleInfo": {
    "iat": "2026-05-25T17:49:19.600Z",
    "aat": null,
    "sat": null,
    "ovat": null
  }
}
```

---

## Payload Analysis

### ✅ All Required Fields Present:
- ✅ firstName: "Sivay"
- ✅ lastName: "Dubey"
- ✅ mobile: "8008008000"
- ✅ mobileNumber: "8008008000"
- ✅ tenantType: "API_PARTNER"
- ✅ tenantProfileInfo: { ... }
- ✅ identityDocuments: { ... }
- ✅ addressInfo: { ... }

### ⚠️ Potential Issues:

#### 1. Empty DOB Field
```json
"dob": ""
```
**Issue:** Backend might not accept empty string, expects null or valid date
**Fix:** Change empty string to null or valid date

#### 2. Empty CIN Field
```json
"cin": ""
```
**Issue:** Backend might not accept empty string for CIN
**Fix:** Remove field or set to null

#### 3. Empty IP and GL Fields
```json
"ip": "",
"gl": ""
```
**Issue:** Backend might expect these fields to be null or have values
**Fix:** Set to null instead of empty string

---

## Test with cURL

```bash
curl -X POST http://13.126.207.62:8080/ums/v1/tenant/register \
  -H "Content-Type: application/json" \
  -d '{
    "externalUserId": "EXT-USR-1779731359600",
    "role": "AGENT",
    "name": "SIVAY DUBEY",
    "firstName": "Sivay",
    "lastName": "Dubey",
    "email": "sivay@gmail.com",
    "mobile": "8008008000",
    "mobileNumber": "8008008000",
    "passwordHash": "Abcd@123",
    "agentType": "API_PARTNER",
    "status": "ENABLED",
    "userSource": "WEB",
    "tenantType": "API_PARTNER",
    "companyName": "newsroom",
    "tenantProfileInfo": {
      "gdr": "MALE",
      "dob": null,
      "zip": "452001",
      "fn": "SIVAY DUBEY",
      "ln": "Dubey",
      "zd": "indore",
      "co": "India",
      "tz": "Asia/Kolkata",
      "language": "EN"
    },
    "identityDocuments": {
      "pan": "ABCDE1234F",
      "adr": "662223509284",
      "gst": "07ABCDE1234F1Z5"
    },
    "addressInfo": {
      "address": "abc",
      "pinCode": "452001",
      "cityName": "indore",
      "state": "madhya pradesh",
      "country": "India"
    },
    "contactPersonInfo": {
      "name": "Sivay Dubey",
      "mobileNumber": "8008008000",
      "email": "sivay@gmail.com"
    },
    "businessInfo": {
      "bstp": "TRAVEL",
      "bsn": "newsroom",
      "rflcd": "22222"
    },
    "securityInfo": {
      "di": "Mozilla/5.0"
    },
    "kycInfo": {
      "ks": "PENDING",
      "ksa": "2026-05-25T17:49:19.600Z"
    },
    "lifeCycleInfo": {
      "iat": "2026-05-25T17:49:19.600Z",
      "aat": null,
      "sat": null,
      "ovat": null
    }
  }' -v
```

---

## Backend Developer Questions

### Question 1: Empty String vs Null
Does backend accept empty strings ("") for optional fields, or should they be:
- Removed from payload?
- Set to null?

**Fields in question:**
- dob: ""
- cin: ""
- ip: ""
- gl: ""
- pi: ""
- lurl: ""

### Question 2: Date Format
Is the date format correct?
```json
"dob": "",
"ksa": "2026-05-25T17:49:19.600Z",
"iat": "2026-05-25T17:49:19.600Z"
```

Should dob be:
- "1990-01-01" (YYYY-MM-DD)?
- "1990-01-01T00:00:00.000Z" (ISO format)?
- null (if not provided)?

### Question 3: Required vs Optional
Which fields are truly required vs optional?

**Currently sending:**
- All fields with empty strings for optional ones

**Should we:**
- Only send fields that have values?
- Send null for optional fields?

---

## Recommended Fix

Change empty strings to null for optional fields:

```javascript
// In onboardingService.js
tenantProfileInfo: {
  gdr: form.gender || 'MALE',
  dob: form.dob || null,  // Changed from ''
  zip: form.pincode || '',
  fn: (fullName || '').toUpperCase(),
  ln: form.lastName || '',
  zd: form.city || '',
  co: 'India',
  pi: null,  // Changed from ''
  tz: 'Asia/Kolkata',
  language: 'EN',
  lurl: null  // Changed from ''
},
identityDocuments: {
  pan: form.pan || form.companyPan || '',
  adr: form.aadhaar ? form.aadhaar.replace(/[-\\s]/g, '') : '',
  cin: form.cin || null,  // Changed from ''
  gst: form.gst || null   // Changed from ''
},
securityInfo: {
  ip: null,  // Changed from ''
  di: navigator.userAgent,
  gl: null   // Changed from ''
}
```

---

## Summary

**Payload Structure:** ✅ Correct
**All Required Fields:** ✅ Present
**Potential Issue:** ⚠️ Empty strings instead of null

**Action Required:**
1. Backend developer to confirm: Empty string vs null for optional fields
2. Backend developer to check backend logs for exact error
3. Frontend can change empty strings to null if needed

**Most Likely Cause:** Backend service error (500) - not related to payload structure, but internal backend issue.
