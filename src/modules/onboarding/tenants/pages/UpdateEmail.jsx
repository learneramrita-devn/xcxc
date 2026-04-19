import { useState } from 'react';

const maskEmail = (email) =>
  email ? email.replace(/(.{2})(.*)(@.*)/, (_, a, b, c) => a + '*'.repeat(b.length) + c) : '';

const UpdateEmail = ({ onBackToSignIn }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setSubmitted(true);
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

      <button className="btn-primary trav-btn" onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
};

export default UpdateEmail;
