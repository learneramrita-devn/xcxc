import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../schemas/loginSchema';
import { loginUser } from '../../onboarding/tenants/services/onboardingService';
import { useAuth } from '../../../app/providers/AuthContext';
import AuthLayout from '../../onboarding/tenants/components/AuthLayout';
import PasswordInput from '../../onboarding/tenants/components/PasswordInput';
import Toast from '../../../shared/components/Toast';
import SEOMeta from '../../../shared/components/SEOMeta';
import { loginRateLimiter } from '../../../shared/utils/security';
import logo from '@/assets/images/logo.png';

const ADMIN_ROLES = ['TENANT_ADMIN', 'API_PARTNER', 'WHITELABEL_PARTNER', 'SUPER_ADMIN'];

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      loginType: 'user',
      rememberMe: false,
    },
  });

  const showToast = (message, type) => setToast({ message, type });

  const onSubmit = async (formData) => {
    if (!loginRateLimiter.isAllowed(formData.email)) {
      showToast('Too many login attempts. Please try again in 5 minutes.', 'error');
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser({
        mobile: '',
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });

      const payload = JSON.parse(atob(response.accessToken.split('.')[1]));
      const role = payload.role || '';
      const userId = payload.userId || '';
      const tenantId = payload.tenantId || '';

      const success = login(
        response.accessToken,
        response.refreshToken,
        role,
        userId,
        tenantId,
        formData.rememberMe
      );

      if (success) {
        loginRateLimiter.reset(formData.email);
        showToast('Logged in successfully!', 'success');

        setTimeout(() => {
          const from = location.state?.from?.pathname || (ADMIN_ROLES.includes(role) ? '/admin' : '/dashboard');
          navigate(from, { replace: true });
        }, 1000);
      } else {
        showToast('Login failed. Invalid token.', 'error');
      }
    } catch (err) {
      if (err.errCode === '23') {
        showToast('Invalid email or password. Please check your credentials.', 'error');
      } else if (err.errCode === 'DISABLED') {
        showToast('Your account is not activated. Please check your email.', 'error');
      } else if (err.message) {
        showToast(err.message, 'error');
      } else {
        showToast('Login failed. Please try again.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <SEOMeta
        title="Login – Access Your Travel Account – TravelApp"
        description="Login to your TravelApp account to book flights, hotels, and manage your travel bookings."
      />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="trav_form-box">
        <div className="trav_form-header">
          <img src={logo} alt="Logo" />
          <h2 className="trav_form-heading">Welcome Back</h2>
          <p className="trav_form-subheading">Login to your account</p>
        </div>

        <div className="trav_form-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="trav_form-group">
              <label className="form_label">Email Address <span style={{ color: '#E70D0D' }}>*</span></label>
              <input
                type="email"
                {...register('email')}
                placeholder="Enter your email"
                className="form-control"
                autoComplete="email"
              />
              {errors.email && <span style={{ color: '#E70D0D', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.email.message}</span>}
            </div>

            <div className="trav_form-group">
              <label className="form_label">Password <span style={{ color: '#E70D0D' }}>*</span></label>
              <PasswordInput
                {...register('password')}
                placeholder="Enter your password"
                className="form-control"
                autoComplete="current-password"
              />
              {errors.password && <span style={{ color: '#E70D0D', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.password.message}</span>}
            </div>

            <div className="trav_form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
                <input
                  type="checkbox"
                  {...register('rememberMe')}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                Remember me
              </label>
              <Link to="/forgot-password" style={{ fontSize: '14px', color: '#f19517', textDecoration: 'none' }}>
                Forgot Password?
              </Link>
            </div>

            <button className="btn-primary trav-btn" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <div style={{ marginTop: '20px', textAlign: 'center', paddingTop: '20px', borderTop: '1px solid #E5E7EB' }}>
              <span style={{ fontSize: '14px', color: '#6B7280' }}>
                Don't have an account?{' '}
              </span>
              <Link to="/register" style={{ fontSize: '14px', color: '#f19517', textDecoration: 'none', fontWeight: 600 }}>
                Register here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
