# 🔧 Registration Issue Fix - 7008009000

## ❌ Problem
- User 7008009000 registered successfully in Postman
- Browser shows "User not found" or no success message
- Registration not working properly

## ✅ Solution Applied

### Changes Made:

#### 1. **API Endpoints Fixed** (`onboardingApi.js`)
- Added separate `REGISTER_TENANT` endpoint
- Created `registerTenantApi()` function
- Now properly routes to correct API based on user type

#### 2. **Registration Logic Fixed** (`onboardingService.js`)
- Added automatic detection of Tenant vs User registration
- Routes correctly:
  - **Travel Agent** → `/api/v1/users/create`
  - **API Partner/WhiteLabel/Corporate** → `/ums/v1/tenant/save`

#### 3. **User Check Fixed** (`onboardingService.js`)
- Improved `checkUserExists()` function
- Better error handling
- Proper boolean parsing for `isExist` field

#### 4. **Success Message Added** (`RegistrationForm.jsx`)
- Shows proper success toast:
  - "User successfully created!" for Travel Agents
  - "Tenant successfully created!" for API Partners/WhiteLabel/Corporate
- 1.5 second delay before redirect
- Better error logging

---

## 🧪 Testing Steps

### Step 1: Clear Browser Data
```javascript
// Run in browser console
localStorage.clear();
sessionStorage.clear();
location.reload();
```

### Step 2: Test User Check
```javascript
// Copy test-7008009000.js content to console
// Then run:
runAllTests();
```

### Step 3: Expected Results

#### If User Exists (7008009000):
```
User Check Response:
{
  "isExist": true,
  "userId": 123,
  "mobileNumber": "7008009000"
}
```

#### If User Doesn't Exist:
```
User Check Response:
{
  "isExist": false
}
```

---

## 🔍 Debug Checklist

### Browser Console Checks:
1. Open DevTools (F12)
2. Go to Console tab
3. Look for these logs:

```
=== CHECKING USER EXISTS ===
Mobile: 7008009000

=== USER CHECK API RESPONSE ===
Full Response: {...}
isExist field: true
Type of isExist: boolean
User exists (parsed): true
```

### Network Tab Checks:
1. Open DevTools → Network tab
2. Filter by "Fetch/XHR"
3. Check these requests:

**User Check Request:**
```
POST /ums/v1/users/user-check
Request: {"mobileIn": ["7008009000"]}
Response: {"isExist": true, ...}
```

**Registration Request:**
```
POST /api/v1/users/create  (for Travel Agent)
OR
POST /ums/v1/tenant/save   (for API Partner/WhiteLabel/Corporate)
```

---

## 🐛 Common Issues & Fixes

### Issue 1: User shows as not existing even after registration

**Cause**: API response format mismatch

**Fix**: Check API response structure
```javascript
// In browser console after user check:
// Should see:
{
  "isExist": true,  // or "true" as string
  "userId": 123,
  "mobileNumber": "7008009000"
}
```

**If `isExist` is missing or wrong format:**
- Contact backend team
- Check API documentation
- Verify backend is returning correct response

---

### Issue 2: Registration successful but no toast message

**Cause**: Toast not showing or timing issue

**Fix**: Check console for:
```
=== REGISTRATION RESPONSE ===
Full Response: {...}
User ID: 123
```

**If you see this but no toast:**
1. Check if Toast component is imported
2. Verify `showToast()` function is working
3. Check CSS for toast visibility

---

### Issue 3: Wrong API being called

**Cause**: Registration type not detected properly

**Fix**: Check console for:
```
Registration Type: TENANT  (or USER)
Register payload: {...}
```

**Verify `agentType` in payload:**
- `AGENCY` → User API
- `API_PARTNER`, `WHITE_LABEL`, `CORP_PARTNER` → Tenant API

---

## 📋 Manual Testing Steps

### Test 1: Register New User (Travel Agent)
1. Go to registration page
2. Enter mobile: `9999999999` (new number)
3. Select: "Travel Agent"
4. Fill all details
5. Submit

**Expected:**
- ✅ Success toast: "User successfully created!"
- ✅ Redirect to mobile verification after 1.5s
- ✅ Console shows: `POST /api/v1/users/create`

---

### Test 2: Register New Tenant (API Partner)
1. Go to registration page
2. Enter mobile: `8888888888` (new number)
3. Select: "API Partner"
4. Fill all details
5. Submit

**Expected:**
- ✅ Success toast: "Tenant successfully created!"
- ✅ Redirect to mobile verification after 1.5s
- ✅ Console shows: `POST /ums/v1/tenant/save`

---

### Test 3: Login Existing User (7008009000)
1. Go to login page
2. Enter mobile: `7008009000`
3. Click Continue

**Expected:**
- ✅ Shows password field (user exists)
- ✅ Console shows: `User exists: true`

**If shows "Register" instead:**
- ❌ User check API not returning correct data
- Check backend response format

---

## 🔧 Quick Fixes

### Fix 1: Clear All Data
```javascript
// Run in console
localStorage.clear();
sessionStorage.clear();
document.cookie.split(";").forEach(c => {
  document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
});
location.reload();
```

### Fix 2: Force User Check
```javascript
// Run in console
async function forceCheck() {
  const response = await fetch('http://localhost:8080/ums/v1/users/user-check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mobileIn: ['7008009000'] })
  });
  const data = await response.json();
  console.log('User Check Result:', data);
  return data;
}
forceCheck();
```

### Fix 3: Test Registration Directly
```javascript
// Run in console
async function testRegistration() {
  const payload = {
    tenantId: 1,
    tenant: { tenantId: 1 },
    externalUserId: `EXT-USR-${Date.now()}`,
    role: 'AGENT',
    name: 'Test User',
    email: 'test@example.com',
    mobileNumber: '7008009000',
    passwordHash: 'Test@123',
    agentType: 'AGENCY',
    status: 'ENABLED',
    userSource: 'WEB',
    businessInfo: { bsn: 'Test Agency', bstp: 'Proprietorship', rflcd: '' },
    addressInfo: { address: 'Test', cityName: 'Mumbai', state: 'Maharashtra', pinCode: '400001', country: 'India' },
    userProfileInfo: { fn: 'Test User', gdr: 'MALE', dob: '1990-01-01' },
    userAdditionalInfo: { rc: '', ft: 'Proprietorship', curr: 'INR', cncd: 'IN', grade: 'A', bal: [] },
    contactPersonInfo: { name: 'Test User', mobileNumber: '7008009000', email: 'test@example.com' },
    userDocuments: {},
    kycInfo: { ks: 'PENDING' }
  };
  
  const response = await fetch('http://localhost:8080/api/v1/users/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  
  const data = await response.json();
  console.log('Registration Result:', data);
  return data;
}
testRegistration();
```

---

## 📞 Next Steps

1. **Clear browser data** (localStorage, cookies)
2. **Run test script** (`test-7008009000.js`)
3. **Check console logs** for detailed debugging
4. **Verify API responses** in Network tab
5. **Test registration flow** with new mobile number

If issue persists:
- Share console logs
- Share Network tab screenshots
- Share API response data

---

## ✅ Success Criteria

Registration is working when:
- ✅ User check returns correct `isExist` value
- ✅ Registration API returns success response
- ✅ Success toast shows correct message
- ✅ Redirects to mobile verification screen
- ✅ User can login after registration
