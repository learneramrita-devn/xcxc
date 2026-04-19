import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import logo from '@/assets/images/logo.png';
import MobileStep from './MobileStep';
import PasswordStep from './PasswordStep';
import AgentRegisterStep from './AgentRegisterStep';
import Step2AgencyDetails from './Step2AgencyDetails';
import Step3Password from './Step3Password';
import TermsAgreement from './TermsAgreement';
import OTPModal from '../components/OTPModal';
import AccountTypeSelect from './AccountTypeSelect';
import { registerUser } from '../services/onboardingService';
import Toast from '../../../../shared/components/Toast';
import RegistrationSuccess from './RegistrationSuccess';
import UpdateEmail from './UpdateEmail';
import { useAuth } from '../../../../app/providers/AuthContext';
import { REGISTRATION_TYPES } from '../constants/formConfig';

const STEPS = {
  MOBILE:       'mobile',
  OTP:          'otp',
  LOGIN_PASSWORD:'login_password',
  ACCOUNT_TYPE: 'account_type',
  REGISTER_1:   'register_1',
  REGISTER_2:   'register_2',
  REGISTER_3:   'register_3',
  TERMS:        'terms',
  SUCCESS:      'success',
  UPDATE_EMAIL: 'update_email',
};

const getStepContent = (regType) => ({
  [STEPS.MOBILE]:        { heading: 'Login / Sign up',     subheading: 'Log in or create an account using your mobile number' },
  [STEPS.OTP]:           { heading: 'OTP Verification',    subheading: '' },
  [STEPS.LOGIN_PASSWORD]:{ heading: 'Login',               subheading: '' },
  [STEPS.ACCOUNT_TYPE]:  { heading: 'Select Account Type', subheading: 'Choose the type of account you want to create' },
  [STEPS.REGISTER_1]:    {
    heading: regType === REGISTRATION_TYPES.API_PARTNER ? 'API Partner Sign Up'
           : regType === REGISTRATION_TYPES.WHITELABEL  ? 'Whitelabel Partner Sign Up'
           : 'Agent Sign Up',
    subheading: 'Please enter your Basic Details to sign up',
  },
  [STEPS.REGISTER_2]:    {
    heading: regType === REGISTRATION_TYPES.API_PARTNER ? 'API Partner Sign Up'
           : regType === REGISTRATION_TYPES.WHITELABEL  ? 'Whitelabel Partner Sign Up'
           : 'Agent Sign Up',
    subheading: 'Please enter your Agency Details to sign up',
  },
  [STEPS.REGISTER_3]:    {
    heading: regType === REGISTRATION_TYPES.API_PARTNER ? 'API Partner Sign Up'
           : regType === REGISTRATION_TYPES.WHITELABEL  ? 'Whitelabel Partner Sign Up'
           : 'Agent Sign Up',
    subheading: 'Create Strong Password for Login',
  },
  [STEPS.TERMS]:         { heading: 'Terms & Conditions',  subheading: '' },
  [STEPS.SUCCESS]:       { heading: '',                    subheading: '' },
  [STEPS.UPDATE_EMAIL]:  { heading: '',                    subheading: '' },
});

const RegistrationForm = ({ registrationType: initialType = null }) => {
  const [step, setStep] = useState(STEPS.MOBILE);
  const [mobile, setMobile] = useState('');
  const [tenantId, setTenantId] = useState(null);
  const [registerData, setRegisterData] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [mobileExists, setMobileExists] = useState(false);
  const [registrationType, setRegistrationType] = useState(initialType || REGISTRATION_TYPES.AGENCY);

  const navigate = useNavigate();
  const { login } = useAuth();
  const stepContent = getStepContent(registrationType);
  const showToast = (message, type) => setToast({ message, type });

  const getRedirectPath = () => {
    if (registrationType === REGISTRATION_TYPES.API_PARTNER ||
        registrationType === REGISTRATION_TYPES.WHITELABEL) return '/dashboard';
    return '/';
  };

  const handleOtpLogin = () => {
    const role = localStorage.getItem('userRole') || '';
    login(localStorage.getItem('authToken'), localStorage.getItem('refreshToken'), role);
    showToast('Login Successful! Welcome back.', 'success');
    setTimeout(() => navigate(getRedirectPath()), 800);
  };

  const handleStep1Next = (d) => { setRegisterData((p) => ({ ...p, ...d })); setStep(STEPS.REGISTER_2); };
  const handleStep2Next = (d) => { setRegisterData((p) => ({ ...p, ...d })); setStep(STEPS.REGISTER_3); };
  const handleStep3Submit = (password) => { setRegisterData((p) => ({ ...p, password })); setStep(STEPS.TERMS); };

  const handleTermsAccept = async () => {
    setLoading(true);
    try {
      await registerUser({ mobile, tenantId, form: registerData, registrationType });
      setStep(STEPS.SUCCESS);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const goToRegister = () => setStep(STEPS.REGISTER_1);

  const hideHeader = [STEPS.SUCCESS, STEPS.UPDATE_EMAIL].includes(step);

  return (
    <AuthLayout>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="trav_form-box">
        <div className="trav_form-header">
          <img src={logo} alt="Logo" />
          {!hideHeader && (
            <>
              <h2 className="trav_form-heading">{stepContent[step]?.heading}</h2>
              {stepContent[step]?.subheading && (
                <p className="trav_form-subheading">{stepContent[step].subheading}</p>
              )}
            </>
          )}
        </div>

        <div className="trav_form-body">
          <form onSubmit={(e) => e.preventDefault()}>

            {step === STEPS.MOBILE && (
              <MobileStep
                onContinue={(isNewUser) => { setMobileExists(!isNewUser); setStep(STEPS.OTP); }}
                onMobileCapture={setMobile}
                onTenantCapture={setTenantId}
                onToast={showToast}
              />
            )}

            {step === STEPS.OTP && (
              <OTPModal
                mobile={mobile}
                onClose={() => setStep(STEPS.MOBILE)}
                onLogin={mobileExists ? handleOtpLogin : null}
                onRegister={!mobileExists ? goToRegister : null}
                onLoginWithPassword={mobileExists ? () => setStep(STEPS.LOGIN_PASSWORD) : null}
              />
            )}

            {step === STEPS.LOGIN_PASSWORD && (
              <PasswordStep
                prevStep={() => setStep(STEPS.MOBILE)}
                onToast={showToast}
                goToRegister={goToRegister}
              />
            )}

            {step === STEPS.ACCOUNT_TYPE && (
              <AccountTypeSelect
                onSelect={(type) => { setRegistrationType(type); setStep(STEPS.REGISTER_1); }}
                onBack={() => setStep(STEPS.MOBILE)}
              />
            )}

            {step === STEPS.REGISTER_1 && (
              <AgentRegisterStep
                onNext={handleStep1Next}
                goToLogin={() => setStep(STEPS.MOBILE)}
                registrationType={registrationType}
              />
            )}

            {step === STEPS.REGISTER_2 && (
              <Step2AgencyDetails
                onNext={handleStep2Next}
                onBack={() => setStep(STEPS.REGISTER_1)}
              />
            )}

            {step === STEPS.REGISTER_3 && (
              <Step3Password
                onSubmit={handleStep3Submit}
                onBack={() => setStep(STEPS.REGISTER_2)}
                loading={loading}
              />
            )}

            {step === STEPS.TERMS && (
              <TermsAgreement
                onAccept={handleTermsAccept}
                loading={loading}
              />
            )}

            {step === STEPS.SUCCESS && (
              <RegistrationSuccess
                email={registerData.email}
                onEditEmail={() => setStep(STEPS.UPDATE_EMAIL)}
                onBackToSignIn={() => setStep(STEPS.MOBILE)}
              />
            )}

            {step === STEPS.UPDATE_EMAIL && (
              <UpdateEmail onBackToSignIn={() => setStep(STEPS.MOBILE)} />
            )}

          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegistrationForm;
