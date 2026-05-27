import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../app/providers/AuthContext';
import SEOMeta from '../../../shared/components/SEOMeta';
import Toast from '../../../shared/components/Toast';
import { updateEmailApi, updatePasswordApi } from '../../users/api/userApi';
import './_myAccountPage.scss';

const MENU_ITEMS = [
  { id: 'profile', label: 'My Profile', icon: '👤', path: '/profile' },
  { id: 'bank', label: 'Bank Detail', icon: '🏦', path: '/my-account/bank-detail' },
  { id: 'bookings', label: 'My Bookings', icon: '📋', path: '/my-bookings' },
  { id: 'invoices', label: 'Invoices', icon: '🧾', path: '/invoices' },
  { id: 'reports', label: 'Reports', icon: '📊', path: '/reports' },
  { id: 'deposit', label: 'Deposit Request', icon: '💰', path: '/my-account/deposit-request' },
  { id: 'gst', label: 'GST Detail', icon: '📄', path: '/my-account/gst-detail' },
  { id: 'travellers', label: 'Frequent Travellers', icon: '✈️', path: '/my-account/frequent-travellers' },
  { id: 'change-password', label: 'Change Password', icon: '🔒', action: 'password' },
  { id: 'change-email', label: 'Change Email', icon: '📧', action: 'email' },
  { id: 'logout', label: 'Logout', icon: '🚪', action: 'logout' },
];

export default function MyAccountPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newEmail, setNewEmail] = useState('');
  const [currentPasswordForEmail, setCurrentPasswordForEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const showToast = (message, type) => setToast({ message, type });

  const handleMenuClick = (item) => {
    if (item.action === 'email') {
      setShowChangeEmail(true);
    } else if (item.action === 'password') {
      setShowChangePassword(true);
    } else if (item.action === 'logout') {
      logout();
      showToast('Logged out successfully!', 'success');
      setTimeout(() => navigate('/'), 1000);
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const handleChangeEmail = async () => {
    if (!newEmail || !/\S+@\S+\.\S+/.test(newEmail)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    if (!currentPasswordForEmail) {
      showToast('Please enter your current password', 'error');
      return;
    }
    setLoading(true);
    try {
      await updateEmailApi({ userId: user?.userId, email: newEmail, currentPassword: currentPasswordForEmail });
      showToast('Email updated successfully!', 'success');
      setShowChangeEmail(false);
      setNewEmail('');
      setCurrentPasswordForEmail('');
    } catch (err) {
      showToast(err.message || 'Failed to update email', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword) {
      showToast('Please enter your current password', 'error');
      return;
    }
    if (!newPassword || newPassword.length < 8) {
      showToast('Password must be at least 8 characters', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    setLoading(true);
    try {
      await updatePasswordApi({ userId: user?.userId, currentPassword, password: newPassword });
      showToast('Password updated successfully!', 'success');
      setShowChangePassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      showToast(err.message || 'Failed to update password', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOMeta title="My Account – TravelApp" description="Manage your account settings and preferences" />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="my-account-page">
        <div className="account-header">
          <h1>My Account</h1>
          <p>Manage your account settings and preferences</p>
        </div>

        <div className="account-grid">
          {MENU_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`account-card ${item.id === 'logout' ? 'logout-card' : ''}`}
              onClick={() => handleMenuClick(item)}
            >
              <span className="account-icon">{item.icon}</span>
              <span className="account-label">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Change Email Modal */}
        {showChangeEmail && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Change Email</h3>
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  value={currentPasswordForEmail}
                  onChange={(e) => setCurrentPasswordForEmail(e.target.value)}
                  placeholder="Enter current password"
                />
              </div>
              <div className="form-group">
                <label>New Email Address</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter new email"
                />
              </div>
              <div className="modal-actions">
                <button
                  onClick={() => {
                    setShowChangeEmail(false);
                    setNewEmail('');
                    setCurrentPasswordForEmail('');
                  }}
                  className="btn-cancel"
                >
                  Cancel
                </button>
                <button onClick={handleChangeEmail} disabled={loading} className="btn-submit">
                  {loading ? 'Updating...' : 'Update'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Change Password Modal */}
        {showChangePassword && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Change Password</h3>
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>
              <div className="modal-actions">
                <button
                  onClick={() => {
                    setShowChangePassword(false);
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                  }}
                  className="btn-cancel"
                >
                  Cancel
                </button>
                <button onClick={handleChangePassword} disabled={loading} className="btn-submit">
                  {loading ? 'Updating...' : 'Update'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
