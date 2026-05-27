import { useState } from 'react';
import { useAuth } from '../../../app/providers/AuthContext';
import BasicProfilePage from './BasicProfilePage';
import SubUsersPage from './SubUsersPage';
import './_profileWithTabsNew.scss';

const TENANT_ROLES = ['TENANT_ADMIN', 'API_PARTNER', 'WHITELABEL_PARTNER', 'SUPER_ADMIN'];

export default function BasicProfilePageWithTabs() {
  const { user } = useAuth();
  const isTenant = TENANT_ROLES.includes(user?.role);
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="profile-with-tabs-wrapper">
      <div className="profile-tabs-header">
        <h2>My Profile</h2>
        <div className="profile-tabs-nav">
          <button
            className={`profile-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            My Profile
          </button>
          {isTenant && (
            <button
              className={`profile-tab-btn ${activeTab === 'subusers' ? 'active' : ''}`}
              onClick={() => setActiveTab('subusers')}
            >
              Sub Users
            </button>
          )}
        </div>
      </div>

      <div className="profile-tabs-content">
        {activeTab === 'profile' && <BasicProfilePage />}
        {activeTab === 'subusers' && isTenant && <SubUsersPage />}
      </div>
    </div>
  );
}
