# Backend Developer - Profile Data Issue

## 🚨 Problem

User profile me Address, Documents, Business Info show nahi ho rahe.

---

## 🔍 Root Cause

`/ums/v1/users/list` API **incomplete data** return kar raha hai.

---

## 📊 Current API Response (Wrong):

```json
{
  "userList": [{
    "userId": 50,
    "name": "vedam dubey",
    "email": "vedam@gmail.com",
    "mobileNumber": "9889880000",
    "role": "SUB_ADMIN",
    "agentType": "AGENCY"
  }]
}
```

**Missing:**
- ❌ addressInfo
- ❌ userDocuments
- ❌ businessInfo
- ❌ userProfileInfo
- ❌ userAdditionalInfo

---

## ✅ Required API Response (Correct):

```json
{
  "userList": [{
    "userId": 50,
    "name": "vedam dubey",
    "email": "vedam@gmail.com",
    "mobileNumber": "9889880000",
    
    "addressInfo": {
      "address": "123 Main Street",
      "pinCode": "110001",
      "cityName": "Delhi",
      "state": "Delhi",
      "country": "India"
    },
    
    "userDocuments": {
      "adr": "123456789012",
      "pan": "ABCDE1234F",
      "gst": "27ABCDE1234F1Z5"
    },
    
    "businessInfo": {
      "bsn": "Agency Name",
      "bstp": "TRAVEL",
      "rflcd": ""
    },
    
    "userProfileInfo": {
      "fn": "vedam dubey",
      "gdr": "MALE",
      "dob": "1990-01-01",
      "zip": "110001",
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
        "bn": "Bank Name",
        "accNo": "1234567890",
        "ifsc": "ABCD0001234",
        "cmts": "Branch",
        "ahn": "Account Holder",
        "vl": "PRIMARY",
        "bt": "SAVINGS"
      }],
      "ael": [],
      "cncd": "IN",
      "curr": "INR"
    }
  }]
}
```

---

## 🔧 Backend Fix Required

### API: `/ums/v1/users/list`

**Current Code (Assumed):**
```java
@PostMapping("/list")
public UserResponse getUsers(@RequestBody UserListRequest request) {
    List<User> users = userRepository.findByIdIn(request.getUserIdList());
    return new UserResponse(users); // ❌ Only basic fields
}
```

**Required Code:**
```java
@PostMapping("/list")
public UserResponse getUsers(@RequestBody UserListRequest request) {
    List<User> users = userRepository.findByIdIn(request.getUserIdList());
    
    // ✅ Fetch and populate nested objects
    for (User user : users) {
        // Fetch address info
        AddressInfo address = addressRepository.findByUserId(user.getId());
        user.setAddressInfo(address);
        
        // Fetch documents
        UserDocuments docs = documentRepository.findByUserId(user.getId());
        user.setUserDocuments(docs);
        
        // Fetch business info
        BusinessInfo business = businessRepository.findByUserId(user.getId());
        user.setBusinessInfo(business);
        
        // Fetch profile info
        UserProfileInfo profile = profileRepository.findByUserId(user.getId());
        user.setUserProfileInfo(profile);
        
        // Fetch additional info
        UserAdditionalInfo additional = additionalInfoRepository.findByUserId(user.getId());
        user.setUserAdditionalInfo(additional);
    }
    
    return new UserResponse(users); // ✅ Complete data
}
```

**OR Use JPA Fetch:**
```java
@Entity
@Table(name = "users")
public class User {
    @Id
    private Long userId;
    
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private AddressInfo addressInfo;
    
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private UserDocuments userDocuments;
    
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private BusinessInfo businessInfo;
    
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private UserProfileInfo userProfileInfo;
    
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private UserAdditionalInfo userAdditionalInfo;
}
```

---

## 🧪 Test After Fix

```bash
# Login
curl -X POST http://13.126.207.62:8080/ums/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"vedam@gmail.com","password":"Test#123","tenantId":1}'

# Get user data
curl -X POST http://13.126.207.62:8080/ums/v1/users/list \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"userIdList":[50]}'
```

**Expected:** Response should include addressInfo, userDocuments, businessInfo, etc.

---

## 📋 Checklist

- [ ] Check if data exists in database tables
- [ ] Update `/ums/v1/users/list` API to return nested objects
- [ ] Test API response includes all fields
- [ ] Verify frontend profile page shows all data

---

## 🎯 Summary

**Issue:** Profile fields not showing

**Cause:** API not returning complete data

**Fix:** Update `/ums/v1/users/list` to include nested objects

**Priority:** 🔴 HIGH - Users cannot see/edit their profile data

---

**Please fix and confirm!** 🚀
