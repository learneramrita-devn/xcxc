import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/onboardingService';
import { useAuth } from '../../../../app/providers/AuthContext';
import PasswordInput from '../components/PasswordInput';

const ADMIN_ROLES = ['TENANT_ADMIN', 'API_PARTNER', 'WHITELABEL_PARTNER', 'SUPER_ADMIN'];

const PasswordStep = ({ prevStep, onToast, mobile }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      if (ADMIN_ROLES.includes(role)) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      if (err.errCode === '2') {
        login('temp-token', '', 'AGENT');
        navigate('/');
      } else {
        onToast(err.message || 'Invalid credentials. Please try again.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {mobile && (
        <div className="trav_form-group">
          <label className="form_label">Mobile Number</label>
          <div className="mobile_input" style={{ background: '#f9fafb' }}>
            <div className="country">
              <img src="https://flagcdn.com/w40/in.png" alt="India" />
              <span>+91</span>
            </div>
            <input type="tel" value={mobile} readOnly style={{ background: 'transparent', color: '#6B7280' }} />
          </div>
        </div>
      )}

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
