# 🚀 Quick Reference Guide - Secure Login Implementation

## 📦 Packages Installed

```bash
npm install react-hook-form @hookform/resolvers zod js-cookie
```

## 🔑 Key Features Summary

| Feature | Status | File |
|---------|--------|------|
| React Hook Form | ✅ | `PasswordStep.jsx` |
| Zod Validation | ✅ | `loginSchema.js` |
| JWT Tokens | ✅ | `jwtUtils.js` |
| Secure Storage | ✅ | `tokenStorage.js` |
| CSRF Protection | ✅ | `csrfProtection.js` |
| XSS Protection | ✅ | `security.js` |
| Rate Limiting | ✅ | `security.js` |
| Request Debouncing | ✅ | `requestDebouncer.js` |
| Auto Token Refresh | ✅ | `apiClient.js` |
| Idle Timeout | ✅ | `useIdleTimeout.js` |
| Remember Me | ✅ | `PasswordStep.jsx` |
| Device Tracking | ✅ | `tokenStorage.js` |
| Protected Routes | ✅ | `AuthGuard.jsx` |

## 🎯 How to Use

### 1. Login Form with Validation

```jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from './schemas/loginSchema';

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(loginSchema),
});

const onSubmit = async (data) => {
  // data is validated and sanitized
  await loginUser(data);
};
```

### 2. Secure Token Storage

```javascript
import { storeTokens, getAccessToken, clearAuthData } from './utils/tokenStorage';

// Store tokens
storeTokens(accessToken, refreshToken, rememberMe);

// Get token
const token = getAccessToken();

// Clear all data
clearAuthData();
```

### 3. Protected Routes

```jsx
import { AuthGuard, AdminGuard } from './guards/AuthGuard';

// Protected route
<Route path="/dashboard" element={
  <AuthGuard>
    <DashboardPage />
  </AuthGuard>
} />

// Admin only route
<Route path="/admin" element={
  <AdminGuard>
    <AdminPage />
  </AdminGuard>
} />
```

### 4. Idle Timeout

```jsx
import { useIdleTimeout } from './hooks/useIdleTimeout';

const handleIdle = () => {
  logout();
  navigate('/register');
};

useIdleTimeout(handleIdle);
```

### 5. CSRF Protection

```javascript
import { getCSRFHeader } from './utils/csrfProtection';

// Automatically added to POST/PUT/DELETE requests
// No manual action needed
```

### 6. Input Sanitization

```javascript
import { sanitizeInput, sanitizeEmail } from './utils/security';

const cleanEmail = sanitizeEmail(userInput);
const cleanText = sanitizeInput(userInput);
```

### 7. Rate Limiting

```javascript
import { loginRateLimiter } from './utils/security';

if (!loginRateLimiter.isAllowed(email)) {
  showError('Too many attempts');
  return;
}
```

### 8. Device Info

```javascript
import { getDeviceInfo } from './utils/tokenStorage';

const deviceInfo = getDeviceInfo();
// { deviceId, browser, os, isMobile, timestamp }
```

## 🔐 Security Best Practices

### ✅ DO's

1. **Always validate inputs** - Use Zod schemas
2. **Sanitize user input** - Use DOMPurify
3. **Use HTTPS** - In production
4. **Store tokens securely** - Cookies with secure flags
5. **Implement rate limiting** - Prevent brute force
6. **Add idle timeout** - Auto-logout inactive users
7. **Log security events** - For audit trail
8. **Use CSRF tokens** - For state-changing requests
9. **Refresh tokens** - Before expiry
10. **Clear data on logout** - All storage

### ❌ DON'Ts

1. **Don't store sensitive data in localStorage** - Use secure cookies
2. **Don't expose error details** - Generic messages only
3. **Don't trust client-side validation** - Always validate on server
4. **Don't hardcode secrets** - Use environment variables
5. **Don't log sensitive data** - Passwords, tokens
6. **Don't allow unlimited attempts** - Rate limit
7. **Don't keep sessions forever** - Implement timeout
8. **Don't skip CSRF protection** - Always use tokens
9. **Don't ignore XSS** - Sanitize all inputs
10. **Don't forget to logout** - Clear all data

## 🧪 Testing Commands

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📊 Security Metrics

- **Token Expiry:** 30 minutes (access), 1 hour (refresh)
- **Idle Timeout:** 15 minutes
- **Rate Limit:** 5 attempts per 5 minutes
- **Remember Me:** 30 days
- **Request Debounce:** 500ms
- **Token Refresh:** Auto on 401

## 🐛 Debugging

### Check Token in Console

```javascript
// Get current token
localStorage.getItem('authToken')

// Decode JWT
const token = localStorage.getItem('authToken');
const payload = JSON.parse(atob(token.split('.')[1]));
console.log(payload);
```

### Check Auth State

```javascript
// In React DevTools
// Find AuthContext.Provider
// Check value: { isLoggedIn, user }
```

### Check Network Requests

1. Open DevTools → Network tab
2. Filter: XHR
3. Look for Authorization header
4. Check X-CSRF-Token header

## 🔄 Token Refresh Flow

```
API Request → 401 Error
    ↓
Get Refresh Token
    ↓
Call /auth/refresh
    ↓
Success? → Store New Token → Retry Request
    ↓
Fail? → Logout → Redirect to Login
```

## 📱 Remember Me Flow

```
Remember Me ON:
- Tokens in Cookies (30 days)
- Tokens in localStorage
- Persistent login

Remember Me OFF:
- Tokens in Cookies (session)
- Tokens in sessionStorage
- Cleared on browser close
```

## 🎨 UI States

```javascript
// Loading
<button disabled={loading}>
  {loading ? 'Logging in...' : 'Login'}
</button>

// Error
{errors.email && <span>{errors.email.message}</span>}

// Success
onToast('Logged in successfully!', 'success');
```

## 🔗 Important URLs

- Login: `/register`
- Dashboard: `/dashboard`
- Admin: `/admin`
- Profile: `/my-account`

## 📞 Quick Help

**Login not working?**
1. Check console for errors
2. Verify API endpoint
3. Check network tab
4. Verify credentials
5. Check rate limiting

**Token expired?**
1. Should auto-refresh
2. Check refresh token
3. Check 401 interceptor
4. Verify token expiry

**Idle timeout too short?**
1. Edit `useIdleTimeout.js`
2. Change `IDLE_TIMEOUT` constant
3. Default: 15 minutes

**Need to add new protected route?**
```jsx
<Route path="/new-page" element={
  <AuthGuard>
    <NewPage />
  </AuthGuard>
} />
```

---

**Status:** ✅ All features implemented and ready for production!
