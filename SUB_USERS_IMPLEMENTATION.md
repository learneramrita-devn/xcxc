# Sub Users Feature - Implementation Complete! ✅

## Overview
Added Sub Users management feature for Tenants (API Partner, WhiteLabel, Corporate).

---

## 1. Registration Endpoints Fixed ✅

### User Registration (Travel Agent):
```
POST /ums/v1/users/register
```

### Tenant Registration (API Partner, WhiteLabel, Corporate):
```
POST /ums/v1/tenant/register
```

**Files Updated:**
- `src/modules/onboarding/tenants/api/onboardingApi.js`
- `src/modules/onboarding/tenants/services/onboardingService.js`

---

## 2. Sub Users Feature Added ✅

### New Files Created:

#### API Layer:
**File:** `src/modules/users/api/subUserApi.js`

**APIs:**
- `getSubUsersApi(tenantId)` - Get all sub users
- `createSubUserApi(payload)` - Create new sub user
- `updateSubUserApi(userId, payload)` - Update sub user
- `deleteSubUserApi(userId)` - Delete sub user
- `getSubUserByIdApi(userId)` - Get single sub user

#### UI Components:
**File:** `src/modules/users/pages/SubUsersPage.jsx`

**Features:**
- ✅ View sub users in table
- ✅ Add new sub user (modal form)
- ✅ Edit existing sub user
- ✅ Delete sub user
- ✅ Form validation
- ✅ Toast notifications

**File:** `src/modules/users/pages/ProfileWithTabs.jsx`

**Features:**
- ✅ Tab navigation (My Profile / Sub Users)
- ✅ Only shows Sub Users tab for Tenants
- ✅ Seamless tab switching

#### Styles:
- `src/modules/users/pages/_subUsersPage.scss`
- `src/modules/users/pages/_profileWithTabs.scss`

---

## 3. Sub User Form Fields

### Add/Edit Sub User Form:
- **Title** - Dropdown (Mr, Mrs, Miss, Dr)
- **First Name** - Text input (required)
- **Last Name** - Text input (required)
- **Mobile Number** - 10-digit number (required)
- **Email** - Email input (required)
- **User Type** - Dropdown (Retailer, Distributor)

---

## 4. Backend API Endpoints Required

### Get Sub Users:
```
POST /ums/v1/tenant/users/list
Request: { "tenantId": 1 }
Response: { "userList": [...] }
```

### Create Sub User:
```
POST /ums/v1/tenant/users/create
Request: {
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
Response: { "userId": 123, "message": "User created" }
```

### Update Sub User:
```
PUT /ums/v1/tenant/users/update/{userId}
Request: { ...same as create... }
Response: { "message": "User updated" }
```

### Delete Sub User:
```
DELETE /ums/v1/tenant/users/delete/{userId}
Response: { "message": "User deleted" }
```

---

## 5. User Flow

### For Travel Agents:
1. Register via `/ums/v1/users/register`
2. Login
3. See only "My Profile" tab
4. Cannot create sub users

### For Tenants (API Partner, WhiteLabel, Corporate):
1. Register via `/ums/v1/tenant/register`
2. Login
3. See "My Profile" and "Sub Users" tabs
4. Can create/edit/delete sub users
5. Sub users can be Retailers or Distributors

---

## 6. How to Use

### Step 1: Update Routes
Add ProfileWithTabs to your routes:

```javascript
// In your routes file
import ProfileWithTabs from './modules/users/pages/ProfileWithTabs';

{
  path: '/profile',
  element: <ProfileWithTabs />
}
```

### Step 2: Backend Setup
Backend team needs to implement these endpoints:
- `/ums/v1/tenant/users/list`
- `/ums/v1/tenant/users/create`
- `/ums/v1/tenant/users/update/:userId`
- `/ums/v1/tenant/users/delete/:userId`

### Step 3: Test
1. Login as Tenant (API Partner/WhiteLabel/Corporate)
2. Go to Profile page
3. Click "Sub Users" tab
4. Click "+ Add Sub User"
5. Fill form and submit
6. Verify sub user appears in table
7. Test Edit and Delete

---

## 7. Features Implemented

### Table View:
- ✅ Title column
- ✅ Name column
- ✅ Mobile Number column
- ✅ Email column
- ✅ User Type column (badge)
- ✅ Status column (badge)
- ✅ Actions column (Edit/Delete buttons)

### Add/Edit Modal:
- ✅ Responsive design
- ✅ Form validation
- ✅ Error handling
- ✅ Loading states
- ✅ Success/Error toasts

### Permissions:
- ✅ Only Tenants can see Sub Users tab
- ✅ Travel Agents don't see the tab

---

## 8. Validation Rules

### Mobile Number:
- Must be exactly 10 digits
- Required field

### Email:
- Must be valid email format
- Required field

### Name:
- First name required
- Last name required

### User Type:
- Must select Retailer or Distributor
- Required field

---

## 9. UI/UX Features

### Responsive Design:
- ✅ Works on desktop
- ✅ Works on tablet
- ✅ Works on mobile
- ✅ Table scrolls horizontally on small screens

### User Feedback:
- ✅ Loading indicators
- ✅ Success toasts
- ✅ Error toasts
- ✅ Confirmation dialogs for delete

### Accessibility:
- ✅ Keyboard navigation
- ✅ Focus states
- ✅ ARIA labels
- ✅ Semantic HTML

---

## 10. Testing Checklist

### Registration:
- [ ] Travel Agent registers via `/ums/v1/users/register`
- [ ] API Partner registers via `/ums/v1/tenant/register`
- [ ] WhiteLabel registers via `/ums/v1/tenant/register`
- [ ] Corporate registers via `/ums/v1/tenant/register`

### Profile Page:
- [ ] Travel Agent sees only "My Profile" tab
- [ ] Tenant sees both "My Profile" and "Sub Users" tabs
- [ ] Tab switching works smoothly

### Sub Users:
- [ ] Can view list of sub users
- [ ] Can add new sub user
- [ ] Can edit existing sub user
- [ ] Can delete sub user
- [ ] Form validation works
- [ ] Toast notifications appear
- [ ] Table updates after add/edit/delete

---

## 11. Files Summary

### New Files:
1. `src/modules/users/api/subUserApi.js` - API functions
2. `src/modules/users/pages/SubUsersPage.jsx` - Sub users management
3. `src/modules/users/pages/ProfileWithTabs.jsx` - Tabbed profile
4. `src/modules/users/pages/_subUsersPage.scss` - Sub users styles
5. `src/modules/users/pages/_profileWithTabs.scss` - Tabs styles

### Modified Files:
1. `src/modules/onboarding/tenants/api/onboardingApi.js` - Fixed endpoints
2. `src/modules/onboarding/tenants/services/onboardingService.js` - Fixed logic

---

## 12. Next Steps

### Frontend:
1. ✅ Code complete
2. ⚠️ Update routes to use ProfileWithTabs
3. ⚠️ Test with backend APIs

### Backend:
1. ⚠️ Implement sub users APIs
2. ⚠️ Make registration endpoints public
3. ⚠️ Test all endpoints

---

## 13. API Payload Examples

### Create Sub User:
```json
{
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

### Update Sub User:
```json
{
  "tenantId": 1,
  "title": "Mrs",
  "firstName": "Jane",
  "lastName": "Doe",
  "name": "Mrs Jane Doe",
  "mobileNumber": "8888888888",
  "email": "jane@example.com",
  "userType": "DISTRIBUTOR",
  "role": "SUB_USER",
  "status": "ENABLED"
}
```

---

## Summary

✅ **Registration endpoints fixed**
✅ **Sub Users feature complete**
✅ **UI/UX polished**
✅ **Responsive design**
✅ **Form validation**
✅ **Error handling**

**Ready for testing!** 🚀
