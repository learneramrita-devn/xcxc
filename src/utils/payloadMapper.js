export const createRegistrationPayload = (formData) => ({
  tenant: { tenantId: 1 },
  externalUserId: `EXT-USR-${Date.now()}`,
  role: formData.role || "AGENT",
  name: formData.name.toUpperCase(),
  email: formData.email,
  mobileNumber: formData.mobileNumber,
  passwordHash: formData.password,
  agentType: formData.agentType || "INDIVIDUAL",
  status: "ENABLED",
  userSource: "WEB",
  userAdditionalInfo: {
    rc: formData.referralCode || "",
    rfb: "SYSTEM",
    grade: "A",
    ft: formData.firmType || "PRIVATE",
    bal: formData.bankDetails ? [{
      bn: formData.bankDetails.bankName || "",
      accNo: formData.bankDetails.accountNumber || "",
      ifsc: formData.bankDetails.ifsc || "",
      cmts: formData.bankDetails.comments || "",
      ahn: formData.name.toUpperCase(),
      vl: "PRIMARY",
      bt: "SAVINGS"
    }] : [],
    ael: formData.alternateEmails || [],
    cncd: "IN",
    curr: "INR"
  },
  userProfileInfo: {
    gdr: formData.gender || "MALE",
    dob: formData.dob || "",
    zip: formData.pinCode || "",
    fn: formData.name.toUpperCase(),
    zd: formData.city || "",
    co: formData.careOf || "",
    pi: formData.profileImage || "",
    tz: "Asia/Kolkata",
    language: "EN",
    lurl: formData.logoUrl || ""
  },
  userDocuments: {
    pan: formData.pan || "",
    adr: formData.aadhaar || "",
    pspt: formData.passport || "",
    gst: formData.gst || ""
  },
  addressInfo: {
    address: formData.address || "",
    pinCode: formData.pinCode || "",
    cityName: formData.city || "",
    state: formData.state || "",
    country: "India"
  },
  contactPersonInfo: {
    name: formData.contactPerson?.name || formData.name,
    mobileNumber: formData.contactPerson?.mobile || formData.mobileNumber,
    email: formData.contactPerson?.email || formData.email
  },
  businessInfo: {
    bstp: "TRAVEL",
    bsn: formData.businessName || "",
    rflcd: formData.businessReferralCode || ""
  },
  securityInfo: {
    ip: "",
    di: navigator.userAgent,
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
});
