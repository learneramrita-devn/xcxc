# Backend Team - Urgent Message

## 🚨 CRITICAL ISSUE: Registration Endpoint Blocked

### Problem
Registration endpoint `/api/v1/users/create` returning **401 Unauthorized** error since today.

### Impact
- ❌ **All new user registrations blocked**
- ❌ **No new customers can sign up**
- ❌ **Business completely stopped for new users**

### What's Working
- ✅ Login: `/ums/v1/auth/login` - 200 OK
- ✅ User Check: `/ums/v1/users/user-check` - 200 OK

### What's Broken
- ❌ Registration: `/api/v1/users/create` - 401 Unauthorized
- ❌ Registration: `/ums/v1/users/create` - 401 Unauthorized

### Timeline
- **Before Today**: Registration working perfectly from frontend form
- **Today**: Started getting 401 error
- **Suspected Cause**: Security configuration change in backend

### Required Fix

Please add registration endpoints back to `permitAll()` list in Spring Security:

```java
@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(auth -> auth
            // These are already public (working):
            .requestMatchers("/ums/v1/auth/login").permitAll()
            .requestMatchers("/ums/v1/users/user-check").permitAll()
            .requestMatchers("/ums/v1/tenant/tenant-check").permitAll()
            
            // ⚠️ PLEASE ADD THESE:
            .requestMatchers("/api/v1/users/create").permitAll()
            .requestMatchers("/ums/v1/users/create").permitAll()
            
            .anyRequest().authenticated()
        );
        return http.build();
    }
}
```

### Why This is Critical
New users cannot register without authentication token, but they need to register first to get a token. This is a circular dependency.

Registration endpoints MUST be public (no authentication required).

### Test Command
After fix, this should return 200/201 (not 401):

```bash
curl -X POST http://13.126.207.62:8080/api/v1/users/create \
  -H "Content-Type: application/json" \
  -d '{
    "tenant": {"tenantId": 1},
    "name": "Test User",
    "email": "test@test.com",
    "mobileNumber": "9999999999",
    "passwordHash": "Test@123",
    "role": "AGENT",
    "agentType": "AGENCY",
    "status": "ENABLED",
    "userSource": "WEB"
  }'
```

### Priority
🔴 **P0 - CRITICAL**

### ETA Required
**ASAP** - Every minute, potential customers are unable to register.

---

**Frontend Team Status**: ✅ Ready (no changes needed on our side)
**Backend Team Action**: ⚠️ Required (add endpoints to permitAll)
