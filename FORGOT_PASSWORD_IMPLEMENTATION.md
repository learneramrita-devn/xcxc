# Forgot Password Implementation

## Overview
Complete forgot password functionality for both User and Tenant accounts with email-based password reset flow.

## Flow Diagram

```
User clicks "Forgot Password" 
    ↓
Select Account Type (User/Tenant)
    ↓
Enter Email Address
    ↓
Backend sends reset link to email
    ↓
User clicks reset link in email
    ↓
Token verification
    ↓
Enter new password
    ↓
Password updated successfully
    ↓
Redirect to Login
```

## Files Created

### 1. API Service
**File**: `src/modules/auth/api/forgotPasswordApi.js`

```javascript
// User APIs
userForgotPasswordApi(email)          // POST /ums/v1/users/forgot-password
userUpdatePasswordApi(payload)        // PUT /ums/v1/users/update/password

// Tenant APIs
tenantForgotPasswordApi(email)        // POST /ums/v1/tenant/forgot-password
tenantUpdatePasswordApi(payload)      // PUT /ums/v1/tenant/password

// Token Verification
verifyResetTokenApi(token)            // POST /ums/v1/users/verify-reset-token
```

### 2. Forgot Password Page
**File**: `src/modules/auth/pages/ForgotPasswordPage.jsx`

Features:
- Account type selection (User/Tenant)
- Email input with validation
- Calls appropriate API based on account type
- Success message and redirect to login

### 3. Reset Password Page
**File**: `src/modules/auth/pages/ResetPasswordPage.jsx`

Features:
- Token verification on page load
- New password input with show/hide toggle
- Confirm password validation
- Password strength requirement (min 8 characters)
- Calls appropriate API based on user type

### 4. Styles
**File**: `src/modules/auth/pages/_forgotPassword.scss`

Features:
- Centered card layout
- Gradient background
- Custom radio buttons
- Password toggle buttons
- Responsive design

## Files Modified

### 1. PasswordStep.jsx
- Added Link to `/forgot-password` route
- "Forgot Password" link now functional

### 2. AppRoutes.jsx
- Added `/forgot-password` route
- Added `/reset-password` route

## Backend API Requirements

### 1. User Forgot Password
**Endpoint**: `POST /ums/v1/users/forgot-password`

**Request**:
```json
{
  "email": "user@example.com"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Password reset link sent to your email"
}
```

**Email Content**:
```
Subject: Reset Your Password - TravelApp

Hi [User Name],

You requested to reset your password. Click the link below to reset:

[Reset Password Button/Link]
http://yourdomain.com/reset-password?token=JWT_TOKEN&type=USER

This link will expire in 1 hour.

If you didn't request this, please ignore this email.
```

### 2. Tenant Forgot Password
**Endpoint**: `POST /ums/v1/tenant/forgot-password`

**Request**:
```json
{
  "email": "tenant@example.com"
}
```

**Response**: Same as User API

**Email Link**: `http://yourdomain.com/reset-password?token=JWT_TOKEN&type=TENANT`

### 3. Verify Reset Token
**Endpoint**: `POST /ums/v1/users/verify-reset-token`

**Request**:
```json
{
  "token": "JWT_TOKEN"
}
```

**Response**:
```json
{
  "userId": "user123",
  "email": "user@example.com",
  "userType": "USER"
}
```

**Error Response** (expired/invalid):
```json
{
  "errCode": "TOKEN_EXPIRED",
  "message": "Reset link has expired"
}
```

### 4. User Update Password
**Endpoint**: `PUT /ums/v1/users/update/password`

**Request**:
```json
{
  "token": "JWT_TOKEN",
  "newPassword": "NewPassword@123"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

### 5. Tenant Update Password
**Endpoint**: `PUT /ums/v1/tenant/password`

**Request**: Same as User API

**Response**: Same as User API

## JWT Token Structure

The reset token should contain:
```json
{
  "userId": "user123",
  "email": "user@example.com",
  "type": "PASSWORD_RESET",
  "exp": 1234567890,  // 1 hour expiry
  "iat": 1234567890
}
```

## Email Template (HTML)

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
        .content { padding: 40px 30px; }
        .button { display: inline-block; background: #667eea; color: white; padding: 14px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔐 Reset Your Password</h1>
        </div>
        <div class="content">
            <h2>Password Reset Request</h2>
            <p>Hi {{firstName}},</p>
            <p>We received a request to reset your password. Click the button below to create a new password:</p>
            
            <center>
                <a href="{{resetLink}}" class="button">Reset Password</a>
            </center>
            
            <p>Or copy and paste this link in your browser:</p>
            <p style="background: #f3f4f6; padding: 10px; border-radius: 4px; word-break: break-all;">
                {{resetLink}}
            </p>
            
            <p style="margin-top: 30px; color: #ef4444; font-size: 14px;">
                ⚠️ This link will expire in 1 hour.
            </p>
            
            <p style="color: #6b7280; font-size: 14px;">
                If you didn't request this password reset, please ignore this email or contact support if you have concerns.
            </p>
        </div>
        <div class="footer">
            <p>© 2024 TravelApp. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
```

## Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/forgot-password` | ForgotPasswordPage | Enter email to receive reset link |
| `/reset-password?token=xxx&type=USER` | ResetPasswordPage | Reset password with token |

## User Flow

### Step 1: Forgot Password
1. User clicks "Forgot Password" on login page
2. Redirected to `/forgot-password`
3. Selects account type (User/Tenant)
4. Enters email address
5. Clicks "Send Reset Link"
6. Backend sends email with reset link
7. Success message shown
8. Redirected to login page

### Step 2: Reset Password
1. User clicks reset link in email
2. Redirected to `/reset-password?token=xxx&type=USER`
3. Token verified automatically
4. If valid: Show password reset form
5. If invalid/expired: Show error and redirect to login
6. User enters new password
7. User confirms password
8. Clicks "Reset Password"
9. Password updated in backend
10. Success message shown
11. Redirected to login page

## Security Features

1. **Token Expiry**: Reset tokens expire in 1 hour
2. **One-time Use**: Token should be invalidated after successful password reset
3. **Password Validation**: Minimum 8 characters required
4. **Account Type Verification**: Separate APIs for User and Tenant
5. **Email Verification**: Reset link sent only to registered email

## Testing Checklist

- [ ] User can access forgot password page from login
- [ ] User type selection works (User/Tenant)
- [ ] Email validation works
- [ ] Appropriate API called based on user type
- [ ] Success message shown after sending reset link
- [ ] Reset link in email works
- [ ] Token verification works on reset page
- [ ] Expired token shows error
- [ ] Invalid token shows error
- [ ] Password validation works (min 8 chars)
- [ ] Password mismatch shows error
- [ ] Password show/hide toggle works
- [ ] Password reset successful
- [ ] User redirected to login after reset
- [ ] User can login with new password

## Error Handling

| Error | Message |
|-------|---------|
| Invalid email | "Please enter a valid email address" |
| Email not found | "No account found with this email" |
| Token expired | "Reset link has expired. Please request a new one" |
| Invalid token | "Invalid reset link" |
| Password too short | "Password must be at least 8 characters" |
| Password mismatch | "Passwords do not match" |
| Network error | "Network error. Please try again" |

## Environment Variables

```env
# Frontend URL for reset link
FRONTEND_URL=http://localhost:5173

# Token expiry (in seconds)
RESET_TOKEN_EXPIRY=3600  # 1 hour
```

## Build Command

```bash
npm run build
```

## Deployment Notes

1. Update `FRONTEND_URL` in backend to production domain
2. Configure email service (SMTP/SendGrid/AWS SES)
3. Test email delivery in production
4. Monitor token expiry and usage
5. Set up email templates in backend
