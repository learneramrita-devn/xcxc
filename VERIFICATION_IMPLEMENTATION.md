# Sub User Verification & Email Change Implementation

## Changes Implemented

### 1. Sub User Creation & Verification Flow
- **Status**: Sub users now created with `status: 'DISABLED'` (In-Active)
- **Verify Button**: Added for In-Active users to send verification email
- **Name Display**: Shows as `firstName + lastName` combination
- **Flow**:
  1. Tenant creates sub user → Status: In-Active
  2. Click "Verify" button → Sends verification email
  3. Sub user clicks email link → Opens verification page
  4. OTP sent to mobile → User enters OTP (Test OTP: **123456**)
  5. Verify & Continue → User activated → Redirect to Dashboard

### 2. Change Email Flow (Updated)
- **Removed**: Current Password field
- **Added**: Verify button that sends verification email
- **Flow**:
  1. User enters new email
  2. Click "Send Verification Email"
  3. Verification email sent to new email
  4. User clicks email link → Opens verification page
  5. OTP sent to mobile → User enters OTP (Test OTP: **123456**)
  6. Verify & Continue → Email updated & user activated → Redirect to Dashboard

### 3. Referral Code
- Already optional in registration form (`required: false`)
- Not included in Sub User creation form

## Files Created

### 1. `src/modules/users/api/verificationApi.js`
API service for verification endpoints:
- `sendVerificationEmailApi(email)` - Send verification email
- `verifyEmailTokenApi(token)` - Verify email token from link
- `sendOtpApi(mobileNumber)` - Send OTP to mobile
- `verifyOtpApi(mobileNumber, otp)` - Verify OTP
- `activateUserApi(userId)` - Activate user account

### 2. `src/modules/users/pages/EmailVerificationPage.jsx`
Verification page with 3 steps:
- **Step 1**: Verifying email token (loading state)
- **Step 2**: OTP input form (6-digit OTP)
- **Step 3**: Success message → Redirect to dashboard

### 3. `src/modules/users/pages/_verificationPage.scss`
Minimal styles for verification page with centered card layout

## Files Modified

### 1. `src/modules/users/pages/SubUsersPage.jsx`
- Import `sendVerificationEmailApi`
- Changed status from `ENABLED` to `DISABLED` on creation
- Added `handleVerify()` function
- Added Verify button (✉️ Verify) for In-Active users
- Updated status display: DISABLED → "In-Active", ENABLED → "Active"

### 2. `src/modules/users/pages/_subUsersPage.scss`
- Added `.btn-verify` styling (green button)
- Updated `.action-buttons` to include verify button

### 3. `src/modules/users/pages/ChangeEmailPage.jsx`
- Removed `PasswordInput` import and `updateEmailApi`
- Added `sendVerificationEmailApi` import
- Removed `currentPassword` from formData
- Updated `handleSubmit()` to send verification email
- Removed password input field
- Updated button text to "Send Verification Email"

### 4. `src/app/routes/AppRoutes.jsx`
- Added import for `EmailVerificationPage`
- Added route: `/verify-email` → `<EmailVerificationPage />`

## Backend API Endpoints Required

```
POST /ums/v1/users/send-verification-email
Body: { email: string }
Response: { success: boolean, message: string }

POST /ums/v1/users/verify-email-token
Body: { token: string }
Response: { userId: string, email: string, mobileNumber: string }

POST /ums/v1/users/send-otp
Body: { mobileNumber: string }
Response: { success: boolean, message: string }

POST /ums/v1/users/verify-otp
Body: { mobileNumber: string, otp: string }
Response: { success: boolean, message: string }

POST /ums/v1/users/activate
Body: { userId: string }
Response: { success: boolean, message: string }
```

## Verification Email Link Format

The verification email should contain a link like:
```
https://yourdomain.com/verify-email?token=<JWT_TOKEN>&email=<USER_EMAIL>
```

## Testing Checklist

- [ ] Create sub user → Status shows "In-Active"
- [ ] Click Verify button → Toast shows "Verification email sent"
- [ ] Click email link → Opens verification page
- [ ] OTP sent to mobile → Toast confirmation
- [ ] Enter valid OTP → Success message → Redirect to dashboard
- [ ] User status updated to "Active"
- [ ] Change Email → Enter new email → Click "Send Verification Email"
- [ ] Follow same verification flow
- [ ] Email updated after successful verification

## Build Command

```bash
npm run build
```

## Deployment

Upload `dist/` folder contents to server after successful build.
