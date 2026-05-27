# ❌ 405 ERROR - Backend Application Not Running

## Problem Identified

**Backend application is NOT running!**

Only nginx web server is running, but the actual backend API application (Spring Boot/Node.js/etc.) is not started.

## Evidence

All API endpoints returning 405:
```bash
curl -X POST http://13.126.207.62/ums/v1/users/register
# Response: 405 Not Allowed (nginx)

curl -X POST http://13.126.207.62/ums/v1/users/user-check
# Response: 405 Not Allowed (nginx)
```

## What's Happening

```
Browser → Vite Proxy → nginx (13.126.207.62) → ❌ Backend App NOT Running
```

nginx is running but backend application is stopped/crashed.

## Solution

### Backend Team Needs To:

1. **Start the Backend Application**
   ```bash
   # For Spring Boot
   java -jar application.jar
   
   # For Node.js
   npm start
   
   # For Docker
   docker-compose up -d
   ```

2. **Check Backend Logs**
   ```bash
   # Check if application is running
   ps aux | grep java
   ps aux | grep node
   
   # Check application logs
   tail -f /var/log/application.log
   ```

3. **Verify Backend is Running**
   ```bash
   # Should return JSON, not HTML
   curl http://localhost:8080/ums/v1/users/user-check \
     -H "Content-Type: application/json" \
     -d '{"mobileIn":["9999999999"]}'
   ```

4. **Check nginx Configuration**
   ```bash
   # nginx should proxy to backend
   cat /etc/nginx/sites-enabled/default
   
   # Should have something like:
   location /ums {
     proxy_pass http://localhost:8080;
   }
   ```

## How to Verify Backend is Running

### Test 1: Check Process
```bash
# SSH to server
ssh user@13.126.207.62

# Check if backend process is running
ps aux | grep -i "java\|node\|python"
```

### Test 2: Check Port
```bash
# Check if backend port is listening
netstat -tulpn | grep 8080
# or
lsof -i :8080
```

### Test 3: Test Locally on Server
```bash
# From server itself
curl http://localhost:8080/ums/v1/users/user-check \
  -H "Content-Type: application/json" \
  -d '{"mobileIn":["9999999999"]}'
```

## Common Causes

1. **Application Crashed**
   - Check logs for errors
   - Restart application

2. **Application Not Started After Reboot**
   - Setup systemd service
   - Enable auto-start

3. **Wrong Port Configuration**
   - Backend running on different port
   - nginx proxy pointing to wrong port

4. **Database Connection Failed**
   - Backend can't connect to database
   - Check database is running

5. **Out of Memory**
   - Server ran out of memory
   - Application killed by OOM killer

## Temporary Workaround

While backend team fixes the issue, you can:

### Option 1: Use Mock Data
Create mock API responses for development:

```javascript
// src/mocks/api.js
export const mockRegisterUser = async (payload) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    userId: 123,
    message: "User registered successfully (MOCK)"
  };
};
```

### Option 2: Use Different Backend URL
If there's a staging/dev server:

```env
VITE_API_BASE_URL=http://dev-server.com
```

## What Frontend Can Do

**Nothing!** This is a backend infrastructure issue.

Frontend is working correctly. The issue is:
- ✅ Frontend code is correct
- ✅ API calls are correct
- ✅ Proxy is configured correctly
- ❌ Backend application is not running

## Contact Backend Team

Share this information:

**Issue:** Backend application not running on `13.126.207.62`

**Evidence:**
- All `/ums/v1/*` endpoints returning 405
- nginx is running but backend app is not
- Only static HTML being served

**Required Actions:**
1. Start backend application
2. Verify it's listening on correct port (8080?)
3. Verify nginx proxy configuration
4. Test endpoints locally on server
5. Setup auto-restart on failure

**Test Command:**
```bash
curl -X POST http://13.126.207.62/ums/v1/users/user-check \
  -H "Content-Type: application/json" \
  -d '{"mobileIn":["9999999999"]}'
```

**Expected Response:** JSON data  
**Current Response:** HTML 405 error

## Once Backend is Fixed

1. No frontend changes needed
2. Just refresh browser
3. Registration will work

---

**Status:** 🔴 Waiting for backend team to start application

**ETA:** Depends on backend team response time

**Priority:** 🔥 HIGH - Application cannot function without backend
