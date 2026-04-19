import { userCheckApi, registerUserApi } from '../api/onboardingApi';
import { ENV } from '../../../../core/config/env';

export const checkUserExists = async (mobile) => {
  try {
    const data = await userCheckApi(mobile);
    console.log('user-check response:', data);
    const tenantId =
      data?.tenantId ??
      data?.tenant?.tenantId ??
      data?.data?.tenantId ??
      ENV.TENANT_ID ??
      null;
    return { exists: data?.exists ?? false, tenantId };
  } catch (err) {
    if (err.status === 500) return { exists: false, tenantId: ENV.TENANT_ID ?? null };
    throw err;
  }
};

export const registerUser = async ({ mobile, tenantId, form, registrationType }) => {
  const fullName = `${form.firstName} ${form.lastName}`.trim();
  console.log('tenantId received:', tenantId);

  const roleMap = {
    api_partner: 'API_PARTNER',
    whitelabel:  'WHITELABEL_PARTNER',
    agency:      'SUB_ADMIN',
  };
  const agentTypeMap = {
    api_partner: 'API_PARTNER',
    whitelabel:  'WHITELABEL',
    agency:      form.agentType === 'Retailer' ? 'INDIVIDUAL' : 'DISTRIBUTOR',
  };

  const role      = roleMap[registrationType]      || 'SUB_ADMIN';
  const agentType = agentTypeMap[registrationType] || 'INDIVIDUAL';

  const businessName = form.agencyName || form.companyName || form.brandName || '';
  const resolvedTenantId = tenantId ?? ENV.TENANT_ID ?? 1;

  const payload = {
    tenantId: resolvedTenantId,
    externalUserId: `EXT-USR-${Date.now()}`,
    role: role,
    name: fullName,
    email: form.email,
    mobileNumber: mobile,
    passwordHash: form.password || '',
    agentType: agentType,
    status: 'ENABLED',
    userSource: 'WEB',

    userAdditionalInfo: {
      rc: form.referralCode || '',
      rfb: 'SYSTEM',
      grade: 'A',
      ft: 'PRIVATE',
      firmType: form.firmType || 'Proprietor',
      bal: [
        {
          bn: '',
          accNo: '',
          ifsc: '',
          cmts: '',
          ahn: fullName,
          vl: 'PRIMARY',
          bt: 'SAVINGS',
        },
      ],
      ael: [],
      cncd: 'IN',
      curr: 'INR',
    },

    userProfileInfo: {
      gdr: 'MALE',
      dob: '2000-01-01',
      zip: form.pincode || '',
      fn: fullName,
      zd: form.city || '',
      co: '',
      pi: '',
      tz: 'Asia/Kolkata',
      language: 'EN',
      lurl: '',
    },

    userDocuments: {
      pan: form.pan || form.directorPan || form.director1Pan || form.companyPan || '',
      adr: form.aadhaar || form.directorAadhaar || form.director1Aadhaar || '',
      pspt: '',
      gst: form.gst || '',
      cin: form.cin || '',
    },

    addressInfo: {
      address: form.address || '',
      pinCode: form.pincode || '',
      cityName: form.city || '',
      state: form.state || '',
      country: 'India',
    },

    contactPersonInfo: {
      name: '',
      mobileNumber: '',
      email: '',
    },

    businessInfo: {
      bstp: 'TRAVEL',
      bsn: businessName,
      rflcd: form.referralCode || '',
    },

    securityInfo: {
      ip: '',
      di: '',
      gl: '',
    },

    kycInfo: {
      ks: 'PENDING',
      ksa: new Date().toISOString().slice(0, 19),
    },

    lifeCycleInfo: {
      iat: new Date().toISOString().slice(0, 19),
      aat: new Date().toISOString().slice(0, 19),
      sat: null,
      ovat: new Date().toISOString().slice(0, 19),
    },
  };

  return registerUserApi(payload);
};
