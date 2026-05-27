import { useState, useRef, useEffect } from 'react';

const TermsAgreement = ({ onAccept, loading }) => {
  const [scrolled, setScrolled] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const boxRef = useRef(null);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const onScroll = () => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) setScrolled(true);
    };
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const handleContinue = () => {
    if (!agreed) { setError('Please accept the Terms & Conditions to continue.'); return; }
    onAccept();
  };

  return (
    <>
      <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px', color: '#1F2937' }}>
        Agreement Draft
      </h3>
      <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '12px' }}>
        Please read and accept the Terms & Conditions to proceed.
      </p>

      <div
        ref={boxRef}
        style={{
          height: '260px', overflowY: 'auto', border: '1px solid #E5E7EB',
          borderRadius: '8px', padding: '16px', fontSize: '13px',
          color: '#374151', lineHeight: '22px', background: '#F9FAFB',
          marginBottom: '16px',
        }}
      >
        <strong>Terms & Conditions</strong>
        <p style={{ marginTop: '10px' }}>
          Welcome to our Travel Agent Platform. By registering and using this platform, you agree to the following terms and conditions. Please read them carefully before proceeding.
        </p>
        <p style={{ marginTop: '10px' }}>
          <strong>1. Eligibility:</strong> You must be at least 18 years old and a registered travel agent or agency to use this platform. By signing up, you confirm that all information provided is accurate and up to date.
        </p>
        <p style={{ marginTop: '10px' }}>
          <strong>2. Account Responsibility:</strong> You are responsible for maintaining the confidentiality of your login credentials. Any activity under your account is your sole responsibility. Notify us immediately of any unauthorized access.
        </p>
        <p style={{ marginTop: '10px' }}>
          <strong>3. Use of Services:</strong> The platform may only be used for lawful travel booking and agency management purposes. Misuse, fraudulent activity, or violation of any applicable law will result in immediate account termination.
        </p>
        <p style={{ marginTop: '10px' }}>
          <strong>4. Commission & Payments:</strong> Commission rates and payment terms are as agreed upon during onboarding. The platform reserves the right to revise rates with prior notice of 30 days.
        </p>
        <p style={{ marginTop: '10px' }}>
          <strong>5. Privacy Policy:</strong> We collect and process your personal data in accordance with our Privacy Policy. By using this platform, you consent to such processing and warrant that all data provided is accurate.
        </p>
        <p style={{ marginTop: '10px' }}>
          <strong>6. Termination:</strong> We reserve the right to suspend or terminate your account at any time for breach of these terms, fraudulent activity, or any other reason deemed appropriate by the platform administrators.
        </p>
        <p style={{ marginTop: '10px' }}>
          <strong>7. Amendments:</strong> These terms may be updated from time to time. Continued use of the platform after changes constitutes acceptance of the revised terms.
        </p>
        <p style={{ marginTop: '10px' }}>
          By clicking "Continue", you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions and our Privacy Policy.
        </p>
      </div>

      {!scrolled && (
        <p style={{ fontSize: '12px', color: '#f19517', marginBottom: '10px', textAlign: 'center' }}>
          ↓ Scroll down to read all terms
        </p>
      )}

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
        <input
          type="checkbox"
          id="terms-agree"
          checked={agreed}
          onChange={(e) => { setAgreed(e.target.checked); if (e.target.checked) setError(''); }}
          disabled={!scrolled}
          style={{ 
            accentColor: '#f19517', 
            marginTop: '3px', 
            width: '16px', 
            height: '16px', 
            flexShrink: 0,
            cursor: scrolled ? 'pointer' : 'not-allowed',
            opacity: scrolled ? 1 : 0.5
          }}
        />
        <label 
          htmlFor="terms-agree" 
          style={{ 
            fontSize: '13px', 
            color: scrolled ? '#6B7280' : '#9CA3AF', 
            lineHeight: '20px', 
            cursor: scrolled ? 'pointer' : 'not-allowed'
          }}
        >
          I have read and agree to the <span style={{ color: '#f19517', fontWeight: 600 }}>Terms & Conditions</span> and <span style={{ color: '#f19517', fontWeight: 600 }}>Privacy Policy</span>
        </label>
      </div>

      {error && <span style={{ color: '#E70D0D', fontSize: '12px', display: 'block', marginBottom: '12px' }}>{error}</span>}

      <button className="btn-primary trav-btn" onClick={handleContinue} disabled={loading} style={{ marginTop: '8px' }}>
        {loading ? 'Submitting...' : 'Continue'}
      </button>
    </>
  );
};

export default TermsAgreement;
