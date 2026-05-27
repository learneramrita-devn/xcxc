import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../app/providers/AuthContext';
import Toast from '../../../shared/components/Toast';
import PasswordInput from '../../onboarding/tenants/components/PasswordInput';
import { updatePasswordApi } from '../api/userApi';
import { tenantPasswordApi } from '../../onboarding/tenants/api/onboardingApi';
import './_profilePage.scss';

const TENANT_ROLES = ['TENANT_ADMIN', 'API_PARTNER', 'WHITELABEL_PARTNER', 'SUPER_ADMIN'];

export default function ChangePasswordPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isTenant = TENANT_ROLES.includes(user?.role);
  
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const showToast = (message, type) => setToast({ message, type });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.currentPassword) {
      showToast('Please enter your current password', 'error');
      return;
    }
    if (!formData.newPassword || formData.newPassword.length < 8) {
      showToast('New password must be at least 8 characters', 'error');
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    setLoading(true);
    try {
      if (isTenant) {
        await tenantPasswordApi({
          tenantId: user?.tenantId,
          oldPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        });
      } else {
        await updatePasswordApi({
          userId: user?.userId,
          currentPassword: formData.currentPassword,
          password: formData.newPassword,
        });
      }
      
      showToast('Password updated successfully!', 'success');
      setTimeout(() => {
        navigate('/my-account/basic-profile');
      }, 1500);
    } catch (err) {
      showToast(err.message || 'Failed to update password', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="profile-page-wrapper">
        <section className="profile-content">
          <div className="profile-content__header">
            <h2>Change Password</h2>
            <p>Update your account password</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="profile-form-card">
              <div className="profile-form-grid">
                <div className="profile-form-group full-width">
                  <label>Current Password *</label>
                  <PasswordInput
                    value={formData.currentPassword}
                    onChange={(e) => setFormData(p => ({ ...p, currentPassword: e.target.value }))}
                    placeholder="Enter current password"
                    required
                  />
                </div>

                <div className="profile-form-group full-width">
                  <label>New Password *</label>
                  <PasswordInput
                    value={formData.newPassword}
                    onChange={(e) => setFormData(p => ({ ...p, newPassword: e.target.value }))}
                    placeholder="Enter new password (min 8 characters)"
                    required
                  />
                </div>

                <div className="profile-form-group full-width">
                  <label>Confirm New Password *</label>
                  <PasswordInput
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(p => ({ ...p, confirmPassword: e.target.value }))}
                    placeholder="Confirm new password"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="profile-form-actions">
              <button type="button" className="cancel-btn" onClick={() => navigate('/my-account/basic-profile')}>
                Cancel
              </button>
              <button type="submit" className="save-btn" disabled={loading}>
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
