# Backend Service Error - Debug Guide

## Error Message
"There is something went wrong in backend service."

This is a generic error message. We need to check console logs to see the actual error.

---

## Step 1: Check Browser Console

1. Open Browser Console (F12)
2. Go to Console tab
3. Try registration again
4. Look for these logs:

```
=== REGISTER USER FUNCTION CALLED ===
=== FINAL PAYLOAD ===
=== CALLING API ===
=== API CLIENT ERROR ===
```

---

## Step 2: Check Error Details

Look for these specific error details in console:

### Error Status:
```
Response Status: 500 (Internal Server Error)
Response Status: 400 (Bad Request)
Response Status: 401 (Unauthorized)
Response Status: 409 (Conflict)
```

### Backend Error Message:
```
Backend Errors: [
  {
    "errCode": "...",
    "message": "...",
    "details": "..."
  }
]
```

### Request Details:
```
Request URL: /ums/v1/users/register or /ums/v1/tenant/register
Request Method: POST
Request Data: { ... }
```

---

## Common Backend Errors

### Error 1: 500 Internal Server Error
**Meaning:** Backend service crashed or has a bug

**Possible Causes:**
- Database connection failed
- Null pointer exception in backend code
- Missing required configuration
- Backend service is down

**Solution:**
- Check backend logs
- Restart backend service
- Check database connection
- Contact backend developer

### Error 2: 400 Bad Request
**Meaning:** Invalid data sent to backend

**Possible Causes:**
- Missing required fields
- Invalid field format
- Wrong data type

**Solution:**
- Check console for "Request Data"
- Verify all required fields are present
- Check field formats match backend expectations

### Error 3: 401 Unauthorized
**Meaning:** Authentication required but not provided

**Possible Causes:**
- Registration endpoint requires authentication (should be public)
- Token expired

**Solution:**
- Backend needs to make registration endpoint public
- Add endpoint to `permitAll()` list

### Error 4: 409 Conflict
**Meaning:** User already exists

**Possible Causes:**
- Email already registered
- Mobile number already registered

**Solution:**
- Use different email/mobile
- Or login with existing credentials

---

## Debug Steps

### Step 1: Copy Console Logs
1. Open Console (F12)
2. Try registration
3. Copy all error logs
4. Share with backend developer

### Step 2: Check Payload
Look for "Request Data" in console:

```javascript
{
  "firstName": "...",
  "lastName": "...",
  "email": "...",
  "mobile": "...",
  "mobileNumber": "...",
  "tenantType": "...",
  // ... etc
}
```

**Verify:**
- ✅ All required fields present?
- ✅ No null/undefined values?
- ✅ Correct field names?
- ✅ Correct data types?

### Step 3: Test with cURL
Copy the payload from console and test directly:

```bash
# For User Registration
curl -X POST http://13.126.207.62:8080/ums/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "tenant": {"tenantId": 1},
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "mobileNumber": "9999999999",
    "passwordHash": "Test@123",
    "agentType": "AGENCY",
    "status": "ENABLED",
    "userSource": "WEB"
  }'

# For Tenant Registration
curl -X POST http://13.126.207.62:8080/ums/v1/tenant/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "mobile": "9999999999",
    "mobileNumber": "9999999999",
    "passwordHash": "Test@123",
    "tenantType": "API_PARTNER",
    "agentType": "API_PARTNER",
    "status": "ENABLED",
    "userSource": "WEB"
  }'
```

---

## Enhanced Error Logging

We've added detailed error logging. Now you'll see:

### In Console:
```
=== API CLIENT ERROR ===
Full Error Object: { ... }
Error Message: "..."
Error Code: "..."
Response Status: 500
Response Data: { ... }
Request URL: "/ums/v1/users/register"
Request Method: "POST"
Request Data: "{ ... }"
Backend Errors: [ ... ]
Final Error Message: "..."
```

### In Alert:
Instead of generic "Something went wrong", you'll see:
- "Backend service error. Please contact support." (500)
- "Invalid data. Please check all fields." (400)
- "User already exists with this email or mobile." (409)
- Specific backend error message

---

## What to Share with Backend Developer

### 1. Console Logs
Copy entire console output including:
- Request URL
- Request Data (payload)
- Response Status
- Response Data
- Backend Errors

### 2. Steps to Reproduce
1. Go to registration page
2. Select user type (Travel Agent / API Partner / etc.)
3. Fill form with these values: ...
4. Click submit
5. Error appears

### 3. Expected vs Actual
**Expected:** User registered successfully
**Actual:** "There is something went wrong in backend service"

---

## Quick Checks

### Check 1: Is Backend Running?
```bash
curl http://13.126.207.62:8080/health
```

### Check 2: Is Endpoint Public?
```bash
curl -X POST http://13.126.207.62:8080/ums/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{"test":"data"}'
```

If returns 401 → Endpoint not public
If returns 400/500 → Endpoint is public but has other issues

### Check 3: Database Connection?
Backend developer should check:
- Database is running
- Connection pool not exhausted
- Database credentials correct

---

## Temporary Workaround

If backend is down or has issues, show maintenance message:

```javascript
// In RegistrationForm.jsx
catch (err) {
  if (err.status === 500) {
    showToast(
      'Registration service is temporarily unavailable. Please try again later or contact support at support@example.com',
      'error'
    );
  } else {
    showToast(err.message, 'error');
  }
}
```

---

## Summary

✅ **Enhanced error logging** - More details in console
✅ **Better error messages** - User-friendly messages
✅ **Debug steps** - How to identify the issue
✅ **Backend checklist** - What backend needs to check

**Next Step:** Check browser console and share logs with backend developer.

---

## Example Console Output

```
=== REGISTER USER FUNCTION CALLED ===
Input Parameters:
- Mobile: 9999999999
- Tenant ID: 1
- Registration Type: api_partner

=== TENANT REGISTRATION PAYLOAD ===
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "mobile": "9999999999",
  "tenantType": "API_PARTNER",
  ...
}

=== CALLING TENANT API ===
API Endpoint: /ums/v1/tenant/register

=== API CLIENT ERROR ===
Response Status: 500
Backend Errors: [
  {
    "errCode": "INTERNAL_ERROR",
    "message": "NullPointerException at line 123",
    "details": "Cannot invoke method on null object"
  }
]
Final Error Message: "NullPointerException at line 123"
```

**This tells backend developer exactly where the issue is!**
