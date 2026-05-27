# Frontend Registration Flow - Complete Check

## Step 1: Environment Configuration ✅

**File:** `.env`
```env
VITE_API_BASE_URL=http://13.126.207.62:8080
VITE_FLIGHT_API_BASE_URL=http://13.126.207.62
VITE_TENANT_ID=1
```
✅ Correct - Port 8080 included

---

## Step 2: API Client Configuration ✅

**File:** `src/core/config/apiClient.js`

**Request Interceptor:**
```javascript
const token = getAccessToken();
if (token) {
  config.headers.Authorization = `Bearer ${token}`;
}
```
✅ Correct - Only adds Authorization header IF token exists

**Key Point:** For new user registration, there should be NO token in storage, so NO Authorization header will be sent.

---

## Step 3: Registration API Endpoint ✅

**File:** `src/modules/onboarding/tenants/api/onboardingApi.js`

```javascript
const ENDPOINTS = {
  REGISTER_USER: '/api/v1/users/create',
  REGISTER_TENANT: '/api/v1/users/create',
};

export const registerUserApi = (payload) => {
  console.log('Register User Endpoint:', ENDPOINTS.REGISTER_USER);
  console.log('Register User Payload:', JSON.stringify(payload, null, 2));
  return apiClient.post(ENDPOINTS.REGISTER_USER, payload);
};
```
✅ Correct endpoint: `/api/v1/users/create`

---

## Step 4: Registration Service ✅

**File:** `src/modules/onboarding/tenants/services/onboardingService.js`

```javascript
export const registerUser = async ({ mobile, tenantId, form, registrationType }) => {
  // Builds complete payload
  const payload = { ... };
  
  // Calls API
  const response = await registerUserApi(payload);
  return response;
};
```
✅ Correct - Proper payload structure

---

## Step 5: Registration Form Component ✅

**File:** `src/modules/onboarding/tenants/pages/RegistrationForm.jsx`

```javascript
const handleTermsAccept = async () => {
  // Validates required fields
  if (!mobile) { ... }
  if (!registerData.email) { ... }
  if (!registerData.password) { ... }
  
  // Calls registration service
  const res = await registerUser({ mobile, tenantId, form: registerData, registrationType });
  
  // Shows success message
  showToast('User successfully created!', 'success');
  setStep(STEPS.SUCCESS);
};
```
✅ Correct - Proper validation and error handling

---

## Frontend Flow Summary

```
User fills form
    ↓
Clicks "Accept Terms"
    ↓
RegistrationForm.handleTermsAccept()
    ↓
registerUser() service
    ↓
registerUserApi()
    ↓
apiClient.post('/api/v1/users/create', payload)
    ↓
Request Interceptor checks for token
    ↓
IF token exists → Adds Authorization header
IF no token → No Authorization header
    ↓
Sends request to backend
```

---

## Critical Question: Is There a Token in Storage?

**Scenario 1: Fresh User (No Token)**
- localStorage: Empty
- sessionStorage: Empty
- Cookies: Empty
- Authorization header: NOT SENT ✅
- Expected: Registration should work

**Scenario 2: Logged In User (Has Token)**
- localStorage/sessionStorage: Has token
- Authorization header: SENT ❌
- Expected: Backend returns 401 (because endpoint requires no auth)

---

## Test: Check if Token Exists

Run this in browser console:
```javascript
console.log('Access Token:', localStorage.getItem('authToken') || sessionStorage.getItem('authToken') || 'NONE');
console.log('Refresh Token:', localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken') || 'NONE');
```

**If tokens exist:**
- User is logged in or has old session
- Authorization header WILL be sent
- Backend might reject with 401

**If tokens are NONE:**
- Fresh user
- No Authorization header
- Should work IF backend allows public access

---

## Test: Direct API Call (No Token)

Run this in browser console:
```javascript
fetch('http://13.126.207.62:8080/api/v1/users/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    tenant: { tenantId: 1 },
    externalUserId: "EXT-USR-" + Date.now(),
    role: "AGENT",
    name: "TEST USER",
    email: "test" + Date.now() + "@example.com",
    mobileNumber: "9999999999",
    passwordHash: "Test@123",
    agentType: "AGENCY",
    status: "ENABLED",
    userSource: "WEB",
    userAdditionalInfo: { rc: "", rfb: "SYSTEM", grade: "A", ft: "PRIVATE", bal: [], ael: [], cncd: "IN", curr: "INR" },
    userProfileInfo: { gdr: "MALE", dob: "1995-01-01", zip: "110001", fn: "TEST USER", zd: "Delhi", co: "", pi: "", tz: "Asia/Kolkata", language: "EN", lurl: "" },
    userDocuments: { pan: "ABCDE1234F", adr: "123412341234" },
    addressInfo: { address: "Test", pinCode: "110001", cityName: "Delhi", state: "Delhi", country: "India" },
    contactPersonInfo: { name: "TEST USER", mobileNumber: "9999999999", email: "test@example.com" },
    businessInfo: { bstp: "TRAVEL", bsn: "Test Agency", rflcd: "" },
    securityInfo: { ip: "", di: navigator.userAgent, gl: "" },
    kycInfo: { ks: "PENDING", ksa: new Date().toISOString() },
    lifeCycleInfo: { iat: new Date().toISOString(), aat: null, sat: null, ovat: null }
  })
})
.then(r => r.json())
.then(d => console.log('Result:', d))
.catch(e => console.error('Error:', e));
```

**Expected Results:**

**If 200/201:** ✅ Backend allows public registration - Frontend is correct
**If 401:** ❌ Backend requires authentication - Backend needs fix

---

## Frontend Checklist

- ✅ Environment variables correct
- ✅ API endpoint correct (`/api/v1/users/create`)
- ✅ Payload structure correct
- ✅ Authorization header only sent if token exists
- ✅ Error handling implemented
- ✅ Success message implemented

---

## Possible Issues

### Issue 1: Old Token in Storage
**Symptom:** User previously logged in, token still in storage
**Solution:** Clear storage before registration
```javascript
localStorage.clear();
sessionStorage.clear();
```

### Issue 2: Backend Endpoint Protected
**Symptom:** Backend requires authentication for registration
**Solution:** Backend needs to make endpoint public

### Issue 3: CORS Issue
**Symptom:** Request blocked by browser
**Solution:** Backend needs CORS headers

---

## Debugging Steps

### Step 1: Clear All Storage
```javascript
localStorage.clear();
sessionStorage.clear();
document.cookie.split(";").forEach(c => {
  document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
});
location.reload();
```

### Step 2: Check Network Tab
1. Open DevTools (F12)
2. Go to Network tab
3. Try registration
4. Look for `/api/v1/users/create` request
5. Check:
   - Request Headers (Authorization header present?)
   - Request Payload (correct structure?)
   - Response Status (200/401/400?)
   - Response Body (error message?)

### Step 3: Check Console Logs
Look for these logs:
```
=== REGISTER USER FUNCTION CALLED ===
=== FINAL PAYLOAD ===
=== CALLING API ===
API Request: { method: 'post', url: '/api/v1/users/create', ... }
```

---

## Conclusion

**Frontend Code:** ✅ CORRECT

**Potential Issues:**
1. ⚠️ Old token in storage (user needs to clear storage)
2. ⚠️ Backend endpoint requires authentication (backend needs fix)

**Next Step:** Run the browser console tests to determine exact issue.
