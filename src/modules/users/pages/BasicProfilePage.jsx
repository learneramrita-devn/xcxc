import { useState, useEffect } from 'react';
import { useAuth } from '../../../app/providers/AuthContext';
import Toast from '../../../shared/components/Toast';
import { getProfileApi, getTenantProfileApi } from '../api/userApi';
import './_profilePage.scss';

export default function BasicProfilePage() {
  const { user } = useAuth();
  
  // Check if user is a tenant
  const isTenant = user?.role && ['TENANT_ADMIN', 'API_PARTNER', 'WHITELABEL_PARTNER', 'SUPER_ADMIN'].includes(user.role);
  
  // Try multiple sources for userId/tenantId
  const getUserId = () => {
    // For tenants, try tenantId first
    if (isTenant) {
      const tenantId = localStorage.getItem('tenantId') || user?.tenantId;
      if (tenantId) return tenantId;
    }
    
    // 1. Try localStorage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) return storedUserId;
    
    // 2. Try from JWT token directly
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.tenantId || payload.userId || payload.sub;
      } catch (e) {
        console.error('Failed to parse JWT:', e);
      }
    }
    
    // 3. Fallback to user object
    return user?.tenantId || user?.userId;
  };
  
  const userId = getUserId();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
  });

  const [addressForm, setAddressForm] = useState({
    address: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
  });

  useEffect(() => {
    if (!userId) return;
    
    const apiCall = isTenant ? getTenantProfileApi(userId) : getProfileApi(userId);
    
    apiCall
      .then((res) => {
        if (!res) return;
        
        if (isTenant) {
          const t = res?.tenantList?.[0];
          if (!t) return;
          
          const fullName = t.tenantProfileInfo?.fn || `${t.firstName || ''} ${t.lastName || ''}`.trim();
          const nameParts = fullName.split(' ');
          
          const profileData = {
            firstName: nameParts[0] || t.firstName || '',
            lastName: nameParts.slice(1).join(' ') || t.lastName || '',
            email: t.email || '',
            phone: t.mobile || t.mobileNumber || '',
            dob: t.tenantProfileInfo?.dob || '',
            gender: t.tenantProfileInfo?.gdr?.toLowerCase() || '',
          };
          setProfileForm(profileData);
          
          const addressData = {
            address: t.addressDetails?.address || '',
            country: t.addressDetails?.country || '',
            state: t.addressDetails?.state || '',
            city: t.addressDetails?.cityName || '',
            pincode: t.addressDetails?.pinCode || '',
          };
          setAddressForm(addressData);
          
        } else {
          const u = res?.userList?.[0];
          if (!u) return;
          
          const fullName = u.userProfileInfo?.fn || u.name || '';
          const nameParts = fullName.split(' ');
          
          const profileData = {
            firstName: nameParts[0] || '',
            lastName: nameParts.slice(1).join(' ') || '',
            email: u.email || '',
            phone: u.mobileNumber || '',
            dob: u.userProfileInfo?.dob || '',
            gender: u.userProfileInfo?.gdr?.toLowerCase() || '',
          };
          setProfileForm(profileData);
          
          const addressData = {
            address: u.addressDetails?.address || '',
            country: u.addressDetails?.country || '',
            state: u.addressDetails?.state || '',
            city: u.addressDetails?.cityName || '',
            pincode: u.addressDetails?.pinCode || '',
          };
          setAddressForm(addressData);
        }
      })
      .catch((err) => {
        console.error('Profile API Error:', err);
      });
  }, [userId, isTenant]);

  const showToast = (message, type) => setToast({ message, type });

  const handleSave = async (e) => {
    e.preventDefault();
    showToast('Save functionality will be implemented', 'info');
  };

  const renderFirmTypeFields = () => {
    return null;
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="profile-page-wrapper">
        <section className="profile-content">
          <div className="profile-content__header">
            <h2>My Profile</h2>
            <p>View your complete profile information</p>
          </div>

          <form onSubmit={handleSave}>
            {/* Basic Information */}
            <div className="profile-form-card">
              <h3 className="profile-form-card__title">Basic Information</h3>
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
            </div>

            {/* Address Information */}
            <div className="profile-form-card">
              <h3 className="profile-form-card__title">Address Information</h3>
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
                  <input type="text" value={addressForm.state} onChange={(e) => setAddressForm(p => ({ ...p, state: e.target.value }))} placeholder="Enter state" />
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

            <div className="profile-form-actions">
              <button type="button" className="cancel-btn">Cancel</button>
              <button type="submit" className="save-btn" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
