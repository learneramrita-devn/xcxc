# 🎯 Registration Testing Checklist - 7008009000

## Pre-Testing Setup

### ✅ Step 1: Clear Browser Data
```javascript
// Run in browser console (F12)
localStorage.clear();
sessionStorage.clear();
location.reload();
```

### ✅ Step 2: Verify Backend is Running
- Backend URL: `http://localhost:8080`
- Check: Open `http://localhost:8080/actuator/health` (if available)

### ✅ Step 3: Load Test Script
```javascript
// Copy entire content from test-7008009000.js
// Paste in browser console
// You should see: "✅ Test functions loaded!"
```

---

## Test Case 1: Check User Exists (7008009000)

### Run Test:
```javascript
testUserCheck();
```

### Expected Output:
```
--- TEST 1: User Check ---
Response Status: 200
Response Data: {
  "isExist": true,
  "userId": 123,
  "mobileNumber": "7008009000"
}
User Exists: true
Type of isExist: boolean
```

### ✅ Pass Criteria:
- [ ] Status is 200
- [ ] `isExist` is `true`
- [ ] `userId` is present
- [ ] `mobileNumber` matches

### ❌ If Failed:
- User not registered yet
- Backend not returning correct data
- API endpoint incorrect

---

## Test Case 2: Check Tenant Exists (7008009000)

### Run Test:
```javascript
testTenantCheck();
```

### Expected Output:
```
--- TEST 2: Tenant Check ---
Response Status: 200
Response Data: {
  "isExist": false
}
Tenant Exists: false
```

### ✅ Pass Criteria:
- [ ] Status is 200
- [ ] Response received

---

## Test Case 3: Check LocalStorage

### Run Test:
```javascript
testLocalStorage();
```

### Expected Output:
```
--- TEST 3: LocalStorage Check ---
No registration data in localStorage
```

### ✅ Pass Criteria:
- [ ] No old registration data present
- [ ] Clean state for testing

---

## Test Case 4: Login Test (If User Exists)

### Run Test:
```javascript
testLogin("Test@123");  // Replace with actual password
```

### Expected Output:
```
--- TEST 4: Login Test ---
Response Status: 200
Response Data: {
  "accessToken": "eyJhbGc...",
  "refreshToken": "...",
  "tokenType": "Bearer",
  "mobileNumber": "7008009000",
  "email": "test@example.com",
  "userStatus": "ENABLED"
}
✅ Login Successful!
Access Token: eyJhbGc...
```

### ✅ Pass Criteria:
- [ ] Status is 200
- [ ] `accessToken` present
- [ ] `mobileNumber` matches
- [ ] `userStatus` is "ENABLED"

### ❌ If Failed:
- Wrong password
- User not activated
- Backend issue

---

## Test Case 5: New User Registration

### Manual Steps:
1. Go to registration page
2. Enter mobile: `9999999999` (new number)
3. Click "Continue"
4. Should show "Register" button
5. Click "Register here"
6. Select "Travel Agent"
7. Fill all required fields:
   - First Name: Test
   - Last Name: User
   - Email: test@example.com
   - Agency Name: Test Agency
   - Address: Test Address
   - City: Mumbai
   - State: Maharashtra
   - Pincode: 400001
8. Click "Next"
9. Create password: Test@123
10. Click "Submit"
11. Accept Terms & Conditions

### Expected Results:
- [ ] Form submits without errors
- [ ] Console shows: `POST /api/v1/users/create`
- [ ] Console shows: `=== REGISTRATION RESPONSE ===`
- [ ] Success toast appears: "User successfully created!"
- [ ] Toast visible for 1.5 seconds
- [ ] Redirects to mobile verification screen

### Console Logs to Verify:
```
=== REGISTRATION RESPONSE ===
Full Response: {...}
User ID: 456

Registration Type: USER
Register payload: {...}
```

---

## Test Case 6: Tenant Registration (API Partner)

### Manual Steps:
1. Go to registration page
2. Enter mobile: `8888888888` (new number)
3. Click "Continue"
4. Should show "Register" button
5. Click "Register here"
6. Select "API Partner"
7. Fill all required fields
8. Submit form
9. Accept Terms

### Expected Results:
- [ ] Form submits without errors
- [ ] Console shows: `POST /ums/v1/tenant/save`
- [ ] Console shows: `Registration Type: TENANT`
- [ ] Success toast: "Tenant successfully created!"
- [ ] Redirects to mobile verification

---

## Test Case 7: Existing User Login (7008009000)

### Manual Steps:
1. Go to login page
2. Enter mobile: `7008009000`
3. Click "Continue"

### Expected Results:
- [ ] Shows password field (not register button)
- [ ] Console shows: `User exists: true`
- [ ] Can enter password and login

### If Shows "Register" Instead:
❌ **Problem**: User check not working
- Check API response format
- Verify backend data
- Check console logs

---

## Test Case 8: Registration Flow End-to-End

### Complete Flow Test:
1. **Clear Data**: `localStorage.clear()`
2. **New Mobile**: Use `7777777777`
3. **Register**: Complete full registration
4. **Verify**: Check user exists
5. **Login**: Login with new credentials

### Checklist:
- [ ] Mobile check works
- [ ] Registration form loads
- [ ] All fields validate
- [ ] API call succeeds
- [ ] Success toast shows
- [ ] Redirect works
- [ ] User can login

---

## Debug Checklist

### If Registration Fails:

#### Check 1: Console Errors
```javascript
// Look for:
- API errors
- Network errors
- Validation errors
- JavaScript errors
```

#### Check 2: Network Tab
```javascript
// Verify:
- Request URL correct
- Request payload correct
- Response status 200
- Response has userId
```

#### Check 3: API Response
```javascript
// Should have:
{
  "userId": 123,
  "message": "User created successfully"
}
```

#### Check 4: Toast Component
```javascript
// Verify:
- Toast component imported
- showToast function working
- Toast CSS loaded
```

---

## Common Issues & Solutions

### Issue 1: "User not found" after registration
**Solution**:
```javascript
// Check API response
testUserCheck();
// Should return isExist: true
```

### Issue 2: No success toast
**Solution**:
```javascript
// Check console for:
=== REGISTRATION RESPONSE ===
// If present but no toast, check Toast component
```

### Issue 3: Wrong API called
**Solution**:
```javascript
// Check console for:
Registration Type: TENANT (or USER)
// Verify correct API endpoint in Network tab
```

### Issue 4: Redirect not working
**Solution**:
```javascript
// Check if setTimeout is working
// Verify onSuccess callback defined
```

---

## Final Verification

### ✅ All Tests Pass When:
1. [ ] User check returns correct data
2. [ ] Registration API succeeds
3. [ ] Success toast appears
4. [ ] Correct message shows (User/Tenant)
5. [ ] Redirect happens after 1.5s
6. [ ] User can login after registration
7. [ ] No console errors
8. [ ] No network errors

---

## Test Results Template

```
Date: ___________
Tester: ___________

Test Case 1 (User Check): ☐ Pass ☐ Fail
Test Case 2 (Tenant Check): ☐ Pass ☐ Fail
Test Case 3 (LocalStorage): ☐ Pass ☐ Fail
Test Case 4 (Login): ☐ Pass ☐ Fail
Test Case 5 (User Registration): ☐ Pass ☐ Fail
Test Case 6 (Tenant Registration): ☐ Pass ☐ Fail
Test Case 7 (Existing User): ☐ Pass ☐ Fail
Test Case 8 (End-to-End): ☐ Pass ☐ Fail

Issues Found:
_________________________________
_________________________________
_________________________________

Notes:
_________________________________
_________________________________
_________________________________
```

---

## 📞 Report Issues

If any test fails, provide:
1. Test case number
2. Console logs (copy full output)
3. Network tab screenshot
4. API response data
5. Steps to reproduce

**All tests should pass after the fix!** ✅
