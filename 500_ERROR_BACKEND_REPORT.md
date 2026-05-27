# 🔴 500 Internal Server Error - Backend Issue

## Error Details

**Status Code:** 500 Internal Server Error
**Endpoint:** `/ums/v1/tenant/register`
**Method:** POST

---

## What This Means

**500 Internal Server Error** = Backend service crashed or has a bug.

This is **NOT a frontend issue**. The frontend is sending correct data, but the backend is failing to process it.

---

## Common Causes of 500 Error

### 1. NullPointerException
Backend code trying to access a null object.

**Example:**
```java
String name = user.getName(); // If user is null, throws NullPointerException
```

### 2. Database Connection Failed
Backend cannot connect to database.

**Causes:**
- Database is down
- Connection pool exhausted
- Wrong credentials
- Network issue

### 3. Missing Configuration
Backend missing required configuration.

**Examples:**
- Missing environment variables
- Missing application.properties values
- Missing database URL

### 4. Validation Error in Backend
Backend validation throwing exception instead of returning 400.

### 5. Serialization/Deserialization Error
Backend cannot parse the JSON payload.

**Example:**
```java
// Backend expects Date but receives String
private Date dob; // Fails if receives "2026-05-25T17:49:19.600Z"
```

---

## Payload Being Sent (Verified Correct)

```json
{
  "externalUserId": "EXT-USR-1779731359600",
  "role": "AGENT",
  "name": "SIVAY DUBEY",
  "firstName": "Sivay",
  "lastName": "Dubey",
  "email": "sivay@gmail.com",
  "mobile": "8008008000",
  "mobileNumber": "8008008000",
  "passwordHash": "Abcd@123",
  "agentType": "API_PARTNER",
  "status": "ENABLED",
  "userSource": "WEB",
  "tenantType": "API_PARTNER",
  "companyName": "newsroom",
  "tenantProfileInfo": {
    "gdr": "MALE",
    "dob": null,
    "zip": "452001",
    "fn": "SIVAY DUBEY",
    "ln": "Dubey",
    "zd": "indore",
    "co": "India",
    "pi": null,
    "tz": "Asia/Kolkata",
    "language": "EN",
    "lurl": null
  },
  "identityDocuments": {
    "pan": "ABCDE1234F",
    "adr": "662223509284",
    "cin": null,
    "gst": "07ABCDE1234F1Z5"
  },
  "addressInfo": {
    "address": "abc",
    "pinCode": "452001",
    "cityName": "indore",
    "state": "madhya pradesh",
    "country": "India"
  },
  "contactPersonInfo": {
    "name": "Sivay Dubey",
    "mobileNumber": "8008008000",
    "email": "sivay@gmail.com"
  },
  "businessInfo": {
    "bstp": "TRAVEL",
    "bsn": "newsroom",
    "rflcd": "22222"
  },
  "securityInfo": {
    "ip": null,
    "di": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "gl": null
  },
  "kycInfo": {
    "ks": "PENDING",
    "ksa": "2026-05-25T17:49:19.600Z"
  },
  "lifeCycleInfo": {
    "iat": "2026-05-25T17:49:19.600Z",
    "aat": null,
    "sat": null,
    "ovat": null
  }
}
```

✅ All required fields present
✅ Correct data types
✅ Valid format

---

## Backend Developer Action Required

### Step 1: Check Backend Logs

Look for error stack trace in backend logs:

```bash
# For Spring Boot
tail -f logs/application.log

# Or check console output
```

**Look for:**
- `NullPointerException`
- `SQLException`
- `JsonParseException`
- `ConstraintViolationException`
- Any stack trace

### Step 2: Check Database

```sql
-- Check if database is accessible
SELECT 1;

-- Check if tenant table exists
DESCRIBE tenants;

-- Check if all required columns exist
SHOW COLUMNS FROM tenants;
```

### Step 3: Check Service Status

```bash
# Check if service is running
curl http://13.126.207.62:8080/health

# Check if endpoint is accessible
curl -X POST http://13.126.207.62:8080/ums/v1/tenant/register \
  -H "Content-Type: application/json" \
  -d '{"test":"data"}'
```

### Step 4: Test with Minimal Payload

```bash
curl -X POST http://13.126.207.62:8080/ums/v1/tenant/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "test@test.com",
    "mobile": "9999999999",
    "mobileNumber": "9999999999",
    "passwordHash": "Test@123",
    "tenantType": "API_PARTNER",
    "agentType": "API_PARTNER",
    "status": "ENABLED",
    "userSource": "WEB",
    "role": "AGENT",
    "name": "JOHN DOE",
    "externalUserId": "EXT-USR-123"
  }' -v
```

If this also returns 500 → Backend code has a bug
If this works → Issue with specific fields in full payload

---

## Most Likely Issues

### Issue 1: Date Format Problem
```json
"ksa": "2026-05-25T17:49:19.600Z",
"iat": "2026-05-25T17:49:19.600Z"
```

**Backend might expect:**
- Different date format
- LocalDateTime instead of String
- Timestamp instead of ISO format

**Fix in Backend:**
```java
@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
private Date ksa;
```

### Issue 2: Null Values
```json
"dob": null,
"cin": null,
"gst": "07ABCDE1234F1Z5"
```

**Backend might not handle null properly:**
```java
// Wrong
String dob = tenantProfileInfo.getDob();
int length = dob.length(); // NullPointerException if dob is null

// Correct
String dob = tenantProfileInfo.getDob();
if (dob != null) {
  int length = dob.length();
}
```

### Issue 3: Missing @JsonProperty Annotations
```java
// Backend model might have different field names
public class TenantProfileInfo {
  @JsonProperty("fn")
  private String firstName; // Maps "fn" to firstName
  
  @JsonProperty("ln")
  private String lastName; // Maps "ln" to lastName
}
```

### Issue 4: Database Constraint Violation
```sql
-- Check if email/mobile already exists
SELECT * FROM tenants WHERE email = 'sivay@gmail.com';
SELECT * FROM tenants WHERE mobile = '8008008000';
```

If exists → Should return 409 Conflict, not 500

---

## Backend Code to Check

### Controller
```java
@PostMapping("/tenant/register")
public ResponseEntity<?> registerTenant(@RequestBody TenantRequest request) {
  try {
    // Add logging
    log.info("Received tenant registration request: {}", request);
    
    Tenant tenant = tenantService.createTenant(request);
    return ResponseEntity.ok(tenant);
    
  } catch (Exception e) {
    // Log the error
    log.error("Error creating tenant", e);
    
    // Return proper error response
    return ResponseEntity.status(500)
      .body(new ErrorResponse("Internal server error: " + e.getMessage()));
  }
}
```

### Service
```java
public Tenant createTenant(TenantRequest request) {
  // Add null checks
  if (request.getFirstName() == null) {
    throw new ValidationException("First name is required");
  }
  
  // Add logging
  log.info("Creating tenant: {}", request.getEmail());
  
  // Save to database
  Tenant tenant = new Tenant();
  tenant.setFirstName(request.getFirstName());
  // ... set other fields
  
  return tenantRepository.save(tenant);
}
```

---

## Quick Fixes for Backend

### Fix 1: Add Better Error Handling
```java
@PostMapping("/tenant/register")
public ResponseEntity<?> registerTenant(@RequestBody TenantRequest request) {
  try {
    Tenant tenant = tenantService.createTenant(request);
    return ResponseEntity.ok(tenant);
  } catch (NullPointerException e) {
    log.error("Null pointer error", e);
    return ResponseEntity.status(500).body("Null pointer: " + e.getMessage());
  } catch (SQLException e) {
    log.error("Database error", e);
    return ResponseEntity.status(500).body("Database error: " + e.getMessage());
  } catch (Exception e) {
    log.error("Unexpected error", e);
    return ResponseEntity.status(500).body("Error: " + e.getMessage());
  }
}
```

### Fix 2: Add Logging
```java
log.info("Request received: {}", request);
log.info("Saving to database...");
Tenant saved = repository.save(tenant);
log.info("Tenant saved with ID: {}", saved.getId());
```

### Fix 3: Handle Null Values
```java
// Use Optional or null checks
String dob = Optional.ofNullable(request.getTenantProfileInfo())
  .map(TenantProfileInfo::getDob)
  .orElse(null);
```

---

## Summary

### Status: 🔴 500 Internal Server Error

### Cause: Backend service error (NOT frontend)

### Frontend Status: ✅ Correct payload being sent

### Backend Action Required:
1. ⚠️ Check backend logs for error stack trace
2. ⚠️ Check database connection
3. ⚠️ Add proper error handling
4. ⚠️ Add logging to identify exact issue
5. ⚠️ Test with minimal payload
6. ⚠️ Fix the bug and redeploy

### Priority: 🔴 CRITICAL - Blocking all tenant registrations

---

## Test Command for Backend Developer

```bash
curl -X POST http://13.126.207.62:8080/ums/v1/tenant/register \
  -H "Content-Type: application/json" \
  -d @payload.json -v
```

Save the payload to `payload.json` and test.

**Expected:** 200 OK with tenant ID
**Current:** 500 Internal Server Error

---

**Backend developer needs to check logs and fix the service!** 🚀
