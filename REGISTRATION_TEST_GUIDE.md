# Registration Test Guide - Mobile: 9001212123

## Current Status
✅ User does not exist - Registration option is showing correctly

## Complete Registration Steps

### Step 1: Mobile Number Entry
1. Go to `/register`
2. Enter mobile: **9001212123**
3. Click **Continue**
4. ✅ Should show: "Mobile number not registered. Please register first."
5. Click **Register here** button

### Step 2: OTP Verification
1. OTP screen will appear
2. Enter OTP: **123456** (Demo OTP)
3. Click **Continue**
4. ✅ Should proceed to Registration Step 1

### Step 3: Basic Details (Step 1 of 3)
Fill the following fields:

**For Agency Registration:**
- Business Type: Select "Travel Agency"
- Agency Name: "Test Travel Agency"
- First Name: "Test"
- Last Name: "User"
- Email: "test@example.com"
- User Type: Select appropriate type
- Referral Code: (Optional)

Click **Continue**

### Step 4: Agency Details (Step 2 of 3)
Fill the following fields:
- Firm Type: Select (e.g., "Proprietorship")
- Address: "123 Test Street"
- City: "Mumbai"
- State: "Maharashtra"
- Pincode: "400001"
- PAN: "ABCDE1234F" (Optional)
- Aadhaar: "1234-5678-9012" (Optional)
- GST: (Optional)

Click **Continue**

### Step 5: Password (Step 3 of 3)
- Password: Enter strong password (min 8 chars, uppercase, lowercase, number, special char)
- Confirm Password: Re-enter same password

Click **Continue**

### Step 6: Terms & Conditions
1. Review terms
2. Click **Accept & Register**
3. ✅ Should see: "Registration successful! Please login with your credentials."
4. ✅ Should redirect to login page after 2 seconds

### Step 7: Login with New Account
1. Enter mobile: **9001212123**
2. Click **Continue**
3. ✅ Should now show password screen (user exists)
4. Enter email: **test@example.com**
5. Enter password: (password you set)
6. Click **Login**
7. ✅ Should login successfully and redirect to dashboard

## Console Logs to Check

During registration, you should see these logs:

```
=== MOBILE CHECK ===
User exists: false

=== REGISTER USER SERVICE ===
Mobile: 9001212123

=== FINAL REGISTER PAYLOAD ===
{
  "mobileNumber": "9001212123",
  "email": "test@example.com",
  ...
}

=== REGISTER API CALL ===
=== REGISTER API SUCCESS ===

=== REGISTRATION RESPONSE ===
User ID: [some_id]
Status: success
```

## Troubleshooting

### If Registration Fails:
1. **Check Console** - Look for error messages
2. **Check Network Tab** - Look for `/api/v1/users/create` request
3. **Common Issues**:
   - Email already exists → Use different email
   - Mobile already exists → User was created, try login
   - Validation errors → Check all required fields
   - Network error → Check backend is running

### If Login Fails After Registration:
1. Check if user was created in database
2. Verify email and password are correct
3. Check console for error messages
4. Try "Forgot Password" if needed

## Expected Result
✅ User should be successfully registered
✅ User should be able to login
✅ User should see dashboard after login

## Test Data Summary
```
Mobile: 9001212123
Email: test@example.com
Name: Test User
Agency: Test Travel Agency
Password: [Your chosen password]
```

## Next Steps After Successful Registration
1. Verify user appears in database
2. Test login functionality
3. Test dashboard access
4. Test profile update
5. Test other features

---

**Note**: Make sure to use a unique email address. If "test@example.com" is already taken, use something like "test9001212123@example.com"
