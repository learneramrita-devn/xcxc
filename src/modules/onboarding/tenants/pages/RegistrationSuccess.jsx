import './_registrationSuccess.scss';

const RegistrationSuccess = ({ email, onEditEmail, onBackToSignIn }) => {
  const maskedEmail = email
    ? email.replace(/(.{2})(.*)(@.*)/, (_, a, b, c) => a + '*'.repeat(b.length) + c)
    : '';

  return (
    <div className="reg-success">
      <div className="reg-success__icon">🎉</div>
      <h2 className="reg-success__title">Hurray!</h2>
      <p className="reg-success__heading">Your Account is Successfully Created</p>
      <p className="reg-success__subtitle">
        You must have received an Activation Email on{' '}
        <strong>{maskedEmail}</strong>, Click and Activate Account
      </p>

      <div className="reg-success__actions">
        <button className="reg-success__edit-btn" onClick={onEditEmail}>
          Edit Email ID
        </button>
        <button className="btn-primary trav-btn" onClick={onBackToSignIn}>
          Back to Sign In
        </button>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
