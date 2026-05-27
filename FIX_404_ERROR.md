# 🔧 Fix for 404 Error on Registration

## Problem
Registration API call failing with 404 error because `VITE_API_BASE_URL` was empty.

## Solution Applied
Updated `.env` file with correct API base URL:

```env
VITE_API_BASE_URL=http://13.126.207.62
VITE_FLIGHT_API_BASE_URL=http://13.126.207.62
VITE_TENANT_ID=1
```

## ⚠️ IMPORTANT: Restart Development Server

After changing `.env` file, you MUST restart the development server:

### Steps:
1. Stop the current dev server (Ctrl+C)
2. Run: `npm run dev`
3. Try registration again

## Why Restart is Needed?
Vite only reads environment variables at startup. Changes to `.env` file are not hot-reloaded.

## Verify Fix
After restart, check browser console:
```javascript
console.log(import.meta.env.VITE_API_BASE_URL)
// Should show: http://13.126.207.62
```

## API Endpoint Being Called
```
POST http://13.126.207.62/ums/v1/users/register
```

## If Still Getting 404
1. Verify backend is running at `http://13.126.207.62`
2. Check if `/ums/v1/users/register` endpoint exists
3. Check backend logs for errors
4. Verify payload format matches backend expectations

## Backend Endpoint Requirements
The registration endpoint should accept:
- Method: POST
- URL: `/ums/v1/users/register`
- Content-Type: application/json
- Body: User registration payload (as shown in your error)

## Contact Backend Team If:
- Endpoint URL is different
- Payload structure needs changes
- Authentication required for registration
- CORS issues
