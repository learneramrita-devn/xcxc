# Complete Registration Payload - vedam@gmail.com (9889880000)

## User Credentials
- **Mobile:** 9889880000
- **Email:** vedam@gmail.com
- **Password:** Test#123
- **Name:** vedam dubey

---

## Complete Registration Payload

```json
{
  "tenant": {
    "tenantId": 1
  },
  "externalUserId": "EXT-USR-1778958958764",
  "role": "AGENT",
  "name": "VEDAM DUBEY",
  "email": "vedam@gmail.com",
  "mobileNumber": "9889880000",
  "passwordHash": "Test#123",
  "agentType": "AGENCY",
  "status": "ENABLED",
  "userSource": "WEB",
  
  "userAdditionalInfo": {
    "rc": "",
    "rfb": "SYSTEM",
    "grade": "A",
    "ft": "PRIVATE",
    "bal": [
      {
        "bn": "",
        "accNo": "",
        "ifsc": "",
        "cmts": "",
        "ahn": "VEDAM DUBEY",
        "vl": "PRIMARY",
        "bt": "SAVINGS"
      }
    ],
    "ael": [],
    "cncd": "IN",
    "curr": "INR"
  },
  
  "userProfileInfo": {
    "gdr": "MALE",
    "dob": "1990-01-01",
    "zip": "",
    "fn": "VEDAM DUBEY",
    "zd": "",
    "co": "",
    "pi": "",
    "tz": "Asia/Kolkata",
    "language": "EN",
    "lurl": ""
  },
  
  "userDocuments": {
    "pan": "",
    "adr": "",
    "pspt": "",
    "gst": ""
  },
  
  "addressInfo": {
    "address": "",
    "pinCode": "",
    "cityName": "",
    "state": "",
    "country": "India"
  },
  
  "contactPersonInfo": {
    "name": "VEDAM DUBEY",
    "mobileNumber": "9889880000",
    "email": "vedam@gmail.com"
  },
  
  "businessInfo": {
    "bstp": "TRAVEL",
    "bsn": "",
    "rflcd": ""
  },
  
  "securityInfo": {
    "ip": "",
    "di": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "gl": ""
  },
  
  "kycInfo": {
    "ks": "PENDING",
    "ksa": "2026-05-16T19:15:58.000Z"
  },
  
  "lifeCycleInfo": {
    "iat": "2026-05-16T19:15:58.000Z",
    "aat": null,
    "sat": null,
    "ovat": null
  }
}
```

---

## Payload with Sample Data (For Testing)

```json
{
  "tenant": {
    "tenantId": 1
  },
  "externalUserId": "EXT-USR-1778958958764",
  "role": "AGENT",
  "name": "VEDAM DUBEY",
  "email": "vedam@gmail.com",
  "mobileNumber": "9889880000",
  "passwordHash": "Test#123",
  "agentType": "AGENCY",
  "status": "ENABLED",
  "userSource": "WEB",
  
  "userAdditionalInfo": {
    "rc": "REF123",
    "rfb": "SYSTEM",
    "grade": "A",
    "ft": "PRIVATE",
    "bal": [
      {
        "bn": "State Bank of India",
        "accNo": "1234567890",
        "ifsc": "SBIN0001234",
        "cmts": "Main Branch",
        "ahn": "VEDAM DUBEY",
        "vl": "PRIMARY",
        "bt": "SAVINGS"
      }
    ],
    "ael": [],
    "cncd": "IN",
    "curr": "INR"
  },
  
  "userProfileInfo": {
    "gdr": "MALE",
    "dob": "1990-01-01",
    "zip": "110001",
    "fn": "VEDAM DUBEY",
    "zd": "Delhi",
    "co": "India",
    "pi": "",
    "tz": "Asia/Kolkata",
    "language": "EN",
    "lurl": ""
  },
  
  "userDocuments": {
    "pan": "ABCDE1234F",
    "adr": "123456789012",
    "pspt": "",
    "gst": "27ABCDE1234F1Z5"
  },
  
  "addressInfo": {
    "address": "123 Main Street, Sector 15",
    "pinCode": "110001",
    "cityName": "Delhi",
    "state": "Delhi",
    "country": "India"
  },
  
  "contactPersonInfo": {
    "name": "VEDAM DUBEY",
    "mobileNumber": "9889880000",
    "email": "vedam@gmail.com"
  },
  
  "businessInfo": {
    "bstp": "TRAVEL",
    "bsn": "Vedam Travels",
    "rflcd": "REF123"
  },
  
  "securityInfo": {
    "ip": "192.168.1.1",
    "di": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "gl": "28.7041,77.1025"
  },
  
  "kycInfo": {
    "ks": "PENDING",
    "ksa": "2026-05-16T19:15:58.000Z"
  },
  
  "lifeCycleInfo": {
    "iat": "2026-05-16T19:15:58.000Z",
    "aat": null,
    "sat": null,
    "ovat": null
  }
}
```

---

## Update Profile Payload (To Fill Missing Fields)

### Update Address Info
```json
POST /ums/v1/users/update/address-info

{
  "userId": 50,
  "addressInfo": {
    "address": "123 Main Street, Sector 15",
    "pinCode": "110001",
    "cityName": "Delhi",
    "state": "Delhi",
    "country": "India"
  }
}
```

### Update Identity Documents
```json
POST /ums/v1/users/update/identity-info

{
  "userId": 50,
  "identityDocuments": {
    "adr": "123456789012",
    "pan": "ABCDE1234F",
    "gst": "27ABCDE1234F1Z5"
  }
}
```

### Update Profile Info
```json
POST /ums/v1/users/update/profile-info

{
  "userId": 50,
  "userProfileInfo": {
    "fn": "VEDAM DUBEY",
    "gdr": "MALE",
    "dob": "1990-01-01",
    "zip": "110001",
    "zd": "Delhi",
    "co": "India",
    "pi": "",
    "tz": "Asia/Kolkata",
    "language": "EN",
    "lurl": ""
  }
}
```

### Update Business Info
```json
POST /ums/v1/users/update/business-info

{
  "userId": 50,
  "businessInfo": {
    "bsn": "Vedam Travels",
    "bstp": "TRAVEL",
    "rflcd": "REF123"
  }
}
```

### Update Bank Details
```json
POST /ums/v1/users/update/user-additional-info

{
  "userId": 50,
  "userAdditionalInfo": {
    "rc": "REF123",
    "rfb": "SYSTEM",
    "grade": "A",
    "ft": "PRIVATE",
    "bal": [
      {
        "bn": "State Bank of India",
        "accNo": "1234567890",
        "ifsc": "SBIN0001234",
        "cmts": "Main Branch",
        "ahn": "VEDAM DUBEY",
        "vl": "PRIMARY",
        "bt": "SAVINGS"
      }
    ],
    "ael": [],
    "cncd": "IN",
    "curr": "INR"
  }
}
```

---

## Field Mapping Reference

### Address Fields:
- `address` → Full address
- `pinCode` → Pincode (6 digits)
- `cityName` → City name
- `state` → State name
- `country` → Country name

### Document Fields:
- `adr` → Aadhaar number (12 digits)
- `pan` → PAN card (10 characters)
- `gst` → GST number (15 characters)

### Profile Fields:
- `fn` → Full name
- `gdr` → Gender (MALE/FEMALE/OTHER)
- `dob` → Date of birth (YYYY-MM-DD)
- `zip` → Pincode
- `zd` → City
- `co` → Country

### Business Fields:
- `bsn` → Business/Agency name
- `bstp` → Business type (TRAVEL)
- `rflcd` → Referral code

### Bank Fields:
- `ahn` → Account holder name
- `accNo` → Account number
- `ifsc` → IFSC code
- `bn` → Bank name
- `cmts` → Branch name
- `vl` → Value (PRIMARY/SECONDARY)
- `bt` → Bank type (SAVINGS/CURRENT)

---

## cURL Commands to Update Data

### 1. Get Token
```bash
curl -X POST http://13.126.207.62:8080/ums/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "vedam@gmail.com",
    "password": "Test#123",
    "tenantId": 1
  }'
```

### 2. Update Address
```bash
curl -X POST http://13.126.207.62:8080/ums/v1/users/update/address-info \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "userId": 50,
    "addressInfo": {
      "address": "123 Main Street",
      "pinCode": "110001",
      "cityName": "Delhi",
      "state": "Delhi",
      "country": "India"
    }
  }'
```

### 3. Update Documents
```bash
curl -X POST http://13.126.207.62:8080/ums/v1/users/update/identity-info \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "userId": 50,
    "identityDocuments": {
      "adr": "123456789012",
      "pan": "ABCDE1234F"
    }
  }'
```

### 4. Update Business Info
```bash
curl -X POST http://13.126.207.62:8080/ums/v1/users/update/business-info \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "userId": 50,
    "businessInfo": {
      "bsn": "Vedam Travels",
      "bstp": "TRAVEL",
      "rflcd": ""
    }
  }'
```

---

## Summary

### Current Data (From Backend):
```json
{
  "userId": 50,
  "name": "vedam dubey",
  "email": "vedam@gmail.com",
  "mobileNumber": "9889880000",
  "role": "SUB_ADMIN",
  "agentType": "AGENCY"
}
```

### Missing Data (Need to Add):
- ❌ Address Info
- ❌ User Documents (Aadhaar, PAN)
- ❌ Business Info (Agency Name)
- ❌ Bank Details
- ❌ Profile Info (Gender, DOB)

### How to Add:
1. Use Profile page in frontend (easiest)
2. Use cURL commands above (for testing)
3. Use Postman with update APIs

---

**All payloads ready! Use karne ke liye copy-paste kar do.** 🚀
