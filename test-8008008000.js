# Test Script for 8008008000

## Check if tenant/user exists

```javascript
// Run in browser console

// Test 1: Check User
fetch('http://localhost:8080/ums/v1/users/user-check', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ mobileIn: ['8008008000'] })
})
.then(r => r.json())
.then(d => console.log('User Check:', d));

// Test 2: Check Tenant
fetch('http://localhost:8080/ums/v1/tenant/tenant-check', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ mobileIn: ['8008008000'] })
})
.then(r => r.json())
.then(d => console.log('Tenant Check:', d));
```
