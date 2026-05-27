# Quick Fix - Backend Service Error

## Error
"There is something went wrong in backend service."

---

## Step 1: Run Test Script

1. Open browser console (F12)
2. Copy and paste this entire script:

```javascript
// Copy from test-registration-error.js file
```

Or open the file: `test-registration-error.js` and copy-paste in console.

3. Press Enter
4. Wait for response
5. Copy the error output

---

## Step 2: Check Network Tab

1. Open DevTools (F12)
2. Go to **Network** tab
3. Try registration again
4. Look for request to `/ums/v1/tenant/register` or `/ums/v1/users/register`
5. Click on it
6. Go to **Response** tab
7. Copy the response

---

## Step 3: Most Common Issues

### Issue 1: Missing companyName
**Error:** "companyName must not be blank"
**Fix:** Make sure company name is filled in Step 1

### Issue 2: Missing identityDocuments
**Error:** "identityDocuments must not be null"
**Fix:** Fill PAN/Aadhaar in Step 2

### Issue 3: Backend Service Down
**Error:** "There is something went wrong"
**Fix:** Backend developer needs to check service

### Issue 4: Database Connection
**Error:** "Cannot connect to database"
**Fix:** Backend developer needs to check database

---

## Step 4: Test with Minimal Data

Try registering with this minimal data:

**Step 1:**
- Company Name: ABC Company
- First Name: John
- Last Name: Doe
- Email: test@test.com
- User Type: Admin

**Step 2:**
- Firm Type: Proprietor
- PAN: ABCDE1234F
- Aadhaar: 123456789012
- Pincode: 110001
- City: Delhi
- State: Delhi
- Address: Test Address

**Step 3:**
- Password: Test@123
- Confirm: Test@123

If this works → Your previous data had issues
If this fails → Backend has issues

---

## Step 5: Share with Backend Developer

Send them:

1. **Console logs** (from Step 1)
2. **Network response** (from Step 2)
3. **Registration type** (Travel Agent / API Partner / etc.)
4. **Test data** (what you filled in the form)

---

## Quick Backend Test

Backend developer can test directly:

```bash
# Test if endpoint is accessible
curl -X POST http://13.126.207.62:8080/ums/v1/tenant/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "test@test.com",
    "mobile": "9999999999",
    "mobileNumber": "9999999999",
    "passwordHash": "Test@123",
    "tenantType": "API_PARTNER",
    "agentType": "API_PARTNER",
    "status": "ENABLED",
    "userSource": "WEB",
    "role": "AGENT",
    "name": "JOHN DOE",
    "externalUserId": "EXT-USR-123",
    "companyName": "Test Company",
    "tenantProfileInfo": {
      "gdr": "MALE",
      "fn": "JOHN DOE",
      "ln": "Doe"
    },
    "identityDocuments": {
      "pan": "ABCDE1234F",
      "adr": "123456789012"
    },
    "addressInfo": {
      "address": "Test",
      "pinCode": "110001",
      "cityName": "Delhi",
      "state": "Delhi",
      "country": "India"
    }
  }'
```

---

## Expected Response

**Success (200):**
```json
{
  "status": {
    "httpStatus": "SUCCESSFUL",
    "httpStatusCode": 200
  },
  "tenantId": 123,
  "message": "Tenant created successfully"
}
```

**Error (500):**
```json
{
  "errors": [{
    "errCode": "INTERNAL_ERROR",
    "message": "NullPointerException",
    "details": "..."
  }],
  "status": {
    "httpStatus": "SERVER_ERROR",
    "httpStatusCode": 500
  }
}
```

---

## Summary

1. ✅ Run test script in console
2. ✅ Check Network tab response
3. ✅ Try with minimal test data
4. ✅ Share logs with backend developer
5. ⚠️ Backend needs to fix the service

**The error is in backend, not frontend!**
