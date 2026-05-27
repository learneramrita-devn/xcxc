# API Endpoints List - Travel App

## 📋 Complete API Reference

### 🔐 Authentication APIs

#### 1. Login API
- **Endpoint**: `/ums/v1/auth/login`
- **Method**: `POST`
- **Purpose**: User/Tenant login
- **Request Body**:
```json
{
  "username": "email@example.com or 9876543210",
  "password": "password123",
  "tenantId": 1,
  "deviceId": "device-uuid",
  "deviceInfo": {
    "browser": "Chrome",
    "os": "Windows",
    "isMobile": false
  }
}
```
- **Response**:
```json
{
  "accessToken": "jwt_token_here",
  "refreshToken": "refresh_token_here",
  "tokenType": "Bearer",
  "mobileNumber": "9876543210",
  "email": "email@example.com",
  "userStatus": "ENABLED"
}
```

---

### 👤 User Management APIs

#### 2. User Check API
- **Endpoint**: `/ums/v1/users/user-check`
- **Method**: `POST`
- **Purpose**: Check if user exists with mobile number
- **Request Body**:
```json
{
  "mobileIn": ["9876543210"]
}
```
- **Response**:
```json
{
  "isExist": true,
  "userId": 123,
  "mobileNumber": "9876543210"
}
```

#### 3. User Registration API (Travel Agent)
- **Endpoint**: `/api/v1/users/create`
- **Method**: `POST`
- **Purpose**: Register Travel Agent
- **Request Body**:
```json
{
  "tenantId": 1,
  "tenant": { "tenantId": 1 },
  "externalUserId": "EXT-USR-1234567890",
  "role": "AGENT",
  "name": "John Doe",
  "email": "john@example.com",
  "mobileNumber": "9876543210",
  "passwordHash": "password123",
  "agentType": "AGENCY",
  "status": "ENABLED",
  "userSource": "WEB",
  "businessInfo": {
    "bsn": "ABC Travels",
    "bstp": "Proprietorship",
    "rflcd": "REF123"
  },
  "addressInfo": {
    "address": "123 Main St",
    "cityName": "Mumbai",
    "state": "Maharashtra",
    "pinCode": "400001",
    "country": "India"
  },
  "userProfileInfo": {
    "fn": "John Doe",
    "gdr": "MALE",
    "dob": "1990-01-01"
  },
  "userAdditionalInfo": {
    "rc": "REF123",
    "ft": "Proprietorship",
    "curr": "INR",
    "cncd": "IN",
    "grade": "A",
    "bal": []
  },
  "contactPersonInfo": {
    "name": "John Doe",
    "mobileNumber": "9876543210",
    "email": "john@example.com"
  },
  "userDocuments": {
    "pan": "ABCDE1234F",
    "adr": "123456789012"
  },
  "kycInfo": { "ks": "PENDING" }
}
```
- **Response**:
```json
{
  "userId": 123,
  "message": "User created successfully"
}
```

#### 4. Update Email API
- **Endpoint**: `/ums/v1/users/update/email`
- **Method**: `POST`
- **Purpose**: Update user email
- **Request Body**:
```json
{
  "userId": 123,
  "email": "newemail@example.com"
}
```

#### 5. Update Password API
- **Endpoint**: `/ums/v1/users/update/password`
- **Method**: `PUT`
- **Purpose**: Update user password
- **Request Body**:
```json
{
  "userId": 123,
  "oldPassword": "oldpass123",
  "newPassword": "newpass123"
}
```

#### 6. User Forgot Password API
- **Endpoint**: `/ums/v1/users/forgot-password`
- **Method**: `POST`
- **Purpose**: Send password reset link to user
- **Request Body**:
```json
{
  "email": "user@example.com"
}
```

---

### 🏢 Tenant Management APIs

#### 7. Tenant Check API
- **Endpoint**: `/ums/v1/tenant/tenant-check`
- **Method**: `POST`
- **Purpose**: Check if tenant exists with mobile number
- **Request Body**:
```json
{
  "mobileIn": ["9876543210"]
}
```
- **Response**:
```json
{
  "isExist": true,
  "tenantId": 456,
  "mobileNumber": "9876543210"
}
```

#### 8. Tenant Registration API (API Partner/WhiteLabel/Corporate)
- **Endpoint**: `/ums/v1/tenant/save`
- **Method**: `POST`
- **Purpose**: Register API Partner, WhiteLabel Partner, or Corporate
- **Request Body**: (Same structure as User Registration)
```json
{
  "tenantId": 1,
  "tenant": { "tenantId": 1 },
  "externalUserId": "EXT-USR-1234567890",
  "role": "AGENT",
  "name": "ABC Corporation",
  "email": "contact@abc.com",
  "mobileNumber": "9876543210",
  "passwordHash": "password123",
  "agentType": "API_PARTNER",
  "status": "ENABLED",
  "userSource": "WEB",
  "businessInfo": {
    "bsn": "ABC Corporation",
    "bstp": "Private Limited",
    "rflcd": ""
  },
  "addressInfo": {
    "address": "456 Business Park",
    "cityName": "Delhi",
    "state": "Delhi",
    "pinCode": "110001",
    "country": "India"
  },
  "userProfileInfo": {
    "fn": "ABC Corporation",
    "gdr": "MALE",
    "dob": "2000-01-01"
  },
  "userAdditionalInfo": {
    "rc": "",
    "ft": "Private Limited",
    "curr": "INR",
    "cncd": "IN",
    "grade": "A",
    "bal": []
  },
  "contactPersonInfo": {
    "name": "Contact Person",
    "mobileNumber": "9876543210",
    "email": "contact@abc.com"
  },
  "userDocuments": {
    "pan": "ABCDE1234F",
    "cin": "U12345MH2020PTC123456",
    "gst": "27ABCDE1234F1Z5"
  },
  "kycInfo": { "ks": "PENDING" }
}
```
- **Response**:
```json
{
  "tenantId": 456,
  "message": "Tenant created successfully"
}
```

#### 9. Tenant Forgot Password API
- **Endpoint**: `/ums/v1/tenant/forgot-password`
- **Method**: `POST`
- **Purpose**: Send password reset link to tenant
- **Request Body**:
```json
{
  "email": "tenant@example.com"
}
```

#### 10. Tenant Password API
- **Endpoint**: `/ums/v1/tenant/password`
- **Method**: `POST`
- **Purpose**: Set/Reset tenant password
- **Request Body**:
```json
{
  "tenantId": 456,
  "password": "newpassword123"
}
```

---

## 🔄 Registration Flow

### Travel Agent Registration Flow:
1. **Check User Exists**: `POST /ums/v1/users/user-check`
2. **Register User**: `POST /api/v1/users/create`
3. **Show Success Toast**: "User successfully created!"
4. **Redirect**: Mobile Verification Screen

### Tenant Registration Flow (API Partner/WhiteLabel/Corporate):
1. **Check Tenant Exists**: `POST /ums/v1/tenant/tenant-check`
2. **Register Tenant**: `POST /ums/v1/tenant/save`
3. **Show Success Toast**: "Tenant successfully created!"
4. **Redirect**: Mobile Verification Screen

---

## 🐛 Common Issues & Solutions

### Issue 1: User registered but not showing as existing
**Problem**: User registered successfully in Postman but browser shows "User not found"

**Solution**: 
- Check `isExist` field in API response (should be `true` or `"true"`)
- Verify mobile number format (10 digits without country code)
- Clear browser cache and localStorage

### Issue 2: Registration successful but no success message
**Problem**: Registration completes but toast doesn't show

**Solution**:
- Check browser console for errors
- Verify API response structure
- Ensure `registrationType` is set correctly

### Issue 3: Wrong API being called
**Problem**: Travel Agent registration calling Tenant API or vice versa

**Solution**:
- Check `registrationType` value:
  - `'agency'` → User API (`/api/v1/users/create`)
  - `'api_partner'`, `'whitelabel'`, `'corporate'` → Tenant API (`/ums/v1/tenant/save`)

---

## 📝 Testing Guide

### Test User Registration (7008009000):
```bash
# 1. Check if user exists
curl -X POST http://localhost:8080/ums/v1/users/user-check \
  -H "Content-Type: application/json" \
  -d '{"mobileIn": ["7008009000"]}'

# 2. If exists, try login
curl -X POST http://localhost:8080/ums/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "7008009000",
    "password": "your_password",
    "tenantId": 1
  }'
```

### Debug Checklist:
- [ ] Check browser console for API calls
- [ ] Verify API response in Network tab
- [ ] Check localStorage for saved data
- [ ] Verify mobile number format
- [ ] Check registration type selection
- [ ] Verify backend is running
- [ ] Check CORS settings

---

## 🔧 Environment Variables

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_TENANT_ID=1
```

---

## 📞 Support

If issues persist:
1. Check browser console logs
2. Check Network tab for API responses
3. Verify backend is running
4. Clear browser cache and localStorage
5. Try in incognito mode
