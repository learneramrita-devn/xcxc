import { useState } from 'react';
import { checkUserExists } from '../services/onboardingService';

const MobileStep = ({ onContinue, onRegister, onMobileCapture, onTenantCapture, onLoginTypeCapture, onToast, initialMobile = '' }) => {
  const [mobile, setMobile] = useState(initialMobile);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleContinue = async () => {
    if (!/^\d{10}$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setNotFound(false);
    setLoading(true);
    
    try {
      const { exists, tenantId, userData } = await checkUserExists(mobile);
      
      console.log('Mobile check result:', { exists, tenantId, userData });
      
      onMobileCapture(mobile);
      onTenantCapture(tenantId);
      
      if (exists) {
        let detectedLoginType = 'USER';
        
        if (userData) {
          if (userData.tenantId !== undefined && userData.tenantId !== null) {
            detectedLoginType = 'TENANT';
          }
          else if (userData.role) {
            const tenantRoles = ['TENANT_ADMIN', 'API_PARTNER', 'WHITELABEL_PARTNER', 'SUPER_ADMIN'];
            if (tenantRoles.includes(userData.role)) {
              detectedLoginType = 'TENANT';
            } else if (userData.role === 'DISTRIBUTOR') {
              detectedLoginType = 'DISTRIBUTOR';
            }
          }
        }
        
        onLoginTypeCapture(detectedLoginType);
        onContinue();
      } else {
        setNotFound(true);
        onToast('Mobile number not registered. Please register first.', 'error');
      }
      
    } catch (err) {
      onMobileCapture(mobile);
      onTenantCapture(1);
      onLoginTypeCapture('USER');
      setNotFound(true);
      onToast('Unable to verify mobile number. Please register if you are a new user.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="trav_form-group">
        <label className="form_label">Mobile Number</label>
        <div className="mobile_input">
          <div className="country">
            <img src="https://flagcdn.com/w40/in.png" alt="India" />
            <span>+91</span>
            <span className="down-chevron"></span>
          </div>
          <input
            type="tel"
            placeholder="Enter Mobile Number"
            value={mobile}
            maxLength={10}
            onChange={(e) => { setMobile(e.target.value.replace(/\D/g, '')); setError(''); setNotFound(false); }}
          />
        </div>
        {error && <span style={{ color: '#E70D0D', fontSize: '12px', marginTop: '6px', display: 'block' }}>{error}</span>}
      </div>

      <button className="btn-primary trav-btn" onClick={handleContinue} disabled={loading}>
        {loading ? 'Checking...' : 'Continue'}
      </button>

      {/* Show registration banner when user not found */}
      {notFound && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginTop: '14px',
          padding: '12px 16px',
          background: '#FEF9EC',
          border: '1px solid #f19517',
          borderRadius: '8px'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f19517" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <line x1="19" y1="8" x2="19" y2="14"></line>
            <line x1="22" y1="11" x2="16" y2="11"></line>
          </svg>
          <span style={{ fontSize: '13px', color: '#92400E', flex: 1 }}>
            New here? Create your account
          </span>
          <button 
            onClick={onRegister}
            style={{
              background: '#f19517',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 14px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Register
          </button>
        </div>
      )}
    </>
  );
};

export default MobileStep;
