import { useState, useEffect, useRef } from 'react';
import OTPInput from './OTPInput';

const MOCK_OTP = '123456';
const TIMER_SECONDS = 60;

const OTPModal = ({ mobile, onClose, onSuccess }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const intervalRef = useRef(null);

  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalRef.current);
  }, []);

  const startTimer = () => {
    setTimer(TIMER_SECONDS);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) { clearInterval(intervalRef.current); return 0; }
        return t - 1;
      });
    }, 1000);
  };

  const maskMobile = (m) => m ? m.replace(/(\d{2})\d{6}(\d{2})/, '$1xxxxxx$2') : '';

  const handleVerify = () => {
    if (otp.length < 6) { setError('Please enter the 6-digit OTP'); return; }
    if (otp !== MOCK_OTP) { setError('Invalid OTP. Please try again'); return; }
    onSuccess();
  };

  return (
    <>
      <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1F2937', marginBottom: '6px' }}>Verify OTP</h2>
      <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '8px' }}>
        OTP sent to <strong>{maskMobile(mobile)}</strong>
      </p>
      <p style={{ fontSize: '12px', background: '#FEF9EC', border: '1px solid #f19517', borderRadius: '6px', padding: '8px 12px', color: '#92400E', marginBottom: '16px' }}>
        Demo OTP: <strong>123456</strong>
      </p>

      <OTPInput length={6} onChange={setOtp} />

      {error && (
        <span style={{ color: '#E70D0D', fontSize: '12px', margin: '8px 0', display: 'block', textAlign: 'center' }}>
          {error}
        </span>
      )}

      <div style={{ textAlign: 'center', fontSize: '13px', color: '#6B7280', margin: '12px 0' }}>
        {timer > 0
          ? <>OTP expires in <strong style={{ color: '#f19517' }}>00:{String(timer).padStart(2, '0')}</strong></>
          : <span onClick={() => { setOtp(''); setError(''); startTimer(); }} style={{ color: '#f19517', cursor: 'pointer', fontWeight: 600 }}>Resend OTP</span>
        }
      </div>

      <button className="btn-primary trav-btn" onClick={handleVerify}>Continue</button>

      <div className="trav_form-footer" style={{ justifyContent: 'center', marginTop: '12px' }}>
        <span onClick={onClose} style={{ cursor: 'pointer', fontSize: '13px', color: '#6B7280' }}>← Back</span>
      </div>
    </>
  );
};

export default OTPModal;
