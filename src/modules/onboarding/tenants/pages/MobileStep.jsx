import { useState } from 'react';
import { useOnboarding } from '../hooks/useOnboarding';

const MobileStep = ({ nextStep, goToRegister, onToast, onMobileCapture, onTenantCapture }) => {
  const [mobile, setMobile] = useState('');

  const { loading, mobileError, handleMobileCheck } = useOnboarding({
    onUserExists: nextStep,
    onNewUser: (tenantId) => { onMobileCapture(mobile); onTenantCapture(tenantId); goToRegister(); },
    onToast,
  });

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
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
          />
        </div>
        {mobileError && (
          <span style={{ color: '#E70D0D', fontSize: '12px', marginTop: '6px', display: 'block' }}>
            {mobileError}
          </span>
        )}
      </div>

      <button
        className="btn-primary trav-btn"
        onClick={() => handleMobileCheck(mobile)}
        disabled={loading}
      >
        {loading ? 'Checking...' : 'Continue'}
      </button>
    </>
  );
};

export default MobileStep;
