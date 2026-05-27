# 🔧 Network Error Fix

## Changes Made

### 1. Removed CSRF Token (Temporarily)
- CSRF token was causing issues with backend
- Can be re-enabled once backend supports it

### 2. Removed withCredentials
- Was causing CORS preflight issues
- Backend needs to support CORS properly first

### 3. Added Detailed Logging
- Request logging to see full URL
- Error logging to debug issues

## How to Debug Network Error

### Step 1: Check Console Logs
Look for:
```javascript
API Request: {
  method: "post",
  url: "/ums/v1/users/register",
  baseURL: "http://13.126.207.62",
  fullURL: "http://13.126.207.62/ums/v1/users/register"
}
```

### Step 2: Check Network Tab
1. Open DevTools → Network tab
2. Try registration
3. Look for the request
4. Check:
   - Status: Should not be "failed" or "cancelled"
   - Response: Check error message
   - Headers: Check if CORS headers present

### Step 3: Common Network Error Causes

#### A. CORS Error
**Symptoms:**
- Console shows: "Access to XMLHttpRequest blocked by CORS policy"
- Network tab shows: (failed) or (cancelled)

**Solution:**
Backend needs to add CORS headers:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

#### B. Backend Not Running
**Symptoms:**
- Error: "Network Error"
- Console: "ERR_CONNECTION_REFUSED"

**Solution:**
- Verify backend is running at http://13.126.207.62
- Try: `curl http://13.126.207.62/ums/v1/users/register`

#### C. Wrong URL
**Symptoms:**
- 404 Not Found
- Endpoint doesn't exist

**Solution:**
- Verify endpoint with backend team
- Check if URL is correct

#### D. Timeout
**Symptoms:**
- Request takes too long
- Error: "timeout of 30000ms exceeded"

**Solution:**
- Increase timeout in `env.js`
- Check backend performance

### Step 4: Test Backend Directly

#### Using cURL:
```bash
curl -X POST http://13.126.207.62/ums/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "tenantId": 1,
    "name": "Test User",
    "email": "test@example.com",
    "mobileNumber": "9999999999",
    "passwordHash": "Test@123",
    "role": "AGENT"
  }'
```

#### Using Postman:
1. Method: POST
2. URL: http://13.126.207.62/ums/v1/users/register
3. Headers: Content-Type: application/json
4. Body: (paste your registration payload)

### Step 5: Check Browser Console

Look for specific errors:
- `ERR_CONNECTION_REFUSED` → Backend not running
- `ERR_NAME_NOT_RESOLVED` → DNS issue
- `ERR_CERT_AUTHORITY_INVALID` → SSL certificate issue
- `CORS policy` → CORS not configured on backend

## Temporary Workaround

If CORS is the issue, you can:

### Option 1: Use Browser Extension
Install "CORS Unblock" extension (for development only)

### Option 2: Use Proxy
Add to `vite.config.js`:
```javascript
export default {
  server: {
    proxy: {
      '/ums': {
        target: 'http://13.126.207.62',
        changeOrigin: true,
      }
    }
  }
}
```

Then update `.env`:
```env
VITE_API_BASE_URL=
```

This will make requests to `/ums/...` instead of `http://13.126.207.62/ums/...`

## Backend Requirements

For the app to work properly, backend must:

1. ✅ Accept POST requests to `/ums/v1/users/register`
2. ✅ Return proper CORS headers
3. ✅ Accept JSON payload
4. ✅ Return JSON response
5. ✅ Handle errors properly

## Contact Backend Team

Share this information:
- Frontend is making POST request to: `http://13.126.207.62/ums/v1/users/register`
- Content-Type: application/json
- Need CORS headers enabled
- Need proper error responses

## Re-enable CSRF Later

Once backend is stable, we can re-enable CSRF:
1. Backend needs to support CSRF tokens
2. Backend needs to validate X-CSRF-Token header
3. Backend needs to set CORS headers properly

For now, CSRF is disabled to fix network errors.
