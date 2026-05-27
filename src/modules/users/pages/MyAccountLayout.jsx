import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../app/providers/AuthContext';
import SEOMeta from '../../../shared/components/SEOMeta';
import Toast from '../../../shared/components/Toast';
import './_myAccountPage.scss';

const TENANT_ROLES = ['TENANT_ADMIN', 'API_PARTNER', 'WHITELABEL_PARTNER', 'SUPER_ADMIN'];

const MENU_ITEMS = [
  { id: 'basic-profile', label: 'My Profile', icon: '👤', path: '/my-account/basic-profile' },
  { id: 'company', label: 'Company Details', icon: '🏢', path: '/my-account/company-details' },
  { id: 'banking', label: 'Banking Details', icon: '🏦', path: '/my-account/banking-details' },
  { id: 'bookings', label: 'My Bookings', icon: '📋', path: '/my-account/bookings' },
  { id: 'invoices', label: 'Invoices', icon: '🧾', path: '/my-account/invoices' },
  { id: 'reports', label: 'Reports', icon: '📊', path: '/my-account/reports' },
  { id: 'deposit', label: 'Deposit Request', icon: '💰', path: '/my-account/deposit-request' },
  { id: 'gst', label: 'GST Detail', icon: '📄', path: '/my-account/gst-detail' },
  { id: 'travellers', label: 'Frequent Travellers', icon: '✈️', path: '/my-account/frequent-travellers' },
  { id: 'change-password', label: 'Change Password', icon: '🔒', path: '/my-account/change-password' },
  { id: 'change-email', label: 'Change Email', icon: '📧', path: '/my-account/change-email' },
  { id: 'logout', label: 'Logout', icon: '🚪', action: 'logout' },
];

export default function MyAccountLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [toast, setToast] = useState(null);

  const showToast = (message, type) => setToast({ message, type });

  const handleMenuClick = (item) => {
    if (item.action === 'logout') {
      logout();
      showToast('Logged out successfully!', 'success');
      setTimeout(() => navigate('/'), 1000);
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const isActive = (path) => location.pathname === path;
  const isTenant = TENANT_ROLES.includes(user?.role);
  const filteredMenuItems = MENU_ITEMS.filter(item => !item.tenantOnly || isTenant);

  return (
    <>
      <SEOMeta title="My Account – TravelApp" description="Manage your account settings and preferences" />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="my-account-layout">
        <aside className="account-sidebar">
          <div className="account-sidebar-header">
            <h2>My Account</h2>
          </div>
          <nav className="account-menu">
            {filteredMenuItems.map((item) => (
              <div
                key={item.id}
                className={`account-menu-item ${isActive(item.path) ? 'active' : ''} ${item.id === 'logout' ? 'logout-item' : ''}`}
                onClick={() => handleMenuClick(item)}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </div>
            ))}
          </nav>
        </aside>

        <main className="account-content">
          {children}
        </main>
      </div>
    </>
  );
}

export { MENU_ITEMS };
