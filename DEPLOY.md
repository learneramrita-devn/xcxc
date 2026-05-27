# Deployment Instructions

## Latest Build Created: 27-05-2026 01:45

### Files to Deploy:
- `dist/` folder contains all production files
- Total size: ~21 KB (HTML/config) + assets folder

---

## Deployment Steps

### Option 1: Using SCP (from local machine)
```bash
# Copy all files to server
scp -r dist/* root@13.126.207.62:/usr/share/nginx/html/

# SSH into server and restart nginx
ssh root@13.126.207.62
sudo systemctl restart nginx
```

### Option 2: Manual Upload
1. Zip the dist folder
2. Upload to server
3. Extract and copy to nginx folder:
```bash
cd /tmp
unzip dist.zip
sudo rm -rf /usr/share/nginx/html/*
sudo cp -r dist/* /usr/share/nginx/html/
sudo systemctl restart nginx
```

### Option 3: Using Git (if repo is on server)
```bash
# On server
cd /path/to/travel-app
git pull origin main
npm install
npm run build
sudo rm -rf /usr/share/nginx/html/*
sudo cp -r dist/* /usr/share/nginx/html/
sudo systemctl restart nginx
```

---

## Verify Deployment

1. **Check files copied:**
```bash
ls -la /usr/share/nginx/html/
```

2. **Check nginx status:**
```bash
sudo systemctl status nginx
```

3. **Test in browser:**
- Open: http://13.126.207.62
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Check console for errors

4. **Clear browser cache:**
- Chrome: Settings > Privacy > Clear browsing data
- Or use Incognito mode

---

## Important Changes in Latest Build

✅ **Login Flow:**
- Login redirects to `/dashboard` (not `/profile`)
- Login type validation (USER/TENANT/DISTRIBUTOR)
- Better error messages for 401 errors

✅ **Profile Pages:**
- `/my-account/basic-profile` - Basic info + Address only
- `/my-account/company-details` - Business info + KYC details
- Tenant support added
- Clean UI without debug info

✅ **Modal Styles:**
- Compact modal design
- Smaller padding and max-width
- Form inputs height: 36px

✅ **API Configuration:**
- CORS handling via nginx proxy
- Relative API URLs for production
- Network error handling

---

## Troubleshooting

### Issue: Old UI still showing
**Solution:**
```bash
# Clear nginx cache
sudo rm -rf /var/cache/nginx/*
sudo systemctl restart nginx

# Clear browser cache
# Hard refresh: Ctrl+Shift+R
```

### Issue: 404 errors
**Solution:**
```bash
# Check nginx config
sudo nginx -t

# Verify files exist
ls -la /usr/share/nginx/html/assets/
```

### Issue: API CORS errors
**Solution:**
```bash
# Check nginx.conf is properly configured
sudo cat /etc/nginx/sites-enabled/travelapp

# Restart nginx
sudo systemctl restart nginx
```

---

## Build Info

- **Build Time:** 5.04s
- **Vite Version:** 8.0.8
- **Chunks Created:**
  - react-vendor: 272.60 kB (gzip: 88.37 kB)
  - vendor: 103.27 kB (gzip: 32.37 kB)
  - ui-vendor: 25.58 kB (gzip: 9.49 kB)
  - index: 148.84 kB (gzip: 33.18 kB)

- **Optimizations:**
  - ✅ Minified with Terser
  - ✅ Gzip compression
  - ✅ Brotli compression
  - ✅ Code splitting
  - ✅ Console logs removed
  - ✅ Source maps disabled

---

## Post-Deployment Checklist

- [ ] Files copied to `/usr/share/nginx/html/`
- [ ] Nginx restarted
- [ ] Browser cache cleared
- [ ] Homepage loads correctly
- [ ] Login flow works
- [ ] Profile pages show new UI
- [ ] No console errors
- [ ] API calls working (check Network tab)
