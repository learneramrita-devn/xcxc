# ✅ API Working in Postman - Frontend Fix

## Problem
- ✅ API works in Postman
- ❌ API fails in Frontend (405 error)

## Root Cause
Frontend was using proxy which was not configured correctly or dev server not restarted.

## Solution Applied

### 1. Use Direct Backend URL (No Proxy)
Updated `.env`:
```env
VITE_API_BASE_URL=http://13.126.207.62
```

### 2. Restart Dev Server
```bash
# Stop server (Ctrl+C)
npm run dev
```

## Why Postman Works But Frontend Doesn't?

### Postman:
- Direct HTTP request
- No CORS restrictions
- No browser security

### Frontend (Browser):
- CORS restrictions apply
- Browser blocks cross-origin requests
- Need proper headers from backend

## Backend CORS Configuration Needed

Since Postman works, backend is running. But backend needs CORS headers for browser:

### For Spring Boot:
```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins("http://localhost:5173", "http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true);
            }
        };
    }
}
```

### For Node.js/Express:
```javascript
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
```

### For nginx:
```nginx
location /ums {
    add_header 'Access-Control-Allow-Origin' '*';
    add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS';
    add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization';
    
    if ($request_method = 'OPTIONS') {
        return 204;
    }
    
    proxy_pass http://localhost:8080;
}
```

## Test After Restart

### 1. Restart Dev Server
```bash
npm run dev
```

### 2. Check Console
```javascript
console.log(import.meta.env.VITE_API_BASE_URL)
// Should show: http://13.126.207.62
```

### 3. Try Registration
- Fill form
- Submit
- Check console for errors

### 4. Check Network Tab
- Request URL: `http://13.126.207.62/ums/v1/users/register`
- Method: POST
- Status: Should be 200 or 201 (not 405)

## If Still Getting CORS Error

Browser console will show:
```
Access to XMLHttpRequest at 'http://13.126.207.62/ums/v1/users/register' 
from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solution:** Backend team needs to add CORS headers (see above)

## Temporary Fix: Use Proxy

If backend team can't add CORS immediately:

### Keep `.env` empty:
```env
VITE_API_BASE_URL=
```

### Proxy is already configured in `vite.config.js`

### Restart server:
```bash
npm run dev
```

This will route requests through Vite proxy, bypassing CORS.

## Compare Postman vs Frontend

### Postman Request:
```
POST http://13.126.207.62/ums/v1/users/register
Content-Type: application/json
Body: { ... }
```

### Frontend Request (should be same):
```
POST http://13.126.207.62/ums/v1/users/register
Content-Type: application/json
Body: { ... }
```

## Debug Steps

### 1. Check Request in Network Tab
- Open DevTools → Network
- Try registration
- Click on the request
- Compare with Postman:
  - URL same?
  - Method same?
  - Headers same?
  - Body same?

### 2. Check Response
- Status code?
- Response headers?
- Response body?

### 3. Check Console
- Any CORS errors?
- Any other errors?

## Most Likely Issues

### Issue 1: CORS (Most Common)
**Symptom:** CORS error in console  
**Solution:** Backend adds CORS headers

### Issue 2: Dev Server Not Restarted
**Symptom:** Old config still active  
**Solution:** Restart dev server

### Issue 3: Browser Cache
**Symptom:** Old requests cached  
**Solution:** Hard refresh (Ctrl+Shift+R)

### Issue 4: Wrong Headers
**Symptom:** 405 or 415 error  
**Solution:** Check Content-Type header

## Quick Test

Run this in browser console:
```javascript
fetch('http://13.126.207.62/ums/v1/users/user-check', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ mobileIn: ['9999999999'] })
})
.then(r => r.json())
.then(d => console.log('✅ Success:', d))
.catch(e => console.error('❌ Error:', e))
```

If this works → Frontend code issue  
If this fails → CORS issue

## Summary

✅ Backend is working (Postman confirms)  
✅ Direct URL set in `.env`  
⚠️ Need to restart dev server  
⚠️ May need CORS headers from backend  

**Next Step:** Restart dev server and test!

---

**Status:** 🟡 Waiting for dev server restart
