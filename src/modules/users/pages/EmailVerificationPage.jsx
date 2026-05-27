import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Toast from '../../../shared/components/Toast';
import { verifyEmailTokenApi, sendOtpApi, verifyOtpApi, activateUserApi } from '../api/verificationApi';
import './_verificationPage.scss';

export default function EmailVerificationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  
  const [step, setStep] = useState('verifying'); // verifying, otp, success
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [otp, setOtp] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (token) {
      verifyEmailToken();
    }
  }, [token]);

  const verifyEmailToken = async () => {
    try {
      const response = await verifyEmailTokenApi(token);
      setUserData(response);
      await sendOtpApi(response.mobileNumber);
      setStep('otp');
      showToast('OTP sent to your registered mobile number', 'success');
    } catch (err) {
      showToast(err.message || 'Invalid or expired verification link', 'error');
      setTimeout(() => navigate('/login'), 3000);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      showToast('Please enter valid 6-digit OTP', 'error');
      return;
    }

    setLoading(true);
    try {
      await verifyOtpApi(userData.mobileNumber, otp);
      await activateUserApi(userData.userId);
      setStep('success');
      showToast('Verification completed successfully!', 'success');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      showToast(err.message || 'Invalid OTP', 'error');
    } finally {
      setLoading(false);
    }
  };



  const showToast = (message, type) => setToast({ message, type });

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="verification-page">
        <div className="verification-card">
          {step === 'verifying' && (
            <div className="verification-step">
              <div className="spinner"></div>
              <h2>Verifying Email...</h2>
              <p>Please wait while we verify your email address</p>
            </div>
          )}

          {step === 'otp' && (
            <div className="verification-step">
              <div className="icon-success">📱</div>
              <h2>Verify Mobile Number</h2>
              <p>Enter the OTP sent to {userData?.mobileNumber}</p>
              
              <form onSubmit={handleVerifyOtp}>
                <div className="otp-input-group">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    required
                  />
                </div>
                
                <button type="submit" className="btn-verify" disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify & Continue'}
                </button>
              </form>
            </div>
          )}

          {step === 'success' && (
            <div className="verification-step">
              <div className="icon-success">✅</div>
              <h2>Verification Successful!</h2>
              <p>Your account has been activated. You can now login.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
