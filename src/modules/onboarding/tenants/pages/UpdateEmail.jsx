import { useState } from 'react';
import { updateEmailApi } from '../api/onboardingApi';

const maskEmail = (email) =>
  email ? email.replace(/(.{2})(.*)(@.*)/, (_, a, b, c) => a + '*'.repeat(b.length) + c) : '';

const UpdateEmail = ({ userId, onBackToSignIn, onToast }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await updateEmailApi({ userId, email });
      setSubmitted(true);
    } catch (err) {
      onToast?.(err.message || 'Failed to update email', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="reg-success">
        <div className="reg-success__icon">✅</div>
        <h2 className="reg-success__title">Email ID Updated</h2>
        <p className="reg-success__subtitle">
          You must have received an Activation Email on{' '}
          <strong>{maskEmail(email)}</strong>, Click and Activate Account
        </p>
        <button className="btn-primary trav-btn" onClick={onBackToSignIn}>
          Back to Sign In
        </button>
      </div>
    );
  }

  return (
    <>
      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1F2937', marginBottom: '6px' }}>
        Update Email ID
      </h3>
      <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '20px' }}>
        Enter your new email address below.
      </p>

      <div className="trav_form-group">
        <label className="form_label">
          Email Address <span style={{ color: '#E70D0D' }}>*</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(''); }}
          placeholder="Enter new email address"
          className="form-control"
        />
        {error && (
          <span style={{ color: '#E70D0D', fontSize: '12px', marginTop: '4px', display: 'block' }}>
            {error}
          </span>
        )}
      </div>

      <button className="btn-primary trav-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Updating...' : 'Submit'}
      </button>
    </>
  );
};

export default UpdateEmail;
