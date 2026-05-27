import { useState } from 'react';
import { useAuth } from '../../../app/providers/AuthContext';
import ProfilePage from './ProfilePage';
import SubUsersPage from './SubUsersPage';
import SEOMeta from '../../../shared/components/SEOMeta';
import './_profileWithTabsNew.scss';

const TENANT_ROLES = ['TENANT_ADMIN', 'API_PARTNER', 'WHITELABEL_PARTNER', 'SUPER_ADMIN'];

export default function ProfileWithTabsNew() {
  const { user } = useAuth();
  const isTenant = TENANT_ROLES.includes(user?.role);
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <>
      <SEOMeta title="My Profile – TravelApp" description="Manage your profile and sub users" />
      
      <div className="profile-with-tabs">
        <div className="profile-tabs-header">
          <h2>My Account</h2>
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
          {activeTab === 'profile' && <ProfilePage />}
          {activeTab === 'subusers' && isTenant && <SubUsersPage />}
        </div>
      </div>
    </>
  );
}
