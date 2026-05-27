import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../../../shared/components/Toast';
import { userForgotPasswordApi, tenantForgotPasswordApi } from '../api/forgotPasswordApi';
import './_forgotPassword.scss';

const USER_TYPES = [
  { value: 'USER', label: 'User' },
  { value: 'TENANT', label: 'Tenant' },
];

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('USER');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type) => setToast({ message, type });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    setLoading(true);
    try {
      if (userType === 'TENANT') {
        await tenantForgotPasswordApi(email);
      } else {
        await userForgotPasswordApi(email);
      }
      
      showToast('Password reset link sent to your email!', 'success');
      setTimeout(() => {
        navigate('/register');
      }, 2000);
    } catch (err) {
      showToast(err.message || 'Failed to send reset link', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="forgot-password-page">
        <div className="forgot-password-card">
          <div className="forgot-password-header">
            <h2>Forgot Password?</h2>
            <p>Enter your email to receive a password reset link</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* User Type Selection */}
            <div className="form-group">
              <label>Account Type *</label>
              <div className="radio-group">
                {USER_TYPES.map(({ value, label }) => (
                  <label key={value} className="radio-label">
                    <input
                      type="radio"
                      value={value}
                      checked={userType === value}
                      onChange={(e) => setUserType(e.target.value)}
                    />
                    <span className="radio-custom"></span>
                    {label}
                  </label>
                ))}
              </div>
            </div>

            {/* Email Input */}
            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                required
              />
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>

            <div className="form-footer">
              <button type="button" className="btn-back" onClick={() => navigate('/register')}>
                ← Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
