import { useState } from 'react';
import { useAuth } from '../../../app/providers/AuthContext';
import SEOMeta from '../../../shared/components/SEOMeta';
import ProfilePage from './ProfilePage';
import SubUsersPage from './SubUsersPage';
import './_profileWithTabs.scss';

export default function ProfileWithTabs() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Check if user is tenant (API Partner, WhiteLabel, Corporate)
  const isTenant = user?.agentType && ['API_PARTNER', 'WHITE_LABEL', 'CORP_PARTNER'].includes(user.agentType);

  return (
    <>
      <SEOMeta title="My Profile – TravelApp" description="View and update your profile details on TravelApp." />
      
      <div className="profile-with-tabs">
        <div className="profile-tabs">
          <button 
            className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            My Profile
          </button>
          
          {isTenant && (
            <button 
              className={`tab-button ${activeTab === 'subusers' ? 'active' : ''}`}
              onClick={() => setActiveTab('subusers')}
            >
              Sub Users
            </button>
          )}
        </div>

        <div className="tab-content">
          {activeTab === 'profile' && <ProfilePage />}
          {activeTab === 'subusers' && isTenant && <SubUsersPage />}
        </div>
      </div>
    </>
  );
}
