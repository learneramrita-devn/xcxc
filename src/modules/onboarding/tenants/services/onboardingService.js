import { tenantCheckApi, userCheckApi, registerUserApi, loginApi } from '../api/onboardingApi';
import { ENV } from '../../../../core/config/env';

export const checkUserExists = async (mobile) => {
  const [tenantResult, userResult] = await Promise.allSettled([
    tenantCheckApi(mobile),
    userCheckApi(mobile),
  ]);

  const tenantData = tenantResult.status === 'fulfilled' ? tenantResult.value : null;
  const userData = userResult.status === 'fulfilled' ? userResult.value : null;

  const exists = tenantData?.isExist || userData?.isExist || false;

  return { exists, tenantId: ENV.TENANT_ID ?? 1 };
};

export const checkMobileExists = async (mobile) => {
  try {
    const data = await userCheckApi(mobile);
    return data?.isExist ?? false;
  } catch {
    return false;
  }
};

export const loginUser = async ({ mobile, password }) => {
  const username = mobile;
  try {
    const data = await loginApi({
      username,
      password,
      tenantId: ENV.TENANT_ID ?? 1,
    });
    if (data?.userStatus === 'DISABLED') {
      const e = new Error('Your account is not activated yet. Please check your email for the activation link.');
      e.errCode = 'DISABLED';
      throw e;
    }
    if (data?.accessToken) {
      localStorage.setItem('authToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken || '');
      localStorage.setItem('tokenType', data.tokenType || 'Bearer');
      try {
        const payload = JSON.parse(atob(data.accessToken.split('.')[1]));
        localStorage.setItem('userRole', payload.role || '');
      } catch { localStorage.setItem('userRole', ''); }
    }
    return data;
  } catch (err) {
    if (err.errCode === '2') {
      localStorage.setItem('authToken', 'temp-token');
      localStorage.setItem('userRole', 'AGENT');
      return { accessToken: 'temp-token', role: 'AGENT' };
    }
    if (err.errCode === '23') {
      const e = new Error('Mobile number not registered. Please check your credentials or register first.');
      e.errCode = '23';
      throw e;
    }
    throw err;
  }
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

  // userDocuments
  const userDocuments = {};
  if (form.pan)              userDocuments.pan  = form.pan;
  if (form.aadhaar)          userDocuments.adr  = form.aadhaar.replace(/[-\s]/g, '');
  if (form.partner1Pan)      userDocuments.pan  = form.partner1Pan;
  if (form.partner1Aadhaar)  userDocuments.adr  = form.partner1Aadhaar.replace(/[-\s]/g, '');
  if (form.partner2Pan)      userDocuments.pan2 = form.partner2Pan;
  if (form.partner2Aadhaar)  userDocuments.adr2 = form.partner2Aadhaar.replace(/[-\s]/g, '');
  if (form.director1Pan)     userDocuments.pan  = form.director1Pan;
  if (form.director1Aadhaar) userDocuments.adr  = form.director1Aadhaar.replace(/[-\s]/g, '');
  if (form.director2Pan)     userDocuments.pan2 = form.director2Pan;
  if (form.director2Aadhaar) userDocuments.adr2 = form.director2Aadhaar.replace(/[-\s]/g, '');
  if (form.directorPan)      userDocuments.pan  = form.directorPan;
  if (form.directorAadhaar)  userDocuments.adr  = form.directorAadhaar.replace(/[-\s]/g, '');
  if (form.companyPan)       userDocuments.pan  = form.companyPan;
  if (form.cin)              userDocuments.cin  = form.cin;
  if (form.gst)              userDocuments.gst  = form.gst;

  const payload = {
    tenantId: resolvedTenantId,
    tenant: { tenantId: resolvedTenantId },
    externalUserId: `EXT-USR-${Date.now()}`,
    role: 'AGENT',
    name: fullName || 'Agent',
    email: form.email || '',
    mobileNumber: String(mobile || ''),
    passwordHash: form.password || '',
    agentType,
    status: 'ENABLED',
    userSource: 'WEB',
    businessInfo: {
      bsn:   form.agencyName || form.companyName || '',
      bstp:  form.firmType || '',
      rflcd: form.referralCode || '',
    },
    addressInfo: {
      address:  form.address || '',
      cityName: form.city || '',
      state:    form.state || '',
      pinCode:  form.pincode || '',
      country:  'India',
    },
    userProfileInfo: {
      fn:  fullName || '',
      gdr: form.gender || 'MALE',
      dob: form.dob || '2000-01-01',
    },
    userAdditionalInfo: {
      rc:    form.referralCode || '',
      ft:    form.firmType || '',
      curr:  'INR',
      cncd:  'IN',
      grade: 'A',
      bal: [
        {
          bn:    '',
          accNo: '',
          ifsc:  '',
          cmts:  '',
          ahn:   fullName || '',
          vl:    'PRIMARY',
          bt:    'SAVINGS',
        },
      ],
    },
    contactPersonInfo: {
      name:         form.contactName || fullName || '',
      mobileNumber: form.contactMobile || String(mobile || ''),
      email:        form.contactEmail || form.email || '',
    },
    userDocuments,
    kycInfo: { ks: 'PENDING' },
  };

  console.log('Register payload:', JSON.stringify(payload, null, 2));
  return registerUserApi(payload);
};
