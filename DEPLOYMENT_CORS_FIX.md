# CORS Issue Fix - Deployment Instructions

## Problem
CORS error: `Access-Control-Allow-Origin` header missing from backend API responses.

## Solution Options

### Option 1: Fix Backend (RECOMMENDED)
Backend team ko ye headers add karne hain:

**Spring Boot (Java):**
```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins("*")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .exposedHeaders("Authorization")
                    .allowCredentials(false)
                    .maxAge(3600);
            }
        };
    }
}
```

**Node.js/Express:**
```javascript
const cors = require('cors');
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

---

### Option 2: Use Nginx Proxy (TEMPORARY FIX)

1. **Install Nginx** (if not installed):
```bash
sudo apt update
sudo apt install nginx -y
```

2. **Copy nginx.conf** to server:
```bash
sudo cp nginx.conf /etc/nginx/sites-available/travelapp
sudo ln -s /etc/nginx/sites-available/travelapp /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
```

3. **Update frontend build** to use relative URLs:
   - Change API_BASE_URL from `http://13.126.207.62:8080` to empty string `''`
   - This will make API calls to same domain (nginx will proxy to backend)

4. **Deploy frontend** to nginx:
```bash
# Build frontend
npm run build

# Copy to nginx
sudo cp -r dist/* /usr/share/nginx/html/

# Restart nginx
sudo nginx -t
sudo systemctl restart nginx
```

5. **Update .env.production**:
```env
VITE_API_BASE_URL=
VITE_TENANT_ID=1
```

---

### Option 3: Update Environment Variables

If using nginx proxy, update the API base URL to use relative path:

**.env.production:**
```env
VITE_API_BASE_URL=
VITE_FLIGHT_API_BASE_URL=
VITE_TENANT_ID=1
```

Then rebuild:
```bash
npm run build
```

---

## Quick Test

After deployment, test CORS:
```bash
curl -X OPTIONS http://13.126.207.62/ums/v1/users/register \
  -H "Origin: http://13.126.207.62" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v
```

Should return:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
```

---

## Recommended Approach

1. **Short-term:** Use nginx proxy (Option 2)
2. **Long-term:** Fix backend CORS (Option 1)

Backend fix is better because:
- ✅ No extra proxy layer
- ✅ Better performance
- ✅ Easier to maintain
- ✅ Works with any frontend deployment
