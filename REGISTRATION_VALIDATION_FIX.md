# Registration Validation Errors - Fixed! ✅

## Errors Received from Backend:

```
❌ mobile: Mobile number must not be blank
❌ identityDocuments: Address details must not be null
❌ firstName: First name must not be blank
❌ tenantType: Tenant type must not be blank
❌ tenantProfileInfo: ProfileInfo must not be null
```

---

## Root Cause

Backend expects **different payload structures** for:
1. **User Registration** (Travel Agent) → `/ums/v1/users/register`
2. **Tenant Registration** (API Partner, WhiteLabel, Corporate) → `/ums/v1/tenant/register`

We were sending the same payload for both, but tenant registration needs specific fields.

---

## Fix Applied

### Tenant Registration Payload (NEW):

```json
{
  "externalUserId": "EXT-USR-1234567890",
  "role": "AGENT",
  "name": "JOHN DOE",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "mobile": "9999999999",
  "mobileNumber": "9999999999",
  "passwordHash": "Test@123",
  "agentType": "API_PARTNER",
  "tenantType": "API_PARTNER",
  "status": "ENABLED",
  "userSource": "WEB",
  
  "tenantProfileInfo": {
    "gdr": "MALE",
    "dob": "1990-01-01",
    "zip": "110001",
    "fn": "JOHN DOE",
    "ln": "Doe",
    "zd": "Delhi",
    "co": "India",
    "tz": "Asia/Kolkata",
    "language": "EN"
  },
  
  "identityDocuments": {
    "pan": "ABCDE1234F",
    "adr": "123456789012",
    "cin": "U12345MH2020PTC123456",
    "gst": "27ABCDE1234F1Z5"
  },
  
  "addressInfo": {
    "address": "123 Main Street",
    "pinCode": "110001",
    "cityName": "Delhi",
    "state": "Delhi",
    "country": "India"
  },
  
  "contactPersonInfo": {
    "name": "JOHN DOE",
    "mobileNumber": "9999999999",
    "email": "john@example.com"
  },
  
  "businessInfo": {
    "bstp": "TRAVEL",
    "bsn": "ABC Company",
    "rflcd": ""
  }
}
```

### User Registration Payload (Unchanged):

```json
{
  "tenant": { "tenantId": 1 },
  "externalUserId": "EXT-USR-1234567890",
  "role": "AGENT",
  "name": "JOHN DOE",
  "email": "john@example.com",
  "mobileNumber": "9999999999",
  "passwordHash": "Test@123",
  "agentType": "AGENCY",
  "status": "ENABLED",
  "userSource": "WEB",
  
  "userProfileInfo": { ... },
  "userDocuments": { ... },
  "addressInfo": { ... },
  "contactPersonInfo": { ... },
  "businessInfo": { ... }
}
```

---

## Key Differences

### Tenant Registration:
- ✅ `firstName` - Required (separate field)
- ✅ `lastName` - Required (separate field)
- ✅ `mobile` - Required (in addition to mobileNumber)
- ✅ `tenantType` - Required (API_PARTNER, WHITE_LABEL, CORP_PARTNER)
- ✅ `tenantProfileInfo` - Required (instead of userProfileInfo)
- ✅ `identityDocuments` - Required (instead of userDocuments)
- ✅ `companyName` - Required
- ❌ No `tenant` object
- ❌ No `userAdditionalInfo`

### User Registration:
- ✅ `tenant` object with tenantId
- ✅ `userProfileInfo` (not tenantProfileInfo)
- ✅ `userDocuments` (not identityDocuments)
- ✅ `userAdditionalInfo` - Required
- ✅ `agencyName` (not companyName)

---

## Fixed Fields

### 1. Mobile Number ✅
**Before:** Only `mobileNumber`
**After:** Both `mobile` and `mobileNumber`

```javascript
mobile: String(mobile || ''),
mobileNumber: String(mobile || ''),
```

### 2. First Name ✅
**Before:** Only in `name` field
**After:** Separate `firstName` field

```javascript
firstName: form.firstName || '',
lastName: form.lastName || '',
name: (fullName || 'Agent').toUpperCase(),
```

### 3. Tenant Type ✅
**Before:** Missing
**After:** Added `tenantType`

```javascript
tenantType: agentType, // API_PARTNER, WHITE_LABEL, CORP_PARTNER
```

### 4. Tenant Profile Info ✅
**Before:** Using `userProfileInfo`
**After:** Using `tenantProfileInfo`

```javascript
tenantProfileInfo: {
  gdr: form.gender || 'MALE',
  dob: form.dob || '',
  zip: form.pincode || '',
  fn: (fullName || '').toUpperCase(),
  ln: form.lastName || '',
  zd: form.city || '',
  co: 'India',
  tz: 'Asia/Kolkata',
  language: 'EN'
}
```

### 5. Identity Documents ✅
**Before:** Using `userDocuments`
**After:** Using `identityDocuments`

```javascript
identityDocuments: {
  pan: form.pan || form.companyPan || '',
  adr: form.aadhaar ? form.aadhaar.replace(/[-\\s]/g, '') : '',
  cin: form.cin || '',
  gst: form.gst || ''
}
```

---

## Registration Flow

### Travel Agent:
1. Select "Agent / Merchant"
2. Fill form (Agency Name, First Name, Last Name, etc.)
3. Submit → Calls `/ums/v1/users/register`
4. Payload includes: `tenant`, `userProfileInfo`, `userDocuments`, `userAdditionalInfo`

### API Partner / WhiteLabel / Corporate:
1. Select "API Partner" / "White Label" / "Corporate"
2. Fill form (Company Name, First Name, Last Name, etc.)
3. Submit → Calls `/ums/v1/tenant/register`
4. Payload includes: `tenantType`, `tenantProfileInfo`, `identityDocuments`, `companyName`

---

## Testing

### Test Tenant Registration:
1. Go to registration page
2. Select "API Partner" or "WhiteLabel" or "Corporate"
3. Fill all fields:
   - Company Name: "ABC Company"
   - First Name: "John"
   - Last Name: "Doe"
   - Email: "john@example.com"
   - Mobile: "9999999999"
   - User Type: "Admin"
4. Continue to Step 2 (Firm Details)
5. Fill firm details
6. Continue to Step 3 (Password)
7. Set password
8. Accept terms
9. Submit

**Expected:** Registration successful ✅

### Test User Registration:
1. Go to registration page
2. Select "Agent / Merchant"
3. Fill all fields:
   - Agency Name: "ABC Travels"
   - First Name: "John"
   - Last Name: "Doe"
   - Email: "john@example.com"
   - Mobile: "9999999999"
   - User Type: "Retailer"
4. Continue through steps
5. Submit

**Expected:** Registration successful ✅

---

## Summary

✅ **Fixed:** Mobile number field (added `mobile`)
✅ **Fixed:** First name field (added `firstName` and `lastName`)
✅ **Fixed:** Tenant type field (added `tenantType`)
✅ **Fixed:** Tenant profile info (using `tenantProfileInfo`)
✅ **Fixed:** Identity documents (using `identityDocuments`)
✅ **Separated:** User vs Tenant registration payloads

**All validation errors resolved!** 🚀
