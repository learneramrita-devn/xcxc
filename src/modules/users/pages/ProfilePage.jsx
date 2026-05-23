import { useState, useEffect } from 'react';
import SEOMeta from '../../../shared/components/SEOMeta';
import Toast from '../../../shared/components/Toast';
import { useAuth } from '../../../app/providers/AuthContext';
import ChangePasswordModal from '../components/ChangePasswordModal';
import {
  getProfileApi,
  updateProfileInfoApi,
  updateAddressInfoApi,
  updateBusinessInfoApi,
  updateIdentityInfoApi,
  updateKycInfoApi,
  updateSecurityInfoApi,
  updateAdditionalInfoApi,
} from '../api/userApi';
import './_profilePage.scss';

const TABS = ['Basic Profile', 'Company Details', 'Banking Details', 'Financial Settings', 'System Settings', 'Other Settings'];

export default function ProfilePage() {
  const { user } = useAuth();
  const userId = user?.userId;

  const [activeTab, setActiveTab] = useState('Basic Profile');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [profileForm, setProfileForm] = useState({ firstName: '', lastName: '', email: '', phone: '', dob: '', gender: '' });
  const [addressForm, setAddressForm] = useState({ address: '', country: '', state: '', city: '', pincode: '' });
  const [identityForm, setIdentityForm] = useState({ aadhaar: '' });
  const [businessForm, setBusinessForm] = useState({ agencyName: '', panCard: '', gstNumber: '' });
  const [kycForm, setKycForm] = useState({ kycStatus: '' });
  const [securityForm, setSecurityForm] = useState({ twoFactorEnabled: false });
  const [additionalForm, setAdditionalForm] = useState({ notes: '' });

  useEffect(() => {
    if (!userId) return;
    getProfileApi(userId).then((res) => {
      const u = res?.userList?.[0] || res;
      if (!u) return;
      const nameParts = (u.name || '').split(' ');
      setProfileForm((p) => ({
        ...p,
        firstName: u.userProfileInfo?.fn || nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: u.email || '',
        phone: u.mobileNumber || '',
        dob: u.userProfileInfo?.dob || '',
        gender: u.userProfileInfo?.gdr || '',
      }));
      setAddressForm({
        address: u.addressInfo?.address || '',
        country: u.addressInfo?.country || '',
        state: u.addressInfo?.state || '',
        city: u.addressInfo?.cityName || '',
        pincode: u.addressInfo?.pinCode || '',
      });
      setIdentityForm({ aadhaar: u.userDocuments?.adr || '' });
      setBusinessForm({
        agencyName: u.businessInfo?.bsn || '',
        panCard: u.userDocuments?.pan || '',
        gstNumber: u.userDocuments?.gst || '',
      });
      setKycForm({ kycStatus: u.kycInfo?.ks || '' });
    }).catch(() => {
      if (user) {
        const nameParts = (user.name || '').split(' ');
        setProfileForm((p) => ({
          ...p,
          firstName: nameParts[0] || '',
          lastName: nameParts.slice(1).join(' ') || '',
          email: user.sub || '',
          phone: user.mobileNumber || '',
        }));
      }
    });
  }, [userId]);

  const showToast = (message, type) => setToast({ message, type });

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (activeTab === 'Basic Profile') {
        await updateProfileInfoApi(userId, {
          name: `${profileForm.firstName} ${profileForm.lastName}`.trim(),
          email: profileForm.email,
          mobileNumber: profileForm.phone,
          dob: profileForm.dob,
          gender: profileForm.gender,
        });
        await updateAddressInfoApi(userId, {
          address: addressForm.address,
          country: addressForm.country,
          state: addressForm.state,
          city: addressForm.city,
          pincode: addressForm.pincode,
        });
        await updateIdentityInfoApi(userId, { aadhaar: identityForm.aadhaar });
      } else if (activeTab === 'Company Details') {
        await updateBusinessInfoApi(userId, businessForm);
      } else if (activeTab === 'Financial Settings') {
        await updateKycInfoApi(userId, kycForm);
      } else if (activeTab === 'System Settings') {
        await updateSecurityInfoApi(userId, securityForm);
      } else if (activeTab === 'Other Settings') {
        await updateAdditionalInfoApi(userId, additionalForm);
      }
      showToast('Saved successfully!', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to save.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const displayName = user ? (user.name || user.sub || 'User') : 'User';

  return (
    <>
      <SEOMeta title="My Profile – TravelApp" description="View and update your profile details on TravelApp." />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {showPasswordModal && (
        <ChangePasswordModal
          userId={userId}
          onClose={() => setShowPasswordModal(false)}
          onToast={showToast}
        />
      )}

      <div className="profile-page">
        <aside className="profile-sidebar">
          <div className="profile-sidebar__card">
            <div className="profile-sidebar__avatar">
              <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=F19517&color=fff&size=80`} alt="User" />
            </div>
            <h4 className="profile-sidebar__name">{displayName}</h4>
            <p className="profile-sidebar__id">ID : {userId || 'N/A'}</p>
            <ul className="profile-sidebar__info">
              <li><span>Email Address</span><strong>{user?.sub || 'N/A'}</strong></li>
              <li><span>Role</span><strong>{user?.role || 'N/A'}</strong></li>
            </ul>
            <button 
              className="change-password-btn" 
              onClick={() => setShowPasswordModal(true)}
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '16px',
                background: '#F19517',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14px'
              }}
            >
              Change Password
            </button>
          </div>
        </aside>

        <section className="profile-content">
          <div className="profile-content__header">
            <h2>My Profile</h2>
            <p>Profile / My Profile</p>
          </div>

          <div className="profile-tabs">
            {TABS.map((tab) => (
              <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>
                {tab}
              </button>
            ))}
          </div>

          <form onSubmit={handleSave}>
            {/* Basic Profile */}
            {activeTab === 'Basic Profile' && (
              <div className="profile-form-card">
                <h3 className="profile-form-card__title">Profile Settings</h3>

                <p className="profile-form-card__section-title">Basic Information</p>
                <div className="profile-form-grid">
                  <div className="profile-form-group">
                    <label>First Name</label>
                    <input type="text" value={profileForm.firstName} onChange={(e) => setProfileForm(p => ({ ...p, firstName: e.target.value }))} placeholder="Enter first name" />
                  </div>
                  <div className="profile-form-group">
                    <label>Last Name</label>
                    <input type="text" value={profileForm.lastName} onChange={(e) => setProfileForm(p => ({ ...p, lastName: e.target.value }))} placeholder="Enter last name" />
                  </div>
                  <div className="profile-form-group">
                    <label>Email</label>
                    <input type="email" value={profileForm.email} onChange={(e) => setProfileForm(p => ({ ...p, email: e.target.value }))} placeholder="Enter email" />
                  </div>
                  <div className="profile-form-group">
                    <label>Phone</label>
                    <input type="tel" value={profileForm.phone} onChange={(e) => setProfileForm(p => ({ ...p, phone: e.target.value }))} placeholder="Enter phone number" />
                  </div>
                  <div className="profile-form-group">
                    <label>Date of Birth</label>
                    <input type="date" value={profileForm.dob} onChange={(e) => setProfileForm(p => ({ ...p, dob: e.target.value }))} />
                  </div>
                  <div className="profile-form-group">
                    <label>Gender</label>
                    <select value={profileForm.gender} onChange={(e) => setProfileForm(p => ({ ...p, gender: e.target.value }))}>
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="profile-form-group full-width">
                    <label>Aadhaar Number</label>
                    <div className="verify-row">
                      <input type="text" value={identityForm.aadhaar} onChange={(e) => setIdentityForm(p => ({ ...p, aadhaar: e.target.value }))} placeholder="Enter Aadhaar number" maxLength={12} />
                      <span className="verify-row__warning">Verify Aadhaar to complete your profile</span>
                      <button type="button" className="verify-row__btn">Verify</button>
                    </div>
                  </div>
                </div>

                <p className="profile-form-card__section-title">Personal Address Information</p>
                <div className="profile-form-grid">
                  <div className="profile-form-group full-width">
                    <label>Address</label>
                    <input type="text" value={addressForm.address} onChange={(e) => setAddressForm(p => ({ ...p, address: e.target.value }))} placeholder="Enter full address" />
                  </div>
                  <div className="profile-form-group">
                    <label>Country</label>
                    <select value={addressForm.country} onChange={(e) => setAddressForm(p => ({ ...p, country: e.target.value }))}>
                      <option value="">Select Country</option>
                      <option value="india">India</option>
                    </select>
                  </div>
                  <div className="profile-form-group">
                    <label>State</label>
                    <select value={addressForm.state} onChange={(e) => setAddressForm(p => ({ ...p, state: e.target.value }))}>
                      <option value="">Select State</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                      <option value="Assam">Assam</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Manipur">Manipur</option>
                      <option value="Meghalaya">Meghalaya</option>
                      <option value="Mizoram">Mizoram</option>
                      <option value="Nagaland">Nagaland</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Sikkim">Sikkim</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                      <option value="Chandigarh">Chandigarh</option>
                      <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                      <option value="Daman and Diu">Daman and Diu</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                      <option value="Ladakh">Ladakh</option>
                      <option value="Lakshadweep">Lakshadweep</option>
                      <option value="Puducherry">Puducherry</option>
                    </select>
                  </div>
                  <div className="profile-form-group">
                    <label>City</label>
                    <input type="text" value={addressForm.city} onChange={(e) => setAddressForm(p => ({ ...p, city: e.target.value }))} placeholder="Enter city" />
                  </div>
                  <div className="profile-form-group">
                    <label>Pincode / Zip Code</label>
                    <input type="text" value={addressForm.pincode} onChange={(e) => setAddressForm(p => ({ ...p, pincode: e.target.value }))} placeholder="Enter pincode" maxLength={6} />
                  </div>
                </div>
              </div>
            )}

            {/* Company Details */}
            {activeTab === 'Company Details' && (
              <div className="profile-form-card">
                <h3 className="profile-form-card__title">Company Details</h3>
                <div className="profile-form-grid">
                  <div className="profile-form-group">
                    <label>Agency Name</label>
                    <input type="text" value={businessForm.agencyName} onChange={(e) => setBusinessForm(p => ({ ...p, agencyName: e.target.value }))} placeholder="Enter agency name" />
                  </div>
                  <div className="profile-form-group">
                    <label>PAN Card</label>
                    <input type="text" value={businessForm.panCard} onChange={(e) => setBusinessForm(p => ({ ...p, panCard: e.target.value }))} placeholder="Enter PAN number" maxLength={10} />
                  </div>
                  <div className="profile-form-group">
                    <label>GST Number</label>
                    <input type="text" value={businessForm.gstNumber} onChange={(e) => setBusinessForm(p => ({ ...p, gstNumber: e.target.value }))} placeholder="Enter GST number" />
                  </div>
                </div>
              </div>
            )}

            {/* Financial Settings */}
            {activeTab === 'Financial Settings' && (
              <div className="profile-form-card">
                <h3 className="profile-form-card__title">Financial Settings</h3>
                <div className="profile-form-grid">
                  <div className="profile-form-group">
                    <label>KYC Status</label>
                    <select value={kycForm.kycStatus} onChange={(e) => setKycForm(p => ({ ...p, kycStatus: e.target.value }))}>
                      <option value="">Select Status</option>
                      <option value="PENDING">Pending</option>
                      <option value="VERIFIED">Verified</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* System Settings */}
            {activeTab === 'System Settings' && (
              <div className="profile-form-card">
                <h3 className="profile-form-card__title">System Settings</h3>
                <div className="profile-form-grid">
                  <div className="profile-form-group full-width">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input type="checkbox" checked={securityForm.twoFactorEnabled} onChange={(e) => setSecurityForm(p => ({ ...p, twoFactorEnabled: e.target.checked }))} />
                      Enable Two-Factor Authentication
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Other Settings */}
            {activeTab === 'Other Settings' && (
              <div className="profile-form-card">
                <h3 className="profile-form-card__title">Other Settings</h3>
                <div className="profile-form-grid">
                  <div className="profile-form-group full-width">
                    <label>Notes</label>
                    <input type="text" value={additionalForm.notes} onChange={(e) => setAdditionalForm(p => ({ ...p, notes: e.target.value }))} placeholder="Additional notes" />
                  </div>
                </div>
              </div>
            )}

            {/* Banking Details */}
            {activeTab === 'Banking Details' && (
              <div className="profile-form-card">
                <p style={{ color: '#6B7280', fontSize: '14px', textAlign: 'center', padding: '40px 0' }}>
                  Banking Details — Coming Soon
                </p>
              </div>
            )}

            {activeTab !== 'Banking Details' && (
              <div className="profile-form-actions">
                <button type="button" className="cancel-btn" onClick={() => setActiveTab('Basic Profile')}>Cancel</button>
                <button type="submit" className="save-btn" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
              </div>
            )}
          </form>
        </section>
      </div>
    </>
  );
}
