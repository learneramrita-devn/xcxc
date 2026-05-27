import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../app/providers/AuthContext';
import Toast from '../../../shared/components/Toast';
import { sendVerificationEmailApi } from '../api/verificationApi';
import './_profilePage.scss';

const TENANT_ROLES = ['TENANT_ADMIN', 'API_PARTNER', 'WHITELABEL_PARTNER', 'SUPER_ADMIN'];

export default function ChangeEmailPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isTenant = TENANT_ROLES.includes(user?.role);
  
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  
  const [formData, setFormData] = useState({
    currentEmail: user?.email || user?.sub || '',
    newEmail: '',
  });

  const showToast = (message, type) => setToast({ message, type });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.newEmail || !/\S+@\S+\.\S+/.test(formData.newEmail)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    setLoading(true);
    try {
      await sendVerificationEmailApi(formData.newEmail);
      showToast('Verification email sent to ' + formData.newEmail + '. Please check your inbox.', 'success');
      setTimeout(() => {
        navigate('/my-account/basic-profile');
      }, 2000);
    } catch (err) {
      showToast(err.message || 'Failed to send verification email', 'error');
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
            <h2>Change Email</h2>
            <p>Update your account email address</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="profile-form-card">
              <div className="profile-form-grid">
                <div className="profile-form-group full-width">
                  <label>Current Email</label>
                  <input
                    type="email"
                    value={formData.currentEmail}
                    disabled
                    style={{ background: '#f3f4f6', cursor: 'not-allowed' }}
                  />
                </div>

                <div className="profile-form-group full-width">
                  <label>New Email Address *</label>
                  <input
                    type="email"
                    value={formData.newEmail}
                    onChange={(e) => setFormData(p => ({ ...p, newEmail: e.target.value }))}
                    placeholder="Enter new email address"
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
                {loading ? 'Sending...' : 'Send Verification Email'}
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
