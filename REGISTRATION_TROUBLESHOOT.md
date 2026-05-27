# Registration Not Working - Troubleshooting Steps

## Step 1: Check Console Errors

Open browser console (F12) and look for:

### Expected Logs:
```
=== MOBILE CHECK ===
=== REGISTER USER SERVICE ===
=== FINAL REGISTER PAYLOAD ===
=== REGISTER API CALL ===
```

### Common Errors:

#### Error 1: Network Error
```
API Error: Network Error
```
**Solution**: Backend API is not reachable
- Check if backend is running at: http://13.126.207.62:8080
- Try opening: http://13.126.207.62:8080/actuator/health in browser

#### Error 2: 400 Bad Request
```
status: 400
message: "Invalid request"
```
**Solution**: Payload validation failed
- Check console for "FINAL REGISTER PAYLOAD"
- Verify all required fields are present

#### Error 3: 409 Conflict
```
status: 409
message: "User already exists"
```
**Solution**: User with this mobile/email already exists
- Try different mobile number
- Or try logging in instead

#### Error 4: 500 Internal Server Error
```
status: 500
message: "Internal server error"
```
**Solution**: Backend error
- Check backend logs
- Contact backend team

## Step 2: Check Network Tab

1. Open DevTools → Network tab
2. Try registration
3. Look for request to: `/api/v1/users/create`
4. Check:
   - Request Method: POST
   - Status Code: Should be 200 or 201
   - Request Payload: Should contain all user data
   - Response: Should contain userId

## Step 3: Manual API Test

Test the API directly using curl:

```bash
curl -X POST http://13.126.207.62:8080/api/v1/users/create \
  -H "Content-Type: application/json" \
  -d '{
    "tenantId": 1,
    "tenant": {"tenantId": 1},
    "externalUserId": "EXT-USR-TEST",
    "role": "AGENT",
    "name": "Test User",
    "email": "test@example.com",
    "mobileNumber": "9001212123",
    "passwordHash": "Test@123",
    "agentType": "AGENCY",
    "status": "ENABLED",
    "userSource": "WEB",
    "businessInfo": {
      "bsn": "Test Agency",
      "bstp": "Proprietorship",
      "rflcd": ""
    },
    "addressInfo": {
      "address": "Test Address",
      "cityName": "Mumbai",
      "state": "Maharashtra",
      "pinCode": "400001",
      "country": "India"
    },
    "userProfileInfo": {
      "fn": "Test User",
      "gdr": "MALE",
      "dob": "2000-01-01"
    },
    "userAdditionalInfo": {
      "rc": "",
      "ft": "Proprietorship",
      "curr": "INR",
      "cncd": "IN",
      "grade": "A",
      "bal": [{
        "bn": "",
        "accNo": "",
        "ifsc": "",
        "cmts": "",
        "ahn": "Test User",
        "vl": "PRIMARY",
        "bt": "SAVINGS"
      }]
    },
    "contactPersonInfo": {
      "name": "Test User",
      "mobileNumber": "9001212123",
      "email": "test@example.com"
    },
    "userDocuments": {},
    "kycInfo": {"ks": "PENDING"}
  }'
```

## Step 4: Check Specific Issues

### Issue: Button Not Clickable
- Check if loading state is stuck
- Check console for JavaScript errors
- Try refreshing the page

### Issue: Form Validation Errors
- Make sure all required fields are filled
- Check email format
- Check password requirements (min 8 chars, uppercase, lowercase, number, special char)

### Issue: OTP Not Working
- Demo OTP is: **123456**
- Make sure you enter exactly 6 digits

### Issue: Terms Not Accepted
- Make sure to check the terms checkbox before submitting

## Step 5: Clear Cache and Retry

```javascript
// Run in console
localStorage.clear();
sessionStorage.clear();
location.reload();
```

## Step 6: Check Backend API Status

Open in browser:
```
http://13.126.207.62:8080/actuator/health
```

Should return:
```json
{
  "status": "UP"
}
```

## Step 7: Detailed Console Commands

Run these in console to debug:

```javascript
// Check current form data
console.log(localStorage.getItem('registrationFormData'));

// Check API base URL
console.log(import.meta.env.VITE_API_BASE_URL);

// Test API connectivity
fetch('http://13.126.207.62:8080/actuator/health')
  .then(r => r.json())
  .then(d => console.log('API Status:', d))
  .catch(e => console.error('API Error:', e));
```

## What to Share for Help

If still not working, share:

1. **Console Logs** (all red errors)
2. **Network Tab** (screenshot of failed request)
3. **Request Payload** (from Network tab)
4. **Response** (from Network tab)
5. **Which step fails** (Mobile, OTP, Step 1, Step 2, Step 3, Terms)

## Quick Fix Checklist

- [ ] Backend API is running
- [ ] Network tab shows request to `/api/v1/users/create`
- [ ] Request payload has all required fields
- [ ] No console errors
- [ ] All form fields are filled correctly
- [ ] OTP entered correctly (123456)
- [ ] Terms checkbox is checked
- [ ] Not using duplicate mobile/email
