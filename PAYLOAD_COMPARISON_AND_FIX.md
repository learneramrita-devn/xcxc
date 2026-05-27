# Payload Comparison & Fix

## 🔍 Key Differences Found

### 1. **tenantDocument Structure**
- ❌ **Your Code**: `identityDocuments` (object)
- ✅ **Developer**: `tenantDocument` (array of objects)

### 2. **ipwl Field Type**
- ❌ **Your Code**: `ipwl: "192.168.1.0/24"` (string)
- ✅ **Developer**: `ipwl: ["192.168.1.0/24"]` (array)

### 3. **Missing Fields in Your Payload**
- `tenantStatus` - Status of tenant (ACTIVE, INACTIVE, etc.)
- `tenantAdditionalInfo` - Additional metadata
  - `rc` - Referral code
  - `aud` - Audit field
  - `iaad`, `iev`, `imv` - Boolean flags
  - `notes` - Additional notes
- `callbackUrls` - Payment callback URLs
  - `paymentSuccess`
  - `paymentFailure`
- `bankAccountInfo` - Bank account details
  - `bn` - Bank name
  - `accNo` - Account number
  - `ifsc` - IFSC code
  - `cmts` - Comments
  - `ahn` - Account holder name
  - `vl` - Validation status
  - `bt` - Bank type (SAVINGS/CURRENT)
- `agencies` - Array of agency/distributor info

### 4. **Field Name Differences**
| Your Code | Developer's Code |
|-----------|------------------|
| `identityDocuments` | `tenantDocument` (array) |
| `addressInfo` | `addressDetails` |
| `contactPersonInfo` | Not in developer's payload |
| `businessInfo` | Not in developer's payload |
| `securityInfo` | `tenantSecurityInfo` |
| `kycInfo` | `kycDetails` |
| `lifeCycleInfo` | Not in developer's payload |

### 5. **kycDetails vs kycInfo**
**Developer's kycDetails:**
```json
{
  "firmType": "PRIVATE_LIMITED",
  "gst": "09ABCDE1234F1Z5",
  "pan": "ABCDE1234F",
  "aadhaar": "123412341234",
  "companyPan": "AAACI1234P",
  "cin": "U12345UP2023PTC012345"
}
```

**Your kycInfo:**
```json
{
  "ks": "PENDING",
  "ksa": "2026-05-25T18:16:10.467Z"
}
```

### 6. **tenantProfileInfo Differences**
**Developer has:**
- `fn` - Full name
- `zd` - Zone/district
- `co` - Care of
- `pi` - Profile image
- `lurl` - Logo URL
- `dom` - Domain

**Your code has:**
- `fn`, `ln` - First name, Last name (separate)
- Missing: `dom` (domain)

## 🔧 Required Changes

### Change 1: Rename and Restructure Fields
```javascript
// OLD (Your Code)
identityDocuments: { pan, adr, cin, gst }

// NEW (Developer's Format)
tenantDocument: [{ pan, adr, pspt, gst }]
```

### Change 2: Add Missing Root Fields
```javascript
tenantStatus: "ACTIVE",
tenantAdditionalInfo: {
  rc: form.referralCode || "",
  aud: 0,
  iaad: false,
  iev: false,
  imv: false,
  notes: ""
},
callbackUrls: {
  paymentSuccess: "",
  paymentFailure: ""
},
bankAccountInfo: {
  bn: "",
  accNo: "",
  ifsc: "",
  cmts: "",
  ahn: "",
  vl: "ACTIVE",
  bt: "CURRENT"
},
agencies: []
```

### Change 3: Rename Nested Objects
```javascript
// OLD
addressInfo → addressDetails
tenantSecurityInfo.ipwl (string) → tenantSecurityInfo.ipwl (array)
```

### Change 4: Update kycDetails Structure
```javascript
// OLD
kycInfo: { ks: "PENDING", ksa: "..." }

// NEW
kycDetails: {
  firmType: form.firmType || "PRIVATE_LIMITED",
  gst: form.gst || "",
  pan: form.pan || "",
  aadhaar: form.aadhaar || "",
  companyPan: form.companyPan || "",
  cin: form.cin || ""
}
```

### Change 5: Remove Fields Not in Developer's Payload
- Remove `contactPersonInfo`
- Remove `businessInfo`
- Remove `lifeCycleInfo`
- Remove `externalUserId`
- Remove `role`
- Remove `agentType`
- Remove `userSource`

## 📋 Summary of Issues

1. ✅ **Structure mismatch**: `identityDocuments` should be `tenantDocument` array
2. ✅ **Type mismatch**: `ipwl` should be array, not string
3. ✅ **Missing fields**: 6 major sections missing
4. ✅ **Wrong field names**: 4 field names need to be changed
5. ✅ **Extra fields**: 5 fields that shouldn't be in tenant payload
6. ✅ **KYC structure**: Completely different structure

## 🎯 Next Steps

1. Update `onboardingService.js` tenant payload structure
2. Add missing fields to the form if needed
3. Test with backend API
4. Verify all field mappings
