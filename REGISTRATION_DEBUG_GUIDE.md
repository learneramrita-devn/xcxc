# Registration Issue - Debugging Guide

## Issue
User with mobile number **9001212123** attempted registration but user was not created properly.

## Fixes Applied

### 1. Enhanced Error Logging
Added comprehensive logging at multiple levels:

**API Level** (`onboardingApi.js`):
- Logs request payload
- Logs success response
- Logs error response with full details

**Service Level** (`onboardingService.js`):
- Validates required fields before API call
- Logs mobile, tenant ID, registration type
- Logs final payload
- Catches and logs errors

**Component Level** (`RegistrationForm.jsx`):
- Logs registration attempt details
- Logs full API response
- Better error message handling
- Specific error codes (409 for duplicate, 400 for invalid data)

### 2. Field Validation
Added validation for required fields:
- ✅ Mobile number (must be 10 digits)
- ✅ Email
- ✅ Password
- ✅ First name

### 3. Better Error Messages
- User already exists (409)
- Invalid data (400)
- Missing user ID in response
- Generic fallback errors

## How to Debug

### Step 1: Open Browser Console
Press F12 and go to Console tab

### Step 2: Attempt Registration
Fill the form with mobile **9001212123** and submit

### Step 3: Check Console Logs
Look for these log groups:
```
=== REGISTER USER SERVICE ===
=== FINAL REGISTER PAYLOAD ===
=== REGISTER API CALL ===
=== REGISTER API SUCCESS === or === REGISTER API ERROR ===
=== REGISTRATION RESPONSE ===
```

### Step 4: Check Network Tab
1. Go to Network tab in DevTools
2. Look for request to `/api/v1/users/create`
3. Check:
   - Request payload
   - Response status code
   - Response body

## Common Issues & Solutions

### Issue 1: User Already Exists
**Error**: 409 Conflict
**Solution**: User with this mobile/email already registered. Try login instead.

### Issue 2: Invalid Data
**Error**: 400 Bad Request
**Solution**: Check all required fields are filled correctly.

### Issue 3: Network Error
**Error**: Network request failed
**Solution**: Check if backend API is running and accessible.

### Issue 4: No User ID in Response
**Error**: "No user ID received from server"
**Solution**: Backend API not returning userId in response. Check backend logs.

## Testing Steps

1. **Clear Previous Data**:
   ```javascript
   localStorage.clear()
   ```

2. **Start Fresh Registration**:
   - Enter mobile: 9001212123
   - Click Continue
   - If user exists → Should show error
   - If user doesn't exist → Should proceed to OTP

3. **Complete Registration**:
   - Enter OTP: 123456
   - Fill all 3 steps
   - Accept terms
   - Check console for detailed logs

4. **Verify Success**:
   - Should see success toast
   - Should redirect to login
   - Try logging in with registered credentials

## API Endpoint
```
POST /api/v1/users/create
```

## Expected Response
```json
{
  "userId": "123",
  "status": "success",
  "message": "User created successfully"
}
```

## Next Steps
If registration still fails:
1. Share console logs
2. Share network request/response
3. Check backend API logs
4. Verify database entry
