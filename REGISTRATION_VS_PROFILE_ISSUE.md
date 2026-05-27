# Registration vs Profile Data - Issue Analysis

## Problem
Registration payload me sab fields hain, but profile me show nahi ho rahe.

---

## Test 1: Check Current User Data

```bash
# Login
curl -X POST http://13.126.207.62:8080/ums/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"vedam@gmail.com","password":"Test#123","tenantId":1}'

# Get user data
curl -X POST http://13.126.207.62:8080/ums/v1/users/list \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"userIdList":[50]}'
```

**Current Response:**
```json
{
  "userId": 50,
  "name": "vedam dubey",
  "email": "vedam@gmail.com",
  "mobileNumber": "9889880000"
  // ❌ NO addressInfo
  // ❌ NO userDocuments
  // ❌ NO businessInfo
}
```

---

## Possible Reasons

### Reason 1: Registration API Didn't Save Complete Data ❌
**Issue:** Registration API call me data bheja tha, but backend ne save nahi kiya.

**Check:** Backend logs dekho - kya registration ke time sab fields save hue the?

### Reason 2: User List API Not Returning Complete Data ❌
**Issue:** Data database me hai, but `/ums/v1/users/list` API complete data return nahi kar raha.

**Check:** Backend API code dekho - kya ye API sab fields return karta hai?

### Reason 3: Registration Incomplete ❌
**Issue:** Registration form me sab fields fill nahi kiye the.

**Check:** Registration ke time kya sab fields mandatory the?

---

## Solution: Test Registration Again

Let me create a test registration with complete data:

```bash
curl -X POST http://13.126.207.62:8080/api/v1/users/create \
  -H "Content-Type: application/json" \
  -d '{
    "tenant": {"tenantId": 1},
    "externalUserId": "EXT-USR-TEST-123",
    "role": "AGENT",
    "name": "TEST USER",
    "email": "testuser@test.com",
    "mobileNumber": "9999999999",
    "passwordHash": "Test@123",
    "agentType": "AGENCY",
    "status": "ENABLED",
    "userSource": "WEB",
    
    "addressInfo": {
      "address": "Test Address 123",
      "pinCode": "110001",
      "cityName": "Delhi",
      "state": "Delhi",
      "country": "India"
    },
    
    "userDocuments": {
      "pan": "ABCDE1234F",
      "adr": "123456789012"
    },
    
    "businessInfo": {
      "bstp": "TRAVEL",
      "bsn": "Test Agency"
    },
    
    "userProfileInfo": {
      "gdr": "MALE",
      "dob": "1990-01-01",
      "zip": "110001",
      "fn": "TEST USER",
      "zd": "Delhi",
      "co": "India",
      "tz": "Asia/Kolkata",
      "language": "EN",
      "lurl": ""
    },
    
    "userAdditionalInfo": {
      "rc": "",
      "rfb": "SYSTEM",
      "grade": "A",
      "ft": "PRIVATE",
      "bal": [{
        "bn": "Test Bank",
        "accNo": "1234567890",
        "ifsc": "TEST0001234",
        "cmts": "Test Branch",
        "ahn": "TEST USER",
        "vl": "PRIMARY",
        "bt": "SAVINGS"
      }],
      "ael": [],
      "cncd": "IN",
      "curr": "INR"
    },
    
    "contactPersonInfo": {
      "name": "TEST USER",
      "mobileNumber": "9999999999",
      "email": "testuser@test.com"
    },
    
    "securityInfo": {
      "ip": "",
      "di": "test-device",
      "gl": ""
    },
    
    "kycInfo": {
      "ks": "PENDING",
      "ksa": "2024-01-01T00:00:00.000Z"
    },
    
    "lifeCycleInfo": {
      "iat": "2024-01-01T00:00:00.000Z",
      "aat": null,
      "sat": null,
      "ovat": null
    }
  }'
```

Then check if this user has complete data:
```bash
curl -X POST http://13.126.207.62:8080/ums/v1/users/list \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"userIdList":[NEW_USER_ID]}'
```

---

## Backend Developer Questions

### Question 1: Registration API
**Does `/api/v1/users/create` save all nested objects?**
- addressInfo ✅/❌
- userDocuments ✅/❌
- businessInfo ✅/❌
- userProfileInfo ✅/❌
- userAdditionalInfo ✅/❌

### Question 2: User List API
**Does `/ums/v1/users/list` return all nested objects?**
- addressInfo ✅/❌
- userDocuments ✅/❌
- businessInfo ✅/❌
- userProfileInfo ✅/❌
- userAdditionalInfo ✅/❌

### Question 3: Database
**Check database tables:**
```sql
-- Main user table
SELECT * FROM users WHERE user_id = 50;

-- Address table
SELECT * FROM user_address WHERE user_id = 50;

-- Documents table
SELECT * FROM user_documents WHERE user_id = 50;

-- Business table
SELECT * FROM user_business WHERE user_id = 50;

-- Profile table
SELECT * FROM user_profile WHERE user_id = 50;
```

If data exists in database but not in API response → API needs fix
If data doesn't exist in database → Registration API needs fix

---

## Most Likely Issue

### Backend API Not Returning Complete Data

**Evidence:**
1. Registration payload has all fields ✅
2. Frontend code is correct ✅
3. But API response only has basic fields ❌

**Conclusion:**
Backend `/ums/v1/users/list` API is NOT returning nested objects like:
- addressInfo
- userDocuments
- businessInfo
- userProfileInfo

**Backend Fix Required:**
```java
// Current (Wrong)
@GetMapping("/list")
public UserResponse getUsers(@RequestBody UserListRequest request) {
    List<User> users = userService.getUsers(request.getUserIdList());
    return new UserResponse(users); // Only returns basic User entity
}

// Required (Correct)
@GetMapping("/list")
public UserResponse getUsers(@RequestBody UserListRequest request) {
    List<User> users = userService.getUsers(request.getUserIdList());
    
    // Fetch and populate nested objects
    for (User user : users) {
        user.setAddressInfo(addressService.getByUserId(user.getId()));
        user.setUserDocuments(documentService.getByUserId(user.getId()));
        user.setBusinessInfo(businessService.getByUserId(user.getId()));
        user.setUserProfileInfo(profileService.getByUserId(user.getId()));
        user.setUserAdditionalInfo(additionalInfoService.getByUserId(user.getId()));
    }
    
    return new UserResponse(users); // Returns complete data
}
```

---

## Temporary Frontend Solution

Since backend is not returning complete data, we can:

### Option 1: Use Separate APIs
Instead of `/ums/v1/users/list`, call individual APIs:
```javascript
// Get basic user info
const user = await getProfileApi(userId);

// Get address separately
const address = await getAddressApi(userId);

// Get documents separately
const documents = await getDocumentsApi(userId);

// Get business info separately
const business = await getBusinessApi(userId);
```

### Option 2: Show Empty Fields
Allow user to fill missing fields in profile page (current approach).

---

## Summary

### Issue:
Registration payload me sab fields hain, but profile me show nahi ho rahe.

### Root Cause:
Backend `/ums/v1/users/list` API sirf basic fields return kar raha hai, nested objects nahi.

### Evidence:
```json
// Expected Response:
{
  "userId": 50,
  "name": "vedam dubey",
  "addressInfo": { ... },      // ❌ Missing
  "userDocuments": { ... },    // ❌ Missing
  "businessInfo": { ... }      // ❌ Missing
}

// Actual Response:
{
  "userId": 50,
  "name": "vedam dubey"
  // Only basic fields
}
```

### Solution:
**Backend team ko `/ums/v1/users/list` API fix karna hoga to return complete user data with all nested objects.**

---

**Next Step:** Backend developer ko ye document share karo! 📄
