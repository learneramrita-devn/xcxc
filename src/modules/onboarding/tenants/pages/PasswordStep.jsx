import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/onboardingService';
import { useAuth } from '../../../../app/providers/AuthContext';
import PasswordInput from '../components/PasswordInput';

const ADMIN_ROLES = ['TENANT_ADMIN', 'API_PARTNER', 'WHITELABEL_PARTNER', 'SUPER_ADMIN'];

const LOGIN_TYPES = [
  { value: 'user', label: 'User' },
  { value: 'tenant', label: 'Tenant' },
  { value: 'distributor', label: 'Distributor' },
];

const PasswordStep = ({ prevStep, onToast, mobile, loginType: initialLoginType = 'user' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState(initialLoginType);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validate = () => {
    const errs = {};
    if (!email || !/\S+@\S+\.\S+/.test(email)) errs.email = 'Please enter a valid email address';
    if (!password) errs.password = 'Please enter your password';
    return errs;
  };

  const handleContinue = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      await loginUser({ mobile: email, password });
      const role = localStorage.getItem('userRole') || '';
      login(localStorage.getItem('authToken'), localStorage.getItem('refreshToken'), role);
      onToast('Logged in successfully!', 'success');
      setTimeout(() => {
        if (ADMIN_ROLES.includes(role)) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }, 1000);
    } catch (err) {
      if (err.errCode === '2') {
        login('temp-token', '', 'AGENT');
        onToast('Logged in successfully!', 'success');
        setTimeout(() => navigate('/'), 1000);
      } else {
        onToast(err.message || 'Invalid credentials. Please try again.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>


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
            <input type="radio" name="loginType" value={value} checked={loginType === value} onChange={() => setLoginType(value)} style={{ display: 'none' }} />
            {label}
          </label>
        ))}
      </div>

      <div className="trav_form-group">
        <label className="form_label">Email Address <span style={{ color: '#E70D0D' }}>*</span></label>
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })); }}
          placeholder="Enter your registered email"
          className="form-control"
        />
        {errors.email && <span style={{ color: '#E70D0D', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
      </div>

      <div className="trav_form-group">
        <label className="form_label">Password <span style={{ color: '#E70D0D' }}>*</span></label>
        <PasswordInput
          name="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: '' })); }}
          placeholder="Enter your password"
          className="form-control"
        />
        {errors.password && <span style={{ color: '#E70D0D', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.password}</span>}
      </div>

      <button className="btn-primary trav-btn" onClick={handleContinue} disabled={loading}>
        {loading ? 'Verifying...' : 'Login'}
      </button>

      <div className="trav_form-footer">
        <span className="btn-back-link" onClick={prevStep} style={{ cursor: 'pointer' }}>Back</span>
        <span className="btn-link" style={{ cursor: 'pointer', color: '#f19517' }}>Forgot Password</span>
      </div>
    </>
  );
};

export default PasswordStep;
