import { userCheckApi, registerUserApi, loginApi } from '../api/onboardingApi';
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

export const checkMobileExists = async (mobile) => {
  try {
    const data = await userCheckApi(mobile);
    return data?.isExist ?? false;
  } catch {
    return false;
  }
};

export const loginUser = async ({ mobile, password }) => {
  try {
    const data = await loginApi({
      username: mobile,
      password,
      tenantId: ENV.TENANT_ID ?? 1,
    });
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
    // errCode 2 = account exists but disabled — treat as success temporarily
    if (err.errCode === '2') {
      localStorage.setItem('authToken', 'temp-token');
      localStorage.setItem('userRole', 'AGENT');
      return { accessToken: 'temp-token', role: 'AGENT' };
    }
    // errCode 23 = user not registered with this tenant
    if (err.errCode === '23') {
      const e = new Error('Mobile number not registered. Please check your credentials or register first.');
      e.errCode = '23';
      throw e;
    }
    throw err;
  }
};

export const registerUser = async ({ mobile, tenantId, form, registrationType }) => {
  const fullName = `${form.firstName} ${form.lastName}`.trim();
  console.log('tenantId received:', tenantId);

  const agentTypeMap = {
    api_partner: 'API_PARTNER',
    whitelabel:  'WHITE_LABEL',
    agency:      'AGENCY',
    corporate:   'CORP_PARTNER',
  };

  // if came from Login/Signup, use selectedAgentType from form
  const resolvedType = form.selectedAgentType || registrationType;
  const role      = 'SUB_ADMIN';
  const agentType = agentTypeMap[resolvedType] || 'AGENCY';

  const businessName = form.agencyName || form.companyName || form.brandName || '';
  const resolvedTenantId = tenantId ?? ENV.TENANT_ID ?? 1;

  const payload = {
    tenantId: resolvedTenantId,
    externalUserId: `EXT-USR-${Date.now()}`,
    role: role,
    name: fullName || 'Agent',
    email: form.email || '',
    mobileNumber: String(mobile || ''),
    passwordHash: form.password || '',
    agentType: agentType,
    status: 'ENABLED',
    userSource: 'WEB',
  };

  console.log('Register payload:', JSON.stringify(payload));
  return registerUserApi(payload);
};
