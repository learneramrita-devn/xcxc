# User Data Analysis - vedam@gmail.com (9889880000)

## Login Credentials
- **Mobile:** 9889880000
- **Email:** vedam@gmail.com
- **Password:** Test#123

---

## Complete User Data from Backend

```json
{
  "status": {
    "httpStatus": "SUCCESSFUL",
    "httpStatusCode": 200
  },
  "userList": [
    {
      "userId": 50,
      "externalUserId": "EXT-USR-1778958958764",
      "role": "SUB_ADMIN",
      "name": "vedam dubey",
      "email": "vedam@gmail.com",
      "mobileNumber": "9889880000",
      "passwordHash": "$2a$10$SZSucvQ55E2jKSyuPexhpeKeuC38KMfDimT4mTD5R9dJvuDSX964i",
      "agentType": "AGENCY",
      "userStatus": "DISABLED",
      "userSource": "WEB",
      "isDeleted": false,
      "createdAt": "2026-05-16T19:15:58.477919",
      "updatedAt": "2026-05-16T19:15:58.47798"
    }
  ]
}
```

---

## Data Analysis

### ✅ Fields with Data:
- **User ID:** 50
- **Name:** vedam dubey
- **Email:** vedam@gmail.com
- **Mobile:** 9889880000
- **Role:** SUB_ADMIN
- **Agent Type:** AGENCY
- **User Status:** DISABLED
- **User Source:** WEB
- **Created At:** 2026-05-16T19:15:58

### ❌ Missing Fields (NULL/UNDEFINED):
- **addressInfo** - NULL (Address, Country, State, City, Pincode)
- **userDocuments** - NULL (Aadhaar, PAN, GST)
- **userProfileInfo** - NULL (Full Name, Gender, DOB)
- **businessInfo** - NULL (Agency Name, Business Type)
- **userAdditionalInfo** - NULL (Bank Details)
- **contactPersonInfo** - NULL
- **kycInfo** - NULL
- **securityInfo** - NULL
- **lifeCycleInfo** - NULL

---

## Why Fields Are Not Showing?

### Root Cause:
**Backend is NOT returning these objects in the API response.**

The API response only contains basic fields:
- userId
- name
- email
- mobileNumber
- role
- agentType
- userStatus

But it's **NOT returning:**
- addressInfo
- userDocuments
- userProfileInfo
- businessInfo
- userAdditionalInfo

---

## Why This Happened?

### Reason 1: Data Not Saved During Registration
User registered but these fields were not filled/saved during registration.

### Reason 2: Backend Not Returning Complete Data
Backend `/ums/v1/users/list` API is only returning basic user fields, not the complete profile data.

---

## Solution

### Option 1: Fill Data in Profile Page (RECOMMENDED)
1. Login to the app
2. Go to Profile page
3. Fill all missing fields:
   - Address
   - Country, State, City, Pincode
   - Aadhaar Number
   - PAN Card
   - Agency Name
   - GST Number
   - Bank Details
4. Click **Save**
5. Backend will save this data
6. Refresh page to see the data

### Option 2: Check Backend API
Backend team should verify if `/ums/v1/users/list` API is supposed to return complete profile data or just basic fields.

**Expected Response Structure:**
```json
{
  "userList": [{
    "userId": 50,
    "name": "vedam dubey",
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
      "fn": "vedam dubey",
      "gdr": "MALE",
      "dob": "1990-01-01",
      "zip": "123456",
      "zd": "City"
    },
    
    "businessInfo": {
      "bsn": "Agency Name",
      "bstp": "TRAVEL"
    },
    
    "userAdditionalInfo": {
      "bal": [{
        "ahn": "Account Holder Name",
        "accNo": "1234567890",
        "ifsc": "ABCD0001234",
        "bn": "Bank Name",
        "cmts": "Branch Name"
      }]
    }
  }]
}
```

**Current Response:**
Only basic fields, no nested objects.

---

## Frontend Status

### ✅ Frontend Code is Correct
- All fields are present in UI
- Field mappings are correct
- Console logs are added
- Save functionality is working

### ⚠️ Issue is with Data
- Backend is not returning complete profile data
- User needs to fill and save these fields

---

## Test Steps

### Step 1: Login
```
Mobile: 9889880000
Email: vedam@gmail.com
Password: Test#123
```

### Step 2: Go to Profile Page
Navigate to "My Profile" section

### Step 3: Check Console (F12)
You will see:
```
=== PROFILE API RESPONSE ===
Full Response: { userList: [{ userId: 50, name: "vedam dubey", ... }] }

=== ADDRESS DATA ===
Raw addressInfo: undefined
❌ EMPTY - Address field
❌ EMPTY - Country field
❌ EMPTY - State field
❌ EMPTY - City field
❌ EMPTY - Pincode field

=== IDENTITY DATA ===
Raw userDocuments: undefined
❌ EMPTY - Aadhaar
❌ EMPTY - PAN

=== BUSINESS DATA ===
Raw businessInfo: undefined
❌ EMPTY - Agency Name
```

### Step 4: Fill the Fields
Since backend doesn't have this data, fill it manually:

**Address Section:**
- Address: Enter full address
- Country: Select India
- State: Select state
- City: Enter city
- Pincode: Enter 6-digit pincode

**Identity Section:**
- Aadhaar: Enter 12-digit number

**Company Details:**
- Agency Name: Enter agency name
- PAN Card: Enter 10-character PAN
- GST Number: Enter GST (optional)

**Banking Details:**
- Account Holder Name
- Account Number
- IFSC Code
- Bank Name
- Branch

### Step 5: Click Save
Data will be saved to backend.

### Step 6: Refresh Page
After refresh, fields should show the saved data.

---

## Summary

### Current Situation:
- ✅ User exists in database (User ID: 50)
- ✅ Basic info available (Name, Email, Mobile)
- ❌ Profile details NOT available (Address, Documents, Business)
- ❌ Backend not returning complete data

### Why Fields Not Showing:
**Backend API response doesn't include addressInfo, userDocuments, businessInfo, etc.**

### Solution:
**User needs to fill these fields in Profile page and save.**

After saving, backend will have the data and will return it in future API calls.

---

## Backend Developer Action (Optional)

If these fields should have been saved during registration, backend team should check:

1. **Registration API** - Is it saving all fields?
2. **User List API** - Is it returning all fields?
3. **Database** - Does the data exist in DB?

Run this query to check:
```sql
SELECT * FROM users WHERE user_id = 50;
SELECT * FROM user_address WHERE user_id = 50;
SELECT * FROM user_documents WHERE user_id = 50;
SELECT * FROM user_business WHERE user_id = 50;
```

If data exists in DB but not in API response, backend needs to fix the API to return complete data.

---

**Next Step:** Login and fill the missing fields in Profile page, then click Save.
