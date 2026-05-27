import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Toast from '../../../shared/components/Toast';
import { verifyResetTokenApi, userUpdatePasswordApi, tenantUpdatePasswordApi } from '../api/forgotPasswordApi';
import './_forgotPassword.scss';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const userType = searchParams.get('type') || 'USER';
  
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [toast, setToast] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userData, setUserData] = useState(null);
  
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (token) {
      verifyToken();
    } else {
      showToast('Invalid reset link', 'error');
      setTimeout(() => navigate('/register'), 2000);
    }
  }, [token]);

  const verifyToken = async () => {
    try {
      const response = await verifyResetTokenApi(token);
      setUserData(response);
      setVerifying(false);
    } catch (err) {
      showToast(err.message || 'Invalid or expired reset link', 'error');
      setTimeout(() => navigate('/register'), 3000);
    }
  };

  const showToast = (message, type) => setToast({ message, type });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword.length < 8) {
      showToast('Password must be at least 8 characters', 'error');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        token,
        newPassword: formData.newPassword,
      };

      if (userType === 'TENANT') {
        await tenantUpdatePasswordApi(payload);
      } else {
        await userUpdatePasswordApi(payload);
      }
      
      showToast('Password reset successfully!', 'success');
      setTimeout(() => {
        navigate('/register');
      }, 2000);
    } catch (err) {
      showToast(err.message || 'Failed to reset password', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="forgot-password-page">
        <div className="forgot-password-card">
          <div className="spinner"></div>
          <h2>Verifying reset link...</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="forgot-password-page">
        <div className="forgot-password-card">
          <div className="forgot-password-header">
            <h2>Reset Password</h2>
            <p>Enter your new password</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>New Password *</label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.newPassword}
                  onChange={(e) => setFormData(p => ({ ...p, newPassword: e.target.value }))}
                  placeholder="Enter new password (min 8 characters)"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Confirm Password *</label>
              <div className="password-input">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(p => ({ ...p, confirmPassword: e.target.value }))}
                  placeholder="Confirm new password"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
