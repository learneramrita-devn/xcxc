s# 🔍 Backend Endpoints Verification Needed

## Current Issue
Mobile check endpoint returning 405 error.

## Endpoints We're Using

### Registration (FIXED ✅)
```
POST /api/v1/users/create
```

### Mobile/User Check (NEEDS VERIFICATION ❓)
```
POST /api/v1/users/user-check
POST /api/v1/tenant/tenant-check
```

### Login (NEEDS VERIFICATION ❓)
```
POST /api/v1/auth/login
```

## Backend Team: Please Confirm

### Question 1: User Check Endpoint
What is the correct endpoint to check if mobile number exists?

**Options:**
- [ ] `/api/v1/users/user-check`
- [ ] `/api/v1/users/check`
- [ ] `/api/v1/users/exists`
- [ ] `/api/v1/check-user`
- [ ] Other: _______________

**Request Format:**
```json
{
  "mobileIn": ["8009009009"]
}
```
OR
```json
{
  "mobile": "8009009009"
}
```

**Expected Response:**
```json
{
  "isExist": true/false
}
```

### Question 2: Login Endpoint
What is the correct login endpoint?

**Options:**
- [ ] `/api/v1/auth/login`
- [ ] `/api/v1/users/login`
- [ ] `/api/v1/login`
- [ ] Other: _______________

**Request Format:**
```json
{
  "username": "email@example.com",
  "password": "Test@123",
  "tenantId": 1
}
```

**Expected Response:**
```json
{
  "accessToken": "jwt_token",
  "refreshToken": "refresh_token",
  "tokenType": "Bearer",
  "expiresIn": 1800000
}
```

### Question 3: All Available Endpoints
Please provide complete list of endpoints:

```
POST /api/v1/users/create ✅ (Working in Postman)
POST /api/v1/users/user-check ❓ (Getting 405)
POST /api/v1/auth/login ❓ (Not tested yet)
GET  /api/v1/users/{id} ❓
PUT  /api/v1/users/{id} ❓
DELETE /api/v1/users/{id} ❓
```

## Temporary Fix Applied

If mobile check fails (405 error), we now:
1. Log the error
2. Allow user to proceed to registration
3. User can register as new user

This prevents blocking the registration flow.

## Test Commands

### Test User Check:
```bash
curl -X POST http://13.126.207.62/api/v1/users/user-check \
  -H "Content-Type: application/json" \
  -d '{"mobileIn":["8009009009"]}'
```

### Test Registration:
```bash
curl -X POST http://13.126.207.62/api/v1/users/create \
  -H "Content-Type: application/json" \
  -d '{
    "tenantId": 1,
    "name": "Test User",
    "email": "test@test.com",
    "mobileNumber": "9999999999",
    "passwordHash": "Test@123",
    "role": "AGENT",
    "agentType": "AGENCY",
    "status": "ENABLED",
    "userSource": "WEB"
  }'
```

### Test Login:
```bash
curl -X POST http://13.126.207.62/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test@test.com",
    "password": "Test@123",
    "tenantId": 1
  }'
```

## What Frontend Needs

1. **User Check Endpoint** - To check if mobile exists before login/register
2. **Registration Endpoint** - ✅ Working (`/api/v1/users/create`)
3. **Login Endpoint** - To authenticate user
4. **Token Refresh Endpoint** - To refresh expired tokens

## Current Workaround

Mobile check failing → User can still register → Registration works!

So registration flow is NOT blocked, just the "user exists" check is skipped.

---

**Action Required:** Backend team to provide correct endpoint URLs
