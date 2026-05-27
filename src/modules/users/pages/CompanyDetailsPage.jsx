import { useState, useEffect } from 'react';
import { useAuth } from '../../../app/providers/AuthContext';
import Toast from '../../../shared/components/Toast';
import { getProfileApi, getTenantProfileApi } from '../api/userApi';
import './_profilePage.scss';

export default function CompanyDetailsPage() {
  const { user } = useAuth();
  
  const isTenant = user?.role && ['TENANT_ADMIN', 'API_PARTNER', 'WHITELABEL_PARTNER', 'SUPER_ADMIN'].includes(user.role);
  
  const getUserId = () => {
    if (isTenant) {
      const tenantId = localStorage.getItem('tenantId') || user?.tenantId;
      if (tenantId) return tenantId;
    }
    
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) return storedUserId;
    
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.tenantId || payload.userId || payload.sub;
      } catch (e) {
        console.error('Failed to parse JWT:', e);
      }
    }
    
    return user?.tenantId || user?.userId;
  };
  
  const userId = getUserId();
  const [toast, setToast] = useState(null);
  
  const [companyData, setCompanyData] = useState({
    agencyName: '',
    companyName: '',
    businessType: '',
    firmType: '',
    gst: '',
    pan: '',
    aadhaar: '',
    partner1Pan: '',
    partner1Aadhaar: '',
    partner2Pan: '',
    partner2Aadhaar: '',
    director1Pan: '',
    director1Aadhaar: '',
    director2Pan: '',
    director2Aadhaar: '',
    directorPan: '',
    directorAadhaar: '',
    companyPan: '',
    cin: '',
  });

  useEffect(() => {
    if (!userId) return;
    
    const apiCall = isTenant ? getTenantProfileApi(userId) : getProfileApi(userId);
    
    apiCall.then((res) => {
      if (!res) return;
      
      if (isTenant) {
        const t = res?.tenantList?.[0];
        if (!t) return;
        
        setCompanyData({
          agencyName: t.companyName || '',
          companyName: t.companyName || '',
          businessType: t.tenantType || '',
          firmType: t.kycDetails?.firmType || '',
          gst: t.kycDetails?.gst || '',
          pan: t.kycDetails?.pan || '',
          aadhaar: t.kycDetails?.aadhaar || '',
          partner1Pan: t.kycDetails?.partner1Pan || '',
          partner1Aadhaar: t.kycDetails?.partner1Aadhaar || '',
          partner2Pan: t.kycDetails?.partner2Pan || '',
          partner2Aadhaar: t.kycDetails?.partner2Aadhaar || '',
          director1Pan: t.kycDetails?.director1Pan || '',
          director1Aadhaar: t.kycDetails?.director1Aadhaar || '',
          director2Pan: t.kycDetails?.director2Pan || '',
          director2Aadhaar: t.kycDetails?.director2Aadhaar || '',
          directorPan: t.kycDetails?.directorPan || '',
          directorAadhaar: t.kycDetails?.directorAadhaar || '',
          companyPan: t.kycDetails?.companyPan || '',
          cin: t.kycDetails?.cin || '',
        });
      } else {
        const u = res?.userList?.[0];
        if (!u) return;
        
        setCompanyData({
          agencyName: u.businessInfo?.bsn || '',
          companyName: u.businessInfo?.companyName || '',
          businessType: u.userType || '',
          firmType: u.kycDetails?.firmType || '',
          gst: u.kycDetails?.gst || '',
          pan: u.kycDetails?.pan || '',
          aadhaar: u.kycDetails?.aadhaar || '',
          partner1Pan: u.kycDetails?.partner1Pan || '',
          partner1Aadhaar: u.kycDetails?.partner1Aadhaar || '',
          partner2Pan: u.kycDetails?.partner2Pan || '',
          partner2Aadhaar: u.kycDetails?.partner2Aadhaar || '',
          director1Pan: u.kycDetails?.director1Pan || '',
          director1Aadhaar: u.kycDetails?.director1Aadhaar || '',
          director2Pan: u.kycDetails?.director2Pan || '',
          director2Aadhaar: u.kycDetails?.director2Aadhaar || '',
          directorPan: u.kycDetails?.directorPan || '',
          directorAadhaar: u.kycDetails?.directorAadhaar || '',
          companyPan: u.kycDetails?.companyPan || '',
          cin: u.kycDetails?.cin || '',
        });
      }
    }).catch((err) => {
      console.error('❌ Company API Error:', err);
    });
  }, [userId, isTenant]);

  const renderFirmTypeFields = () => {
    const firmType = companyData.firmType;
    
    if (firmType === 'Proprietor') {
      return (
        <>
          <div className="profile-form-group">
            <label>GST Number</label>
            <input type="text" value={companyData.gst} readOnly />
          </div>
          <div className="profile-form-group">
            <label>PAN Number</label>
            <input type="text" value={companyData.pan} readOnly />
          </div>
          <div className="profile-form-group">
            <label>Aadhaar Number</label>
            <input type="text" value={companyData.aadhaar} readOnly />
          </div>
        </>
      );
    }
    
    if (firmType === 'Partnership') {
      return (
        <>
          <div className="profile-form-group">
            <label>GST Number</label>
            <input type="text" value={companyData.gst} readOnly />
          </div>
          <div className="profile-form-group">
            <label>Partner 1 PAN Number</label>
            <input type="text" value={companyData.partner1Pan} readOnly />
          </div>
          <div className="profile-form-group">
            <label>Partner 1 Aadhaar Number</label>
            <input type="text" value={companyData.partner1Aadhaar} readOnly />
          </div>
          <div className="profile-form-group">
            <label>Partner 2 PAN Number</label>
            <input type="text" value={companyData.partner2Pan} readOnly />
          </div>
          <div className="profile-form-group">
            <label>Partner 2 Aadhaar Number</label>
            <input type="text" value={companyData.partner2Aadhaar} readOnly />
          </div>
        </>
      );
    }
    
    if (firmType === 'Pvt Ltd') {
      return (
        <>
          <div className="profile-form-group">
            <label>GST Number</label>
            <input type="text" value={companyData.gst} readOnly />
          </div>
          <div className="profile-form-group">
            <label>Director 1 PAN Number</label>
            <input type="text" value={companyData.director1Pan} readOnly />
          </div>
          <div className="profile-form-group">
            <label>Director 1 Aadhaar Number</label>
            <input type="text" value={companyData.director1Aadhaar} readOnly />
          </div>
          <div className="profile-form-group">
            <label>Director 2 PAN Number</label>
            <input type="text" value={companyData.director2Pan} readOnly />
          </div>
          <div className="profile-form-group">
            <label>Director 2 Aadhaar Number</label>
            <input type="text" value={companyData.director2Aadhaar} readOnly />
          </div>
          <div className="profile-form-group">
            <label>Company/LLP PAN Number</label>
            <input type="text" value={companyData.companyPan} readOnly />
          </div>
          <div className="profile-form-group">
            <label>CIN</label>
            <input type="text" value={companyData.cin} readOnly />
          </div>
        </>
      );
    }
    
    if (firmType === 'OPC') {
      return (
        <>
          <div className="profile-form-group">
            <label>GST Number</label>
            <input type="text" value={companyData.gst} readOnly />
          </div>
          <div className="profile-form-group">
            <label>Director PAN Number</label>
            <input type="text" value={companyData.directorPan} readOnly />
          </div>
          <div className="profile-form-group">
            <label>Director Aadhaar Number</label>
            <input type="text" value={companyData.directorAadhaar} readOnly />
          </div>
          <div className="profile-form-group">
            <label>Company/LLP PAN Number</label>
            <input type="text" value={companyData.companyPan} readOnly />
          </div>
          <div className="profile-form-group">
            <label>CIN</label>
            <input type="text" value={companyData.cin} readOnly />
          </div>
        </>
      );
    }
    
    return null;
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="profile-page-wrapper">
        <section className="profile-content">
          <div className="profile-content__header">
            <h2>Company Details</h2>
            <p>View your company information</p>
          </div>

          <div className="profile-form-card">
            <h3 className="profile-form-card__title">Business Information</h3>
            <div className="profile-form-grid">
              {companyData.agencyName && (
                <div className="profile-form-group">
                  <label>Agency Name</label>
                  <input type="text" value={companyData.agencyName} readOnly />
                </div>
              )}
            </div>
          </div>

          <div className="profile-form-card">
            <h3 className="profile-form-card__title">KYC Details</h3>
            {companyData.firmType && (
              <div className="profile-form-group" style={{ marginBottom: '15px' }}>
                <label>Firm Type</label>
                <input type="text" value={companyData.firmType} readOnly />
              </div>
            )}
            <div className="profile-form-grid">
              {renderFirmTypeFields()}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
