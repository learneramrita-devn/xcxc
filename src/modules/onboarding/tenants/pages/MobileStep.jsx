import { useState } from 'react';
import { checkMobileExists } from '../services/onboardingService';

const MobileStep = ({ onContinue, onMobileCapture, onTenantCapture, onToast }) => {
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!/^\d{10}$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const exists = await checkMobileExists(mobile);
      onMobileCapture(mobile);
      onTenantCapture(null);
      if (!exists) {
        onToast('This mobile number does not exist. Kindly register.', 'error');
      }
      onContinue(!exists); // pass isNewUser flag
    } catch {
      onMobileCapture(mobile);
      onTenantCapture(null);
      onContinue(false);
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
            onChange={(e) => { setMobile(e.target.value.replace(/\D/g, '')); setError(''); }}
          />
        </div>
        {error && (
          <span style={{ color: '#E70D0D', fontSize: '12px', marginTop: '6px', display: 'block' }}>
            {error}
          </span>
        )}
      </div>

      <button className="btn-primary trav-btn" onClick={handleContinue} disabled={loading}>
        {loading ? 'Checking...' : 'Continue'}
      </button>
    </>
  );
};

export default MobileStep;
