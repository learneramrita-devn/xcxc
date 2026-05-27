# Login System - Quick Reference

## 🔐 Login Methods

### Method 1: Direct Login (NEW)
**URL:** `/login`

**Required Fields:**
- Email (registered email address)
- Password (minimum 8 characters)

**Optional:**
- Remember Me checkbox

**Process:**
1. User visits `/login`
2. Enters email and password
3. System validates credentials
4. On success → Dashboard
5. On failure → Error message

---

### Method 2: Mobile-First Login (Existing)
**URL:** `/register`

**Process:**
1. User enters mobile number
2. System checks if mobile exists
3. If exists → Password screen
4. If not exists → Registration flow

---

## 🎯 Key Features

### Security
✅ JWT-based authentication
✅ Automatic token refresh
✅ Rate limiting (5 attempts/5 minutes)
✅ Secure token storage
✅ Input sanitization
✅ CSRF protection

### User Experience
✅ Clean, modern UI
✅ Real-time validation
✅ Toast notifications
✅ Loading states
✅ Error handling
✅ Remember me option

---

## 🔄 Authentication Flow

```
User Login
    ↓
Email + Password
    ↓
POST /ums/v1/auth/login
    ↓
Receive JWT Token
    ↓
Store Token (Cookies + Storage)
    ↓
Redirect to Dashboard
    ↓
Token Auto-Refresh (on 401)
```

---

## 📍 Important Routes

| Route | Purpose | Auth Required |
|-------|---------|---------------|
| `/login` | Login page | No |
| `/register` | Registration | No |
| `/dashboard` | User dashboard | Yes |
| `/admin` | Admin portal | Yes (Admin) |
| `/my-account/*` | Profile pages | Yes |

---

## 🛡️ Protected Routes

All routes under `/my-account/*` are protected by `AuthGuard`:
- Redirects to `/login` if not authenticated
- Preserves intended destination
- Returns to original page after login

---

## 🔧 API Endpoints

### Login
```
POST /ums/v1/auth/login
Body: {
  username: "email@example.com",
  password: "password123",
  tenantId: 1,
  deviceId: "device_xxx",
  deviceInfo: { browser, os, isMobile }
}
```

### Token Refresh
```
POST /ums/v1/auth/refresh
Body: {
  refreshToken: "refresh_token_here"
}
```

---

## 💾 Token Storage

**Access Token:**
- Stored in: Cookies + SessionStorage/LocalStorage
- Used for: API authentication
- Auto-refreshed: Yes
- Expires: Based on JWT exp claim

**Refresh Token:**
- Stored in: Cookies + SessionStorage/LocalStorage
- Used for: Getting new access token
- Expires: Longer than access token

---

## ⚠️ Error Codes

| Code | Message | Action |
|------|---------|--------|
| 23 | Invalid credentials | Check email/password |
| DISABLED | Account not activated | Check email for activation |
| MOBILE_MISMATCH | Wrong mobile number | Use correct mobile |
| 401 | Unauthorized | Token expired, auto-refresh |
| 429 | Too many attempts | Wait 5 minutes |

---

## 🧪 Testing

### Test Login:
1. Go to `/login`
2. Enter valid email and password
3. Click "Login"
4. Should redirect to dashboard

### Test Token Refresh:
1. Login successfully
2. Wait for token to expire (or manually expire it)
3. Make an API call
4. Token should auto-refresh
5. Request should succeed

### Test Rate Limiting:
1. Go to `/login`
2. Enter wrong password 5 times
3. Should show "Too many attempts" error
4. Wait 5 minutes to try again

---

## 🎨 UI Components

### LoginPage
- Location: `src/modules/auth/pages/LoginPage.jsx`
- Uses: AuthLayout, PasswordInput, Toast
- Validation: Zod schema (loginSchema)

### PasswordStep (Mobile Flow)
- Location: `src/modules/onboarding/tenants/pages/PasswordStep.jsx`
- Used in: Registration flow
- Same validation as LoginPage

---

## 🔑 Remember Me

**When Enabled:**
- Tokens stored in LocalStorage
- Session persists for 30 days
- Survives browser restart

**When Disabled:**
- Tokens stored in SessionStorage
- Session ends when browser closes
- More secure for shared devices

---

## 📱 Responsive Design

✅ Desktop optimized
✅ Tablet friendly
✅ Mobile responsive
✅ Touch-friendly buttons
✅ Accessible forms

---

## 🚨 Common Issues

### Issue: "Invalid email or password"
**Solution:** Verify credentials are correct

### Issue: "Account not activated"
**Solution:** Check email for activation link

### Issue: "Too many attempts"
**Solution:** Wait 5 minutes before trying again

### Issue: Redirects to login after successful login
**Solution:** Check if token is being stored correctly

### Issue: Token expires too quickly
**Solution:** Backend may need to increase token expiry time

---

## 📞 Support

For issues or questions:
1. Check browser console (should be clean)
2. Check network tab for API responses
3. Verify backend is running
4. Check token storage in DevTools

---

## 🎉 Summary

✅ Dedicated login page at `/login`
✅ Email/password authentication
✅ Automatic token refresh
✅ Clean production code (no console.log)
✅ Proper error handling
✅ Rate limiting protection
✅ Secure token storage
✅ Mobile-responsive design

**The login system is production-ready!**
