const payload = {
  tenant: { tenantId: 1 },
  externalUserId: "EXT-USR-" + Date.now(),
  role: "AGENT",
  name: "TEST USER",
  email: "test" + Date.now() + "@example.com",
  mobileNumber: "9999999999",
  passwordHash: "Test@123",
  agentType: "AGENCY",
  status: "ENABLED",
  userSource: "WEB",
  userAdditionalInfo: {
    rc: "",
    rfb: "SYSTEM",
    grade: "A",
    ft: "PRIVATE",
    bal: [{
      bn: "",
      accNo: "",
      ifsc: "",
      cmts: "",
      ahn: "TEST USER",
      vl: "PRIMARY",
      bt: "SAVINGS"
    }],
    ael: [],
    cncd: "IN",
    curr: "INR"
  },
  userProfileInfo: {
    gdr: "MALE",
    dob: "1995-01-01",
    zip: "110001",
    fn: "TEST USER",
    zd: "Delhi",
    co: "",
    pi: "",
    tz: "Asia/Kolkata",
    language: "EN",
    lurl: ""
  },
  userDocuments: {
    pan: "ABCDE1234F",
    adr: "123412341234"
  },
  addressInfo: {
    address: "Test Address",
    pinCode: "110001",
    cityName: "Delhi",
    state: "Delhi",
    country: "India"
  },
  contactPersonInfo: {
    name: "TEST USER",
    mobileNumber: "9999999999",
    email: "test@example.com"
  },
  businessInfo: {
    bstp: "TRAVEL",
    bsn: "Test Agency",
    rflcd: ""
  },
  securityInfo: {
    ip: "",
    di: "curl-test",
    gl: ""
  },
  kycInfo: {
    ks: "PENDING",
    ksa: new Date().toISOString()
  },
  lifeCycleInfo: {
    iat: new Date().toISOString(),
    aat: null,
    sat: null,
    ovat: null
  }
};

console.log(JSON.stringify(payload));
