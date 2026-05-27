import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SEOMeta from '../../../shared/components/SEOMeta';
import Toast from '../../../shared/components/Toast';
import { useAuth } from '../../../app/providers/AuthContext';
import {
  getProfileApi,
  updateProfileInfoApi,
  updateAddressInfoApi,
  updateBusinessInfoApi,
  updateIdentityInfoApi,
  updateKycInfoApi,
  updateSecurityInfoApi,
  updateAdditionalInfoApi,
  updateEmailApi,
  updatePasswordApi,
} from '../api/userApi';
import './_profilePage.scss';

export default function ProfilePage() {
  const { user } = useAuth();
  const userId = user?.userId;
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [currentPasswordForEmail, setCurrentPasswordForEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [profileForm, setProfileForm] = useState({ firstName: '', lastName: '', email: '', phone: '', dob: '', gender: '' });
  const [addressForm, setAddressForm] = useState({ address: '', country: '', state: '', city: '', pincode: '' });
  const [identityForm, setIdentityForm] = useState({ aadhaar: '' });
  const [businessForm, setBusinessForm] = useState({ agencyName: '', panCard: '', gstNumber: '' });
  const [bankForm, setBankForm] = useState({ accountName: '', accountNumber: '', ifscCode: '', bankName: '', branch: '' });

  useEffect(() => {
    if (!userId) return;
    
    getProfileApi(userId).then((res) => {
      console.log('📦 Profile API Response:', res);
      const u = res?.userList?.[0] || res;
      if (!u) return;
      
      console.log('👤 User Object:', u);
      console.log('📍 Address Details:', u.addressDetails);
      console.log('📄 KYC Details:', u.kycDetails);
      console.log('🏢 Business Info:', u.businessInfo);
      
      const fullName = u.userProfileInfo?.fn || u.name || '';
      const nameParts = fullName.split(' ');
      setProfileForm((p) => ({
        ...p,
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: u.email || '',
        phone: u.mobileNumber || '',
        dob: u.userProfileInfo?.dob || '',
        gender: u.userProfileInfo?.gdr?.toLowerCase() || '',
      }));
      
      const addressData = {
        address: u.addressDetails?.address || '',
        country: u.addressDetails?.country || '',
        state: u.addressDetails?.state || '',
        city: u.addressDetails?.cityName || '',
        pincode: u.addressDetails?.pinCode || '',
      };
      console.log('🗺️ Address Data Mapped:', addressData);
      setAddressForm(addressData);
      
      setIdentityForm({ aadhaar: u.kycDetails?.aadhaar || '' });
      
      setBusinessForm({
        agencyName: u.businessInfo?.bsn || '',
        panCard: u.kycDetails?.pan || '',
        gstNumber: u.kycDetails?.gst || '',
      });
      
      setBankForm({
        accountName: u.userAdditionalInfo?.bal?.[0]?.ahn || '',
        accountNumber: u.userAdditionalInfo?.bal?.[0]?.accNo || '',
        ifscCode: u.userAdditionalInfo?.bal?.[0]?.ifsc || '',
        bankName: u.userAdditionalInfo?.bal?.[0]?.bn || '',
        branch: u.userAdditionalInfo?.bal?.[0]?.cmts || '',
      });
    }).catch((err) => {
      console.error('❌ Profile API Error:', err);
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

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.hash]);

  const showToast = (message, type) => setToast({ message, type });

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
      await updateEmailApi({ userId, email: newEmail, currentPassword: currentPasswordForEmail });
      showToast('Email updated successfully!', 'success');
      setShowChangeEmail(false);
      setNewEmail('');
      setCurrentPasswordForEmail('');
      setProfileForm(p => ({ ...p, email: newEmail }));
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
      await updatePasswordApi({ userId, currentPassword, password: newPassword });
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

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfileInfoApi(userId, {
        fn: `${profileForm.firstName} ${profileForm.lastName}`.trim(),
        gdr: profileForm.gender?.toUpperCase() || 'MALE',
        dob: profileForm.dob,
        zip: addressForm.pincode,
        zd: addressForm.city,
        co: addressForm.country,
        tz: 'Asia/Kolkata',
        language: 'EN',
        lurl: '',
      });
      await updateAddressInfoApi(userId, {
        address: addressForm.address,
        country: addressForm.country,
        state: addressForm.state,
        cityName: addressForm.city,
        pinCode: addressForm.pincode,
      });
      await updateKycInfoApi(userId, {
        aadhaar: identityForm.aadhaar,
        pan: businessForm.panCard,
        gst: businessForm.gstNumber,
      });
      await updateBusinessInfoApi(userId, {
        bsn: businessForm.agencyName,
        bstp: 'TRAVEL',
        rflcd: '',
      });
      await updateAdditionalInfoApi(userId, { bal: [{ ...bankForm }] });
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

      <div className="profile-page-wrapper">
        <section className="profile-content">
          <div className="profile-content__header">
            <h2>My Profile</h2>
            <p>Manage your profile information</p>
          </div>

          <form onSubmit={handleSave}>
            {/* My Profile - Basic & Address */}
            <div className="profile-form-card" id="basic">
              <h3 className="profile-form-card__title">My Profile</h3>

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
                </div>

                <p className="profile-form-card__section-title">Address Information</p>
                <div className="profile-form-grid">
                  <div className="profile-form-group full-width">
                    <label>Address</label>
                    <input type="text" value={addressForm.address} onChange={(e) => setAddressForm(p => ({ ...p, address: e.target.value }))} placeholder="Enter full address" />
                  </div>
                  <div className="profile-form-group">
                    <label>Country</label>
                    <select value={addressForm.country} onChange={(e) => setAddressForm(p => ({ ...p, country: e.target.value }))}>
                      <option value="">Select Country</option>
                      <option value="India">India</option>
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
                    <label>Pincode</label>
                    <input type="text" value={addressForm.pincode} onChange={(e) => setAddressForm(p => ({ ...p, pincode: e.target.value }))} placeholder="Enter pincode" maxLength={6} />
                  </div>
                </div>
              </div>

            {/* Company Details - Business Info & KYC */}
            <div className="profile-form-card" id="company">
              <h3 className="profile-form-card__title">Company Details</h3>
              
              <p className="profile-form-card__section-title">Business Information</p>
                <div className="profile-form-grid">
                  <div className="profile-form-group">
                    <label>Agency Name</label>
                    <input type="text" value={businessForm.agencyName} onChange={(e) => setBusinessForm(p => ({ ...p, agencyName: e.target.value }))} placeholder="Enter agency name" />
                  </div>
                </div>
              
              <p className="profile-form-card__section-title">KYC Details</p>
                <div className="profile-form-grid">
                  <div className="profile-form-group">
                    <label>PAN Card</label>
                    <input type="text" value={businessForm.panCard} onChange={(e) => setBusinessForm(p => ({ ...p, panCard: e.target.value }))} placeholder="Enter PAN number" maxLength={10} />
                  </div>
                  <div className="profile-form-group">
                    <label>GST Number</label>
                    <input type="text" value={businessForm.gstNumber} onChange={(e) => setBusinessForm(p => ({ ...p, gstNumber: e.target.value }))} placeholder="Enter GST number" />
                  </div>
                  <div className="profile-form-group">
                    <label>Aadhaar Number</label>
                    <div className="verify-row">
                      <input type="text" value={identityForm.aadhaar} onChange={(e) => setIdentityForm(p => ({ ...p, aadhaar: e.target.value }))} placeholder="Enter Aadhaar number" maxLength={12} />
                      <span className="verify-row__warning">Verify Aadhaar to complete your profile</span>
                      <button type="button" className="verify-row__btn">Verify</button>
                    </div>
                  </div>
                </div>
              </div>

            {/* Banking Details */}
            <div className="profile-form-card" id="banking">
              <h3 className="profile-form-card__title">Banking Details</h3>
                <div className="profile-form-grid">
                  <div className="profile-form-group">
                    <label>Account Holder Name</label>
                    <input type="text" value={bankForm.accountName} onChange={(e) => setBankForm(p => ({ ...p, accountName: e.target.value }))} placeholder="Enter account holder name" />
                  </div>
                  <div className="profile-form-group">
                    <label>Account Number</label>
                    <input type="text" value={bankForm.accountNumber} onChange={(e) => setBankForm(p => ({ ...p, accountNumber: e.target.value }))} placeholder="Enter account number" />
                  </div>
                  <div className="profile-form-group">
                    <label>IFSC Code</label>
                    <input type="text" value={bankForm.ifscCode} onChange={(e) => setBankForm(p => ({ ...p, ifscCode: e.target.value }))} placeholder="Enter IFSC code" />
                  </div>
                  <div className="profile-form-group">
                    <label>Bank Name</label>
                    <input type="text" value={bankForm.bankName} onChange={(e) => setBankForm(p => ({ ...p, bankName: e.target.value }))} placeholder="Enter bank name" />
                  </div>
                  <div className="profile-form-group full-width">
                    <label>Branch</label>
                    <input type="text" value={bankForm.branch} onChange={(e) => setBankForm(p => ({ ...p, branch: e.target.value }))} placeholder="Enter branch name" />
                  </div>
                </div>
              </div>

            <div className="profile-form-actions">
              <button type="button" className="cancel-btn">Cancel</button>
              <button type="submit" className="save-btn" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
            </div>
          </form>

          {showChangeEmail && (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
              <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', width: '90%', maxWidth: '400px' }}>
                <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: 600 }}>Change Email</h3>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 500 }}>Current Password</label>
                  <input type="password" value={currentPasswordForEmail} onChange={(e) => setCurrentPasswordForEmail(e.target.value)} placeholder="Enter current password" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 500 }}>New Email Address</label>
                  <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="Enter new email" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button onClick={() => { setShowChangeEmail(false); setNewEmail(''); setCurrentPasswordForEmail(''); }} style={{ padding: '8px 16px', background: '#6B7280', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                  <button onClick={handleChangeEmail} disabled={loading} style={{ padding: '8px 16px', background: '#F19517', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>{loading ? 'Updating...' : 'Update'}</button>
                </div>
              </div>
            </div>
          )}

          {showChangePassword && (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
              <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', width: '90%', maxWidth: '400px' }}>
                <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: 600 }}>Change Password</h3>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 500 }}>Current Password</label>
                  <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Enter current password" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 500 }}>New Password</label>
                  <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 500 }}>Confirm Password</label>
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
                </div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button onClick={() => { setShowChangePassword(false); setCurrentPassword(''); setNewPassword(''); setConfirmPassword(''); }} style={{ padding: '8px 16px', background: '#6B7280', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                  <button onClick={handleChangePassword} disabled={loading} style={{ padding: '8px 16px', background: '#F19517', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>{loading ? 'Updating...' : 'Update'}</button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
