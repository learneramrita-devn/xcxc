# Quick Setup Guide - Sub Users Feature

## Step 1: Update Routes (IMPORTANT!)

Replace ProfilePage with ProfileWithTabs in your routes:

### Find your routes file (usually `src/app/routes/` or `src/routes/`)

**Before:**
```javascript
import ProfilePage from '../modules/users/pages/ProfilePage';

{
  path: '/profile',
  element: <ProfilePage />
}
```

**After:**
```javascript
import ProfileWithTabs from '../modules/users/pages/ProfileWithTabs';

{
  path: '/profile',
  element: <ProfileWithTabs />
}
```

---

## Step 2: Backend APIs Needed

Backend developer ko ye endpoints banana hoga:

### 1. Get Sub Users
```
POST /ums/v1/tenant/users/list
Body: { "tenantId": 1 }
```

### 2. Create Sub User
```
POST /ums/v1/tenant/users/create
Body: {
  "tenantId": 1,
  "title": "Mr",
  "firstName": "John",
  "lastName": "Doe",
  "name": "Mr John Doe",
  "mobileNumber": "9999999999",
  "email": "john@example.com",
  "userType": "RETAILER",
  "role": "SUB_USER",
  "status": "ENABLED"
}
```

### 3. Update Sub User
```
PUT /ums/v1/tenant/users/update/{userId}
Body: { ...same as create... }
```

### 4. Delete Sub User
```
DELETE /ums/v1/tenant/users/delete/{userId}
```

---

## Step 3: Registration Endpoints

Backend ko ye endpoints public banana hoga:

```
POST /ums/v1/users/register (Travel Agent)
POST /ums/v1/tenant/register (API Partner, WhiteLabel, Corporate)
```

---

## Step 4: Test

### Test as Travel Agent:
1. Register via Travel Agent Portal
2. Login
3. Go to Profile
4. Should see only "My Profile" tab ✅

### Test as Tenant:
1. Register as API Partner/WhiteLabel/Corporate
2. Login
3. Go to Profile
4. Should see "My Profile" and "Sub Users" tabs ✅
5. Click "Sub Users" tab
6. Click "+ Add Sub User"
7. Fill form and submit
8. Verify sub user appears in table ✅

---

## Files Created

✅ `src/modules/users/api/subUserApi.js`
✅ `src/modules/users/pages/SubUsersPage.jsx`
✅ `src/modules/users/pages/ProfileWithTabs.jsx`
✅ `src/modules/users/pages/_subUsersPage.scss`
✅ `src/modules/users/pages/_profileWithTabs.scss`

## Files Modified

✅ `src/modules/onboarding/tenants/api/onboardingApi.js`
✅ `src/modules/onboarding/tenants/services/onboardingService.js`

---

## Quick Check

Run this to verify files exist:
```bash
ls src/modules/users/pages/SubUsersPage.jsx
ls src/modules/users/pages/ProfileWithTabs.jsx
ls src/modules/users/api/subUserApi.js
```

---

## Summary

1. ✅ Update routes to use ProfileWithTabs
2. ⚠️ Backend needs to implement 4 sub user APIs
3. ⚠️ Backend needs to make registration endpoints public
4. ✅ Test with both Travel Agent and Tenant users

**That's it! Feature is ready.** 🚀
