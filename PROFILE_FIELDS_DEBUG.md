# Profile Fields Not Showing - Debug Guide

## Issue
Aadhaar Number, PAN Card, Address, Country, State, City, Pincode fields are not showing in profile page.

## User Details
- Mobile: 9889880000
- Email: vedam@gmail.com
- Password: Test#123

---

## Step 1: Login and Check Console

1. Login with above credentials
2. Go to Profile page
3. Open Browser Console (F12)
4. Look for these logs:

```
=== FETCHING PROFILE DATA ===
=== PROFILE API RESPONSE ===
Address Info: { ... }
User Documents: { ... }
```

---

## Step 2: Run Debug Script

Copy and paste this in browser console:

```javascript
// Check what data is coming from backend
const userId = localStorage.getItem('userId');
const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

fetch('http://13.126.207.62:8080/ums/v1/users/list', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  },
  body: JSON.stringify({ userIdList: [parseInt(userId)] })
})
.then(r => r.json())
.then(data => {
  const user = data.userList[0];
  console.log('=== USER DATA ===');
  console.log('Address Info:', user.addressInfo);
  console.log('User Documents:', user.userDocuments);
  console.log('Profile Info:', user.userProfileInfo);
  
  // Check if fields exist
  console.log('\n=== FIELD CHECK ===');
  console.log('Address:', user.addressInfo?.address || 'EMPTY');
  console.log('Country:', user.addressInfo?.country || 'EMPTY');
  console.log('State:', user.addressInfo?.state || 'EMPTY');
  console.log('City:', user.addressInfo?.cityName || 'EMPTY');
  console.log('Pincode:', user.addressInfo?.pinCode || 'EMPTY');
  console.log('Aadhaar:', user.userDocuments?.adr || 'EMPTY');
  console.log('PAN:', user.userDocuments?.pan || 'EMPTY');
});
```

---

## Possible Reasons

### Reason 1: Data Not Saved During Registration
If fields show "EMPTY" in console, it means data was not saved during registration.

**Solution:** User needs to fill and save these fields in profile page.

### Reason 2: Wrong Field Mapping
If data exists in API response but not showing in UI, field mapping is wrong.

**Solution:** Already fixed in code - check updated ProfilePage.jsx

### Reason 3: API Response Structure Different
If API returns data in different structure.

**Solution:** Check console logs and update field mapping accordingly.

---

## Expected API Response Structure

```json
{
  "userList": [{
    "userId": 123,
    "name": "User Name",
    "email": "vedam@gmail.com",
    "mobileNumber": "9889880000",
    "addressInfo": {
      "address": "Full Address",
      "country": "India",
      "state": "State Name",
      "cityName": "City Name",
      "pinCode": "123456"
    },
    "userDocuments": {
      "adr": "123456789012",
      "pan": "ABCDE1234F",
      "gst": "27ABCDE1234F1Z5"
    },
    "userProfileInfo": {
      "fn": "Full Name",
      "gdr": "MALE",
      "dob": "1990-01-01",
      "zip": "123456",
      "zd": "City"
    },
    "businessInfo": {
      "bsn": "Agency Name",
      "bstp": "TRAVEL"
    }
  }]
}
```

---

## Fix Applied

Updated field mappings in ProfilePage.jsx:

### Address Update:
```javascript
await updateAddressInfoApi(userId, {
  address: addressForm.address,
  country: addressForm.country,
  state: addressForm.state,
  cityName: addressForm.city,      // Fixed: was 'city'
  pinCode: addressForm.pincode,    // Fixed: was 'pincode'
});
```

### Identity Update:
```javascript
await updateIdentityInfoApi(userId, { 
  adr: identityForm.aadhaar  // Fixed: was 'aadhaar'
});
```

### Profile Update:
```javascript
await updateProfileInfoApi(userId, {
  fn: `${profileForm.firstName} ${profileForm.lastName}`.trim(),
  gdr: profileForm.gender?.toUpperCase() || 'MALE',
  dob: profileForm.dob,
  zip: addressForm.pincode,
  zd: addressForm.city,
  co: addressForm.country,
  tz: 'Asia/Kolkata',
  language: 'EN',
  lurl: '',
});
```

---

## Testing Steps

1. **Login** with credentials
2. **Go to Profile page**
3. **Check console** for logs
4. **Fill missing fields** (if data is empty)
5. **Click Save**
6. **Refresh page** and verify fields are showing

---

## If Fields Still Not Showing

### Check 1: Are fields in the HTML?
Open DevTools → Elements → Search for "Aadhaar" or "Address"

If found → Fields exist but values are empty
If not found → UI rendering issue

### Check 2: Are input values populated?
In console, type:
```javascript
document.querySelector('input[placeholder*="Aadhaar"]').value
document.querySelector('input[placeholder*="address"]').value
```

If empty → Data not loaded from API
If has value → CSS hiding issue

### Check 3: Check form state
In console, type:
```javascript
// This won't work directly, but check React DevTools
// Look for ProfilePage component state
```

---

## Summary

✅ **Code Fixed:** Field mappings corrected
✅ **Logs Added:** Console logs for debugging
✅ **Debug Script:** Available to check API data

**Next Step:** Login and check browser console to see what data is coming from backend.
