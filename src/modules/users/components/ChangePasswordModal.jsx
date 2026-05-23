import { useState } from 'react';
import { updatePasswordApi } from '../../onboarding/tenants/api/onboardingApi';

const ChangePasswordModal = ({ userId, onClose, onToast }) => {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.currentPassword) errs.currentPassword = 'Current password is required';
    if (!form.newPassword) errs.newPassword = 'New password is required';
    else if (form.newPassword.length < 8) errs.newPassword = 'Password must be at least 8 characters';
    if (form.newPassword !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      await updatePasswordApi({ userId, oldPassword: form.currentPassword, newPassword: form.newPassword });
      onToast('Password changed successfully!', 'success');
      onClose();
    } catch (err) {
      onToast(err.message || 'Failed to change password', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Change Password</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="profile-form-group">
              <label>Current Password <span style={{ color: '#E70D0D' }}>*</span></label>
              <input
                type="password"
                value={form.currentPassword}
                onChange={(e) => { setForm(p => ({ ...p, currentPassword: e.target.value })); setErrors({}); }}
                placeholder="Enter current password"
              />
              {errors.currentPassword && <span style={{ color: '#E70D0D', fontSize: '12px' }}>{errors.currentPassword}</span>}
            </div>
            <div className="profile-form-group">
              <label>New Password <span style={{ color: '#E70D0D' }}>*</span></label>
              <input
                type="password"
                value={form.newPassword}
                onChange={(e) => { setForm(p => ({ ...p, newPassword: e.target.value })); setErrors({}); }}
                placeholder="Enter new password"
              />
              {errors.newPassword && <span style={{ color: '#E70D0D', fontSize: '12px' }}>{errors.newPassword}</span>}
            </div>
            <div className="profile-form-group">
              <label>Confirm New Password <span style={{ color: '#E70D0D' }}>*</span></label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) => { setForm(p => ({ ...p, confirmPassword: e.target.value })); setErrors({}); }}
                placeholder="Confirm new password"
              />
              {errors.confirmPassword && <span style={{ color: '#E70D0D', fontSize: '12px' }}>{errors.confirmPassword}</span>}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
