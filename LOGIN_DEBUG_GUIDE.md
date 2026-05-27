# Login Debugging Guide for Mobile: 8009009009

## Test Credentials
- **Mobile:** 8009009009
- **Email:** sona@gmail.com
- **Password:** Test#1234 (or whatever was set during registration)

## Step-by-Step Login Flow

### Step 1: Mobile Check
1. Enter mobile: `8009009009`
2. Click "Continue"
3. **Check Console Logs:**
   ```
   === MOBILE CHECK ===
   Checking mobile: 8009009009
   User exists: true/false
   ```

### Step 2: Email & Password
1. Enter email: `sona@gmail.com`
2. Enter password: `Test#1234`
3. Click "Login"
4. **Check Console Logs:**
   ```
   === LOGIN ATTEMPT START ===
   Mobile: 8009009009
   Email: sona@gmail.com
   Password length: 9
   
   === LOGIN ATTEMPT ===
   Mobile entered: 8009009009
   Email entered: sona@gmail.com
   Username for API: sona@gmail.com
   TenantId: 1
   
   === LOGIN RESPONSE ===
   Full Response: {...}
   User Mobile from API: 8009009009
   User Email from API: sona@gmail.com
   User Status: ENABLED
   
   === MOBILE VALIDATION ===
   API Mobile (cleaned): 8009009009
   Entered Mobile (cleaned): 8009009009
   Do they match? true
   
   === LOGIN SUCCESS ===
   ```

## Common Issues & Solutions

### Issue 1: Login with wrong email succeeds
**Problem:** Backend is not validating mobile-email mapping
**Solution:** Client-side validation added to check if API response mobile matches entered mobile

### Issue 2: Any password works
**Problem:** Backend authentication is not working properly
**Solution:** Check backend API logs, ensure password hashing is correct

### Issue 3: Mobile mismatch not detected
**Problem:** API returns different mobile than entered
**Solution:** Check console logs for "MOBILE MISMATCH" error

## Testing Different Scenarios

### Test 1: Correct Credentials
```
Mobile: 8009009009
Email: sona@gmail.com
Password: Test#1234
Expected: Login SUCCESS
```

### Test 2: Wrong Email (Different User)
```
Mobile: 8009009009
Email: ruby@gmail.com
Password: Test#1234
Expected: Error - "This email is registered with mobile XXXXX, but you entered 8009009009"
```

### Test 3: Wrong Password
```
Mobile: 8009009009
Email: sona@gmail.com
Password: WrongPassword
Expected: Error - "Invalid email or password"
```

### Test 4: Non-existent Mobile
```
Mobile: 9999999999
Email: any@gmail.com
Password: any
Expected: Error - "This mobile number does not exist. Please register."
```

## Backend API Validation Checklist

The backend should validate:
1. ✅ Mobile number exists in database
2. ✅ Email matches the mobile number
3. ✅ Password hash matches stored hash
4. ✅ User status is ENABLED
5. ✅ Tenant ID matches
6. ✅ Return proper error codes

## Current Implementation

### Client-Side Validation:
- ✅ Email format validation
- ✅ Password required validation
- ✅ Mobile-email mismatch detection
- ✅ Rate limiting (5 attempts per 5 minutes)
- ✅ Detailed console logging

### What to Check in Console:
1. Open Browser DevTools (F12)
2. Go to Console tab
3. Try to login
4. Look for logs starting with "==="
5. Check if mobile numbers match
6. Check API response data

## If Login Still Fails:

1. **Clear localStorage:**
   ```javascript
   localStorage.clear();
   ```

2. **Check Network Tab:**
   - Open DevTools > Network
   - Filter: XHR
   - Look for `/auth/login` request
   - Check Request Payload
   - Check Response

3. **Verify Backend:**
   - Check if backend is running
   - Verify API endpoint: `POST /ums/v1/auth/login`
   - Check backend logs for errors

4. **Test with Postman:**
   ```json
   POST /ums/v1/auth/login
   {
     "username": "sona@gmail.com",
     "password": "Test#1234",
     "tenantId": 1
   }
   ```

## Expected API Response:
```json
{
  "status": {
    "httpStatus": "SUCCESSFUL",
    "httpStatusCode": 200
  },
  "accessToken": "eyJ...",
  "tokenType": "Bearer",
  "refreshToken": "eyJ...",
  "expiresIn": 1800000,
  "userId": 123,
  "mobileNumber": "8009009009",
  "email": "sona@gmail.com",
  "name": "User Name",
  "role": "AGENT",
  "userStatus": "ENABLED"
}
```

## Contact Backend Team If:
- API returns success but with wrong user data
- Password validation is not working
- Mobile-email mapping is not enforced
- User status is not being checked
