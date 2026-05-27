import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../../../modules/auth/schemas/loginSchema';
import { loginUser } from '../services/onboardingService';
import { useAuth } from '../../../../app/providers/AuthContext';
import PasswordInput from '../components/PasswordInput';
import { loginRateLimiter } from '../../../../shared/utils/security';

const ADMIN_ROLES = ['TENANT_ADMIN', 'API_PARTNER', 'WHITELABEL_PARTNER', 'SUPER_ADMIN'];

const LOGIN_TYPES = [
  { value: 'USER', label: 'User' },
  { value: 'TENANT', label: 'Tenant' },
  { value: 'DISTRIBUTOR', label: 'Distributor' },
];

const PasswordStep = ({ prevStep, onToast, mobile, loginType: initialLoginType = 'USER' }) => {
  const [loginType, setLoginType] = useState(initialLoginType);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
      loginType: initialLoginType,
    },
  });

  const onSubmit = async (formData) => {
    if (!loginRateLimiter.isAllowed(formData.email)) {
      onToast('Too many login attempts. Please try again in 5 minutes.', 'error');
      return;
    }

    setLoading(true);
    
    try {
      console.log('🔐 Login Attempt:', {
        mobile,
        email: formData.email,
        loginType,
        hasPassword: !!formData.password
      });
      
      const response = await loginUser({
        mobile: mobile,
        email: formData.email,
        password: formData.password,
        rememberMe: false,
        loginType: loginType,
      });
      
      console.log('✅ Login Response:', response);
      
      if (!response.accessToken) {
        onToast('Login failed. No access token received.', 'error');
        return;
      }
      
      const payload = JSON.parse(atob(response.accessToken.split('.')[1]));
      console.log('🎫 JWT Payload:', payload);
      
      // Validate login type matches the response
      const isTenantRole = ['TENANT_ADMIN', 'API_PARTNER', 'WHITELABEL_PARTNER', 'SUPER_ADMIN'].includes(payload.role);
      const isUserRole = ['AGENT', 'USER', 'DISTRIBUTOR'].includes(payload.role);
      
      if (loginType === 'TENANT' && !isTenantRole) {
        onToast('Invalid credentials. This account is not a Tenant account.', 'error');
        return;
      }
      
      if (loginType === 'USER' && !isUserRole) {
        onToast('Invalid credentials. This account is not a User account.', 'error');
        return;
      }
      
      if (loginType === 'DISTRIBUTOR' && payload.role !== 'DISTRIBUTOR') {
        onToast('Invalid credentials. This account is not a Distributor account.', 'error');
        return;
      }
      
      const role = payload.role || '';
      const userId = payload.userId || '';
      const tenantId = payload.tenantId || '';
      
      const success = login(
        response.accessToken,
        response.refreshToken,
        role,
        userId,
        tenantId,
        false
      );
      
      if (success) {
        loginRateLimiter.reset(formData.email);
        onToast('Logged in successfully!', 'success');
        
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 1000);
      } else {
        onToast('Login failed. Invalid token.', 'error');
      }
    } catch (err) {
      console.error('❌ Login Error:', {
        message: err.message,
        status: err.status,
        errCode: err.errCode,
        fullError: err
      });
      
      if (err.errCode === 'MOBILE_MISMATCH') {
        onToast(err.message, 'error');
      } else if (err.errCode === '23') {
        onToast('Invalid email or password. Please check your credentials.', 'error');
      } else if (err.errCode === 'DISABLED') {
        onToast('Your account is not activated. Please check your email.', 'error');
      } else if (err.errCode === 'NETWORK_ERROR') {
        onToast('Network error. Please check your internet connection.', 'error');
      } else if (err.status === 401) {
        onToast('Invalid email or password. Please verify your credentials and login type.', 'error');
      } else if (err.status === 403) {
        onToast('Access denied. Please check your account status.', 'error');
      } else if (err.status === 404) {
        onToast('Account not found. Please check your credentials or register first.', 'error');
      } else if (err.message) {
        onToast(err.message, 'error');
      } else {
        onToast('Login failed. Please try again.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Login Type Radio Buttons */}
      <div className="trav_form-group" style={{ display: 'flex', gap: '20px', marginTop: '4px' }}>
        {LOGIN_TYPES.map(({ value, label }) => (
          <label key={value} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '14px', color: '#000' }}>
            <span style={{
              width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0,
              border: `2px solid ${loginType === value ? '#f19517' : '#5A5F64'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {loginType === value && (
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f19517' }} />
              )}
            </span>
            <input
              type="radio"
              value={value}
              checked={loginType === value}
              onChange={() => setLoginType(value)}
              style={{ display: 'none' }}
            />
            {label}
          </label>
        ))}
      </div>

      <div className="trav_form-group">
        <label className="form_label">Email Address <span style={{ color: '#E70D0D' }}>*</span></label>
        <input
          type="email"
          {...register('email')}
          placeholder="Enter your registered email"
          className="form-control"
          autoComplete="email"
        />
        {errors.email && <span style={{ color: '#E70D0D', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.email.message}</span>}
      </div>

      <div className="trav_form-group">
        <label className="form_label">Password <span style={{ color: '#E70D0D' }}>*</span></label>
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            placeholder="Enter your password"
            className="form-control"
            autoComplete="current-password"
            style={{ paddingRight: '40px' }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {showPassword ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5A5F64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5A5F64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
          </button>
        </div>
        {errors.password && <span style={{ color: '#E70D0D', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.password.message}</span>}
      </div>

      <button className="btn-primary trav-btn" type="submit" disabled={loading}>
        {loading ? 'Verifying...' : 'Login'}
      </button>

      <div className="trav_form-footer">
        <span className="btn-back-link" onClick={prevStep} style={{ cursor: 'pointer' }}>Back</span>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link to="/forgot-password" className="btn-link" style={{ cursor: 'pointer', color: '#f19517', textDecoration: 'none' }}>
            Forgot Password
          </Link>
        </div>
      </div>
    </form>
  );
};

export default PasswordStep;
