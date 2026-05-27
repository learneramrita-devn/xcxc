# 🔐 Login Issue - Troubleshooting

## Test Results

### Backend Direct Test (SUCCESS ✅)
```bash
curl -X POST http://13.126.207.62:8080/ums/v1/auth/login
Credentials: vedam@gmail.com / Test#123
Response: 200 OK with JWT tokens
```

**Backend is working perfectly!**

## Credentials
```
Mobile: 9889880000
Email: vedam@gmail.com
Password: Test#123
```

## What to Check

### 1. Dev Server Restarted?
```bash
Ctrl+C
npm run dev
```

### 2. Browser Console Logs
Open console (F12) and look for:

```javascript
=== LOGIN ATTEMPT START ===
Mobile: 9889880000
Email: vedam@gmail.com
Password length: 8

=== LOGIN RESPONSE ===
// Should show response with tokens

=== LOGIN ERROR ===
// If error, what's the message?
```

### 3. Network Tab
Check the request:
- URL: Should be `/ums/v1/auth/login`
- Status: Should be 200
- Response: Should have accessToken

### 4. Common Issues

#### Issue 1: Mobile Mismatch
**Error:** "This email is registered with mobile XXXXX"

**Cause:** Email belongs to different mobile number

**Solution:** Use correct mobile number for this email

#### Issue 2: Password Validation
**Error:** "Password must be at least 8 characters"

**Cause:** Zod validation failing

**Solution:** Password should be 8+ characters

#### Issue 3: Rate Limiting
**Error:** "Too many login attempts"

**Cause:** 5 failed attempts in 5 minutes

**Solution:** Wait 5 minutes or clear localStorage

#### Issue 4: Token Storage
**Error:** "Login failed. Invalid token."

**Cause:** Token storage failing

**Solution:** Check browser console for errors

## Debug Steps

### Step 1: Check if mobile matches
Backend might return different mobile for this email.

Console should show:
```
=== MOBILE VALIDATION ===
API Mobile: XXXXX
Entered Mobile: 9889880000
Do they match? true/false
```

If false → Use correct mobile number

### Step 2: Check password format
Password: `Test#123`
- Length: 8 ✅
- Has uppercase: T ✅
- Has lowercase: est ✅
- Has number: 123 ✅
- Has special: # ✅

Should pass validation.

### Step 3: Test in browser console
```javascript
fetch('http://13.126.207.62:8080/ums/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'vedam@gmail.com',
    password: 'Test#123',
    tenantId: 1
  })
})
.then(r => r.json())
.then(d => console.log('Success:', d))
.catch(e => console.error('Error:', e))
```

If this works → Frontend code issue  
If this fails → CORS/Network issue

## Possible Solutions

### Solution 1: Clear Rate Limiting
```javascript
// In browser console
localStorage.clear()
```

### Solution 2: Check Mobile Number
Backend might have different mobile for this email.

Try checking what mobile is registered:
```
POST /ums/v1/users/user-check
Body: { "mobileIn": ["9889880000"] }
```

### Solution 3: Bypass Mobile Validation (Temporary)
If mobile mismatch is the issue, we can temporarily disable it.

## What to Share

Please share:

1. **Browser console logs** (full)
2. **Network tab** screenshot
3. **Exact error message** shown to user
4. **Mobile number** registered with vedam@gmail.com

## Expected Flow

```
1. Enter mobile: 9889880000
2. Click Continue
3. Enter email: vedam@gmail.com
4. Enter password: Test#123
5. Click Login
6. Should redirect to /dashboard
```

## Quick Test

Try this exact sequence:
1. Clear localStorage: `localStorage.clear()`
2. Refresh page
3. Enter mobile: 9889880000
4. Continue
5. Enter email: vedam@gmail.com
6. Enter password: Test#123
7. Login

Share console logs if it fails.

---

**Status:** Backend working ✅, Need frontend logs to debug
