# Final Payload Fix - Clear Instructions

## Issues in Current Payload:

### 1. ❌ Duplicate `name` field
```json
"name": "SIVAY DUBEY",  // Remove this
"firstName": "Sivay",
"lastName": "Dubey"
```

### 2. ❌ Duplicate `mobile` field
```json
"mobile": "8008008000",  // Remove this
"mobileNumber": "8008008000"
```

### 3. ❌ Wrong `fn` value
```json
"fn": "SIVAY DUBEY",  // Should be just "Sivay"
```

### 4. ❌ `identityDocuments` is array instead of object
```json
"identityDocuments": [{  // Wrong - array
  "pan": "ABCDE1234F"
}]

// Should be:
"identityDocuments": {  // Correct - object
  "pan": "ABCDE1234F"
}
```

---

## ✅ Code is Already Fixed!

The code in `onboardingService.js` is correct. The issue is **browser cache**.

---

## How to Clear Cache and Test:

### Method 1: Hard Refresh
1. Press `Ctrl + Shift + R` (Windows/Linux)
2. Or `Cmd + Shift + R` (Mac)
3. Try registration again

### Method 2: Clear Browser Cache
1. Press `Ctrl + Shift + Delete`
2. Select "Cached images and files"
3. Click "Clear data"
4. Refresh page
5. Try registration again

### Method 3: Incognito Mode
1. Open Incognito/Private window
2. Go to registration page
3. Try registration

### Method 4: Stop and Restart Dev Server
```bash
# Stop server (Ctrl + C)
# Then restart
npm run dev
```

---

## Expected Clean Payload:

```json
{
  "externalUserId": "EXT-USR-1779731669327",
  "role": "AGENT",
  "firstName": "Sivay",
  "lastName": "Dubey",
  "email": "sivay@gmail.com",
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
    "fn": "Sivay",
    "ln": "Dubey",
    "zd": "indore",
    "co": "India",
    "pi": null,
    "tz": "Asia/Kolkata",
    "language": "EN",
    "lurl": null
  },
  
  "identityDocuments": {
    "pan": "ABCDE1234F",
    "adr": "662223509284",
    "cin": null,
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
    "ip": null,
    "di": "Mozilla/5.0...",
    "gl": null
  },
  
  "kycInfo": {
    "ks": "PENDING",
    "ksa": "2026-05-25T17:54:29.327Z"
  },
  
  "lifeCycleInfo": {
    "iat": "2026-05-25T17:54:29.327Z",
    "aat": null,
    "sat": null,
    "ovat": null
  }
}
```

---

## Verify in Console:

After clearing cache, check console logs:

```
=== TENANT REGISTRATION PAYLOAD ===
{
  "firstName": "Sivay",  // ✅ No "name" field
  "mobileNumber": "8008008000",  // ✅ No "mobile" field
  "tenantProfileInfo": {
    "fn": "Sivay"  // ✅ Just first name
  },
  "identityDocuments": {  // ✅ Object, not array
    "pan": "ABCDE1234F"
  }
}
```

---

## If Still Showing Old Payload:

### Check 1: Verify File Saved
```bash
# Check last modified time
ls -la src/modules/onboarding/tenants/services/onboardingService.js
```

### Check 2: Restart Dev Server
```bash
# Stop (Ctrl + C)
npm run dev
```

### Check 3: Check Build
```bash
# Clear build cache
rm -rf node_modules/.vite
npm run dev
```

---

## Summary:

✅ **Code is fixed** - All duplicate fields removed
✅ **identityDocuments is object** - Not array
✅ **fn has first name only** - Not full name

⚠️ **Browser cache issue** - Need to clear cache

**Action:** Clear browser cache and test again!

---

## Quick Test:

1. Stop dev server (Ctrl + C)
2. Start dev server: `npm run dev`
3. Open Incognito window
4. Try registration
5. Check console for clean payload
6. Should work now!

🚀
