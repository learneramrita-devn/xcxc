# 🔴 405 Error Still Persisting - Troubleshooting

## Step 1: Verify Dev Server Restarted

**CRITICAL:** Did you restart the dev server?

```bash
# Stop server
Ctrl+C

# Start again
npm run dev
```

**Vite config changes require full restart!**

## Step 2: Check Console Logs

Open browser console and look for:

```
Proxying: POST /ums/v1/users/user-check
```

If you DON'T see this → Proxy not working

## Step 3: Hard Refresh Browser

```
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)
```

This clears cache.

## Step 4: Check Network Tab

1. Open DevTools (F12)
2. Go to Network tab
3. Try mobile check
4. Look at the request URL

**Should be:**
```
http://localhost:5173/ums/v1/users/user-check
```

**NOT:**
```
http://13.126.207.62/ums/v1/users/user-check
```

## Step 5: Test Proxy Manually

Open browser console and run:

```javascript
fetch('/ums/v1/users/user-check', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ mobileIn: ['9999999999'] })
})
.then(r => r.json())
.then(d => console.log('✅ Success:', d))
.catch(e => console.error('❌ Error:', e))
```

**If this works** → Frontend code issue  
**If this fails** → Proxy issue

## Step 6: Check .env File

```env
VITE_API_BASE_URL=
```

Should be EMPTY (no URL)

## Step 7: Verify vite.config.js

Should have:

```javascript
proxy: {
  '/api': {
    target: 'http://13.126.207.62',
    changeOrigin: true,
    secure: false,
  },
  '/ums': {
    target: 'http://13.126.207.62',
    changeOrigin: true,
    secure: false,
  },
}
```

## Common Issues

### Issue 1: Dev Server Not Restarted
**Solution:** Stop and start again

### Issue 2: Browser Cache
**Solution:** Hard refresh (Ctrl+Shift+R)

### Issue 3: Wrong Port
**Solution:** Make sure you're on http://localhost:5173

### Issue 4: Proxy Not Loading
**Solution:** Check terminal for proxy errors

## Alternative: Direct Backend Call (Temporary)

If proxy still not working, use direct backend:

### Update .env:
```env
VITE_API_BASE_URL=http://13.126.207.62
```

### Restart server:
```bash
npm run dev
```

This will bypass proxy but may have CORS issues.

## Backend CORS Headers Needed

If using direct backend, backend needs:

```
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

## What to Share for Help

1. **Terminal output** when starting dev server
2. **Browser console** full error
3. **Network tab** request details
4. **Screenshot** of error

## Quick Test Checklist

- [ ] Dev server restarted
- [ ] Browser hard refreshed
- [ ] .env has empty VITE_API_BASE_URL
- [ ] vite.config.js has both /api and /ums proxy
- [ ] Using http://localhost:5173 (not 5174 or other port)
- [ ] No other errors in console

---

**If still not working, share:**
1. Terminal logs
2. Browser console screenshot
3. Network tab screenshot
