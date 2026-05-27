import { tenantCheckApi, userCheckApi, registerUserApi, registerTenantApi, loginApi } from '../api/onboardingApi';
import { ENV } from '../../../../core/config/env';
import { storeTokens, storeUserMetadata, getDeviceInfo } from '../../../../shared/utils/tokenStorage';
import { sanitizeInput } from '../../../../shared/utils/security';
import { loginDebouncer } from '../../../../shared/utils/requestDebouncer';

export const checkUserExists = async (mobile) => {
  let userExists = false;
  let tenantExists = false;
  let userData = null;
  
  // Check user table
  try {
    const userResponse = await userCheckApi(mobile);
    console.log('User Check Response:', userResponse);
    userExists = userResponse?.isExist === true || userResponse?.isExist === 'true' || userResponse?.isExist === 1;
    if (userExists) {
      userData = userResponse;
    }
  } catch (error) {
    console.log('User check error:', error.message);
  }
  
  // Check tenant table
  try {
    const tenantResponse = await tenantCheckApi(mobile);
    console.log('Tenant Check Response:', tenantResponse);
    tenantExists = tenantResponse?.isExist === true || tenantResponse?.isExist === 'true' || tenantResponse?.isExist === 1;
    if (tenantExists && !userData) {
      userData = tenantResponse;
    }
  } catch (error) {
    console.log('Tenant check error:', error.message);
  }
  
  const exists = userExists || tenantExists;
  console.log('Final result - User exists:', userExists, 'Tenant exists:', tenantExists, 'Overall exists:', exists);
  return { exists, tenantId: ENV.TENANT_ID ?? 1, userData };
};

export const checkMobileExists = async (mobile) => {
  try {
    const data = await userCheckApi(mobile);
    return data?.isExist ?? false;
  } catch {
    return false;
  }
};

export const loginUser = async ({ mobile, password, email, rememberMe = false, loginType = 'USER' }) => {
  const sanitizedMobile = mobile ? sanitizeInput(mobile) : '';
  const sanitizedEmail = email ? sanitizeInput(email) : '';
  const username = sanitizedEmail || sanitizedMobile;
  
  if (!username) {
    throw new Error('Email or mobile number is required');
  }
  
  if (!password) {
    throw new Error('Password is required');
  }
  
  const deviceInfo = getDeviceInfo();
  const loginKey = `login_${username}`;
  
  return loginDebouncer.execute(loginKey, async () => {
    try {
      console.log('=== LOGIN API CALL ===');
      console.log('Username:', username);
      console.log('Login Type:', loginType);
      
      const loginPayload = {
        username,
        password,
        loginType,
        deviceId: deviceInfo.deviceId,
        deviceInfo: {
          browser: deviceInfo.browser,
          os: deviceInfo.os,
          isMobile: deviceInfo.isMobile,
        },
      };
      
      // Add tenantId only for USER login
      if (loginType === 'USER') {
        loginPayload.tenantId = ENV.TENANT_ID ?? 1;
      }
      
      console.log('Login Payload:', loginPayload);
      
      const data = await loginApi(loginPayload);
      
      console.log('=== LOGIN API RESPONSE ===');
      console.log('Response:', data);
      
      if (data?.userStatus === 'DISABLED') {
        const e = new Error('Your account is not activated yet. Please check your email for the activation link.');
        e.errCode = 'DISABLED';
        throw e;
      }
      
      const apiMobile = String(data?.mobileNumber || '').trim();
      const enteredMobile = String(sanitizedMobile || '').trim();
      
      if (apiMobile && enteredMobile && apiMobile !== enteredMobile && !apiMobile.endsWith(enteredMobile) && !enteredMobile.endsWith(apiMobile)) {
        const e = new Error(`This email is registered with mobile ${apiMobile}, but you entered ${enteredMobile}. Please use the correct mobile number.`);
        e.errCode = 'MOBILE_MISMATCH';
        throw e;
      }
      
      if (data?.accessToken) {
        storeTokens(data.accessToken, data.refreshToken || '', rememberMe);
        
        try {
          const payload = JSON.parse(atob(data.accessToken.split('.')[1]));
          storeUserMetadata(payload.userId, payload.role, payload.tenantId);
        } catch (e) {
          console.error('Failed to parse token:', e);
        }
      }
      
      return data;
    } catch (err) {
      console.error('=== LOGIN API ERROR ===');
      console.error('Error:', err);
      console.error('Status:', err.status);
      console.error('Error Code:', err.errCode);
      console.error('Message:', err.message);
      
      if (err.errCode === '23') {
        const e = new Error('Invalid email or password. Please check your credentials.');
        e.errCode = '23';
        throw e;
      }
      throw err;
    }
  }, 500);
};

export const registerUser = async ({ mobile, tenantId = ENV.TENANT_ID ?? 1, form, registrationType }) => {
  const fullName = `${form.firstName || ''} ${form.lastName || ''}`.trim();

  const agentTypeMap = {
    api_partner: 'API_PARTNER',
    whitelabel:  'WHITE_LABEL',
    agency:      'AGENCY',
    corporate:   'CORP_PARTNER',
  };

  const resolvedType = form.selectedAgentType || registrationType;
  const agentType = agentTypeMap[resolvedType] || 'AGENCY';
  const resolvedTenantId = Number(tenantId ?? ENV.TENANT_ID ?? 1);
  const isTenantRegistration = ['api_partner', 'whitelabel', 'corporate'].includes(resolvedType);

  // userDocuments
  const userDocuments = {};
  const cleanAadhaar = (val) => val ? String(val).replace(/[-\s]/g, '') : '';

  if (form.pan)              userDocuments.pan  = form.pan;
  if (form.aadhaar)          userDocuments.adr  = cleanAadhaar(form.aadhaar);
  
  // Only overwrite if these exist (prioritize specific fields if present)
  if (form.partner1Pan)      userDocuments.pan  = form.partner1Pan;
  if (form.partner1Aadhaar)  userDocuments.adr  = cleanAadhaar(form.partner1Aadhaar);
  if (form.partner2Pan)      userDocuments.pan2 = form.partner2Pan;
  if (form.partner2Aadhaar)  userDocuments.adr2 = cleanAadhaar(form.partner2Aadhaar);
  
  if (form.director1Pan)     userDocuments.pan  = form.director1Pan;
  if (form.director1Aadhaar) userDocuments.adr  = cleanAadhaar(form.director1Aadhaar);
  if (form.director2Pan)     userDocuments.pan2 = form.director2Pan;
  if (form.director2Aadhaar) userDocuments.adr2 = cleanAadhaar(form.director2Aadhaar);
  
  if (form.directorPan)      userDocuments.pan  = form.directorPan;
  if (form.directorAadhaar)  userDocuments.adr  = cleanAadhaar(form.directorAadhaar);
  
  if (form.companyPan)       userDocuments.pan  = form.companyPan;
  if (form.cin)              userDocuments.cin  = form.cin;
  if (form.gst)              userDocuments.gst  = form.gst;

  // Build base payload
  const basePayload = {
    externalUserId: `EXT-USR-${Date.now()}`,
    role: 'AGENT',
    firstName: form.firstName || '',
    lastName: form.lastName || '',
    email: form.email || '',
    mobileNumber: String(mobile || ''),
    passwordHash: form.password || '',
    agentType,
    status: 'ENABLED',
    userSource: 'WEB',
  };

  // For tenant registration, add tenant-specific fields
  if (isTenantRegistration) {
    const tenantPayload = {
      tenantType: 'BUSINESS',
      tenantStatus: 'ENABLED',
      companyName: form.companyName || form.agencyName || '',
      firstName: form.firstName || '',
      lastName: form.lastName || '',
      email: form.email || '',
      mobile: String(mobile || ''),
      password: form.password || '',
      tenantAdditionalInfo: {
        rc: form.referralCode || '',
        aud: 0,
        iaad: false,
        iev: false,
        imv: false,
        notes: ''
      },
      kycDetails: {
        firmType: form.firmType || 'PRIVATE_LIMITED',
        gst: form.gst || '',
        pan: form.pan || '',
        aadhaar: form.aadhaar ? form.aadhaar.replace(/[-\s]/g, '') : '',
        companyPan: form.companyPan || '',
        cin: form.cin || ''
      },
      addressDetails: {
        address: form.address || '',
        pinCode: form.pincode || '',
        cityName: form.city || '',
        state: form.state || '',
        country: 'India'
      },
      callbackUrls: {
        paymentSuccess: '',
        paymentFailure: ''
      },
      tenantSecurityInfo: {
        ip: '',
        ipwl: [],
        di: navigator.userAgent,
        gl: 'India',
        lati: 0,
        longi: 0
      },
      tenantProfileInfo: {
        gdr: form.gender || 'MALE',
        dob: form.dob || new Date(new Date().setFullYear(new Date().getFullYear() - 25)).toISOString().split('T')[0],
        zip: form.pincode || '',
        fn: fullName || '',
        zd: form.city || '',
        co: '',
        pi: '',
        tz: 'Asia/Kolkata',
        lang: 'en',
        lurl: '',
        dom: ''
      },
      bankAccountInfo: {
        bn: form.bankName || '',
        accNo: form.accountNumber || '',
        ifsc: form.ifsc || '',
        cmts: '',
        ahn: form.companyName || form.agencyName || '',
        vl: 'ACTIVE',
        bt: 'CURRENT'
      },
      identityDocuments: [{
        pan: form.pan || form.companyPan || '',
        adr: form.aadhaar ? form.aadhaar.replace(/[-\s]/g, '') : '',
        pspt: '',
        gst: form.gst || ''
      }],
      agencies: []
    };

    const response = await registerTenantApi(tenantPayload);
    return response;
  }

  // For user registration (Travel Agent)
  const payload = {
    tenant: { tenantId: resolvedTenantId },
    ...basePayload,
    userAdditionalInfo: {
      rc: form.referralCode || '',
      rfb: 'SYSTEM',
      grade: 'A',
      ft: form.firmType || 'PRIVATE',
      bal: [{
        bn: '',
        accNo: '',
        ifsc: '',
        cmts: '',
        ahn: (fullName || '').toUpperCase(),
        vl: 'PRIMARY',
        bt: 'SAVINGS'
      }],
      ael: [],
      cncd: 'IN',
      curr: 'INR'
    },
    userProfileInfo: {
      gdr: form.gender || 'MALE',
      dob: form.dob || '1990-01-01', // Ensure valid date string
      zip: form.pincode || '',
      fn: (fullName || '').toUpperCase(),
      zd: form.city || '',
      co: '',
      pi: '',
      tz: 'Asia/Kolkata',
      language: 'EN',
      lurl: ''
    },
    userDocuments,
    addressInfo: {
      address: form.address || '',
      pinCode: form.pincode || '',
      cityName: form.city || '',
      state: form.state || '',
      country: 'India'
    },
    contactPersonInfo: {
      name: form.contactName || fullName || '',
      mobileNumber: form.contactMobile || String(mobile || ''),
      email: form.contactEmail || form.email || ''
    },
    businessInfo: {
      bstp: 'TRAVEL',
      bsn: form.agencyName || form.companyName || '',
      rflcd: form.referralCode || ''
    },
    securityInfo: {
      ip: '',
      di: navigator.userAgent,
      gl: ''
    },
    kycInfo: {
      ks: 'PENDING',
      ksa: new Date().toISOString()
    },
    lifeCycleInfo: {
      iat: new Date().toISOString(),
      aat: null,
      sat: null,
      ovat: null
    }
  };

  try {
    const response = await registerUserApi(payload);
    return response;
  } catch (error) {
    let userMessage = 'Registration failed. ';
    
    if (error.status === 500) {
      userMessage += 'Backend service error. Please contact support.';
    } else if (error.status === 400) {
      userMessage += 'Invalid data. Please check all fields.';
    } else if (error.status === 409) {
      userMessage += 'User already exists with this email or mobile.';
    } else if (error.message) {
      userMessage += error.message;
    } else {
      userMessage += 'Please try again later.';
    }
    
    const enhancedError = new Error(userMessage);
    enhancedError.status = error.status;
    enhancedError.errCode = error.errCode;
    enhancedError.originalError = error;
    
    throw enhancedError;
  }
};
