// Test script to fetch user data for mobile: 8009009009
// Email registered: sona@gmail.com

const userData = {
  mobile: "8009009009",
  email: "sona@gmail.com",
  registeredAt: "2024-01-15",
  status: "ENABLED",
  
  // Expected user data structure based on registration
  expectedData: {
    mobileNumber: "8009009009",
    email: "sona@gmail.com",
    name: "User Name", // As entered during registration
    role: "AGENT",
    agentType: "AGENCY", // or API_PARTNER, WHITE_LABEL, CORP_PARTNER
    tenantId: 1,
    userStatus: "ENABLED",
    
    // Profile Info
    userProfileInfo: {
      fn: "First Name",
      gdr: "MALE",
      dob: "2000-01-01"
    },
    
    // Business Info
    businessInfo: {
      bsn: "Agency Name",
      bstp: "Firm Type",
      rflcd: "Referral Code"
    },
    
    // Address Info
    addressInfo: {
      address: "Full Address",
      cityName: "City",
      state: "State",
      pinCode: "Pincode",
      country: "India"
    },
    
    // Documents
    userDocuments: {
      pan: "PAN Number",
      adr: "Aadhaar Number",
      gst: "GST Number"
    },
    
    // KYC Info
    kycInfo: {
      ks: "PENDING"
    }
  },
  
  // Login credentials
  loginCredentials: {
    username: "sona@gmail.com", // Email is used as username
    password: "Test#1234", // As set during registration
    tenantId: 1
  },
  
  // API Endpoint to fetch user
  apiEndpoint: "POST /ums/v1/users/list",
  requestBody: {
    userIdList: ["userId"], // Will be returned after login
    // OR
    mobileIn: ["8009009009"]
  }
};

console.log('User Data for Mobile: 8009009009');
console.log(JSON.stringify(userData, null, 2));

// To fetch actual data:
// 1. Login with: sona@gmail.com / Test#1234
// 2. Use the returned userId
// 3. Call: POST /ums/v1/users/list with { userIdList: [userId] }
// 4. Response will contain complete user profile

export default userData;
