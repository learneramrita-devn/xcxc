import { useState, useEffect } from 'react';
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
import { registerUser } from '../services/onboardingService';
import Toast from '../../../../shared/components/Toast';
import RegistrationSuccess from './RegistrationSuccess';
import UpdateEmail from './UpdateEmail';
import { useAuth } from '../../../../app/providers/AuthContext';
import { REGISTRATION_TYPES } from '../constants/formConfig';
import SEOMeta from '../../../../shared/components/SEOMeta';

const STEPS = {
  MOBILE:        'mobile',
  LOGIN_PASSWORD:'login_password',
  OTP:           'otp',          // only for register flow
  REGISTER_1:    'register_1',
  REGISTER_2:    'register_2',
  REGISTER_3:    'register_3',
  TERMS:         'terms',
  SUCCESS:       'success',
  UPDATE_EMAIL:  'update_email',
};

const getStepContent = (regType) => ({
  [STEPS.MOBILE]:        { heading: 'Login / Sign up',  subheading: 'Log in or create an account using your mobile number' },
  [STEPS.LOGIN_PASSWORD]:{ heading: 'Login',            subheading: '' },
  [STEPS.OTP]:           { heading: 'OTP Verification', subheading: '' },
  [STEPS.REGISTER_1]:    {
    heading: regType === REGISTRATION_TYPES.API_PARTNER ? 'API Partner Sign Up'
           : regType === REGISTRATION_TYPES.WHITELABEL  ? 'Whitelabel Partner Sign Up'
           : regType === REGISTRATION_TYPES.CORPORATE   ? 'Corporate Sign Up'
           : 'Agent Sign Up',
    subheading: 'Please enter your Basic Details to sign up',
  },
  [STEPS.REGISTER_2]:    {
    heading: regType === REGISTRATION_TYPES.API_PARTNER ? 'API Partner Sign Up'
           : regType === REGISTRATION_TYPES.WHITELABEL  ? 'Whitelabel Partner Sign Up'
           : regType === REGISTRATION_TYPES.CORPORATE   ? 'Corporate Sign Up'
           : 'Agent Sign Up',
    subheading: 'Please enter your Agency Details to sign up',
  },
  [STEPS.REGISTER_3]:    {
    heading: regType === REGISTRATION_TYPES.API_PARTNER ? 'API Partner Sign Up'
           : regType === REGISTRATION_TYPES.WHITELABEL  ? 'Whitelabel Partner Sign Up'
           : regType === REGISTRATION_TYPES.CORPORATE   ? 'Corporate Sign Up'
           : 'Agent Sign Up',
    subheading: 'Create Strong Password for Login',
  },
  [STEPS.TERMS]:         { heading: 'Terms & Conditions', subheading: '' },
  [STEPS.SUCCESS]:       { heading: '', subheading: '' },
  [STEPS.UPDATE_EMAIL]:  { heading: '', subheading: '' },
});

const RegistrationForm = ({ registrationType: initialType = null }) => {
  const STORAGE_KEY = 'registrationFormData';
  
  const getSavedData = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  };

  const savedData = getSavedData();
  const [step, setStep] = useState(savedData.step || STEPS.MOBILE);
  const [mobile, setMobile] = useState(savedData.mobile || '');
  const [tenantId, setTenantId] = useState(savedData.tenantId || null);
  const [loginType, setLoginType] = useState(savedData.loginType || 'USER');
  const [registerData, setRegisterData] = useState(savedData.registerData || {});
  const [registeredUserId, setRegisteredUserId] = useState(savedData.registeredUserId || null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [registrationType, setRegistrationType] = useState(savedData.registrationType || initialType);

  const navigate = useNavigate();
  const { login } = useAuth();
  const stepContent = getStepContent(registrationType);
  const showToast = (message, type) => setToast({ message, type });

  useEffect(() => {
    const dataToSave = { step, mobile, tenantId, loginType, registerData, registeredUserId, registrationType };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [step, mobile, tenantId, loginType, registerData, registeredUserId, registrationType]);

  useEffect(() => {
    if (step === STEPS.SUCCESS) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [step]);

  const handleStep1Next = (d) => {
    // if came from Login/Signup, update registrationType from selected type
    if (!initialType && d.selectedAgentType) {
      setRegistrationType(d.selectedAgentType);
    }
    setRegisterData((p) => ({ ...p, ...d }));
    setStep(STEPS.REGISTER_2);
  };
  const handleStep2Next = (d) => { setRegisterData((p) => ({ ...p, ...d })); setStep(STEPS.REGISTER_3); };
  const handleStep3Submit = (password) => { setRegisterData((p) => ({ ...p, password })); setStep(STEPS.TERMS); };

  const handleTermsAccept = async () => {
    if (!mobile) {
      showToast('Mobile number is required', 'error');
      return;
    }
    
    if (!registerData.email) {
      showToast('Email is required', 'error');
      return;
    }
    
    if (!registerData.password) {
      showToast('Password is required', 'error');
      return;
    }
    
    setLoading(true);
    try {
      const res = await registerUser({ mobile, tenantId, form: registerData, registrationType });
      
      const regType = registrationType || registerData.selectedAgentType;
      const isTenant = ['api_partner', 'whitelabel', 'corporate'].includes(regType);
      const successMessage = isTenant ? 'Tenant successfully created!' : 'User successfully created!';
      
      showToast(successMessage, 'success');
      
      setRegisteredUserId(res?.userId || res?.tenantId || null);
      
      setTimeout(() => {
        setStep(STEPS.SUCCESS);
      }, 1500);
      
    } catch (err) {
      if (err.status === 401 || err.errCode === '29') {
        showToast('Registration failed. Please check your details and try again.', 'error');
      } else {
        showToast(err.message || 'Registration failed. Please try again.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const hideHeader = [STEPS.SUCCESS, STEPS.UPDATE_EMAIL].includes(step);

  return (
    <AuthLayout>
      <SEOMeta
        title="Register – Create Your Travel Account – TravelApp"
        description="Sign up on TravelApp as a Travel Agent, API Partner, Whitelabel Partner or Corporate. Get access to exclusive travel deals and booking tools."
      />
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
          {/* Step 1: Mobile — exist → password login, not exist → toast + register button */}
          {step === STEPS.MOBILE && (
            <MobileStep
              onContinue={() => setStep(STEPS.LOGIN_PASSWORD)}
              onRegister={() => setStep(STEPS.OTP)}
              onMobileCapture={setMobile}
              onTenantCapture={setTenantId}
              onLoginTypeCapture={setLoginType}
              onToast={showToast}
              initialMobile={mobile}
            />
          )}

          {/* Step 2A: Login with password (existing user) */}
          {step === STEPS.LOGIN_PASSWORD && (
            <PasswordStep
              prevStep={() => setStep(STEPS.MOBILE)}
              onToast={showToast}
              mobile={mobile}
              loginType={loginType}
            />
          )}

          {/* Step 2B: OTP — only for register flow */}
          {step === STEPS.OTP && (
            <OTPModal
              mobile={mobile}
              onClose={() => setStep(STEPS.MOBILE)}
              onSuccess={() => setStep(STEPS.REGISTER_1)}
            />
          )}

          {step === STEPS.REGISTER_1 && (
            <AgentRegisterStep
              onNext={handleStep1Next}
              goToLogin={() => setStep(STEPS.MOBILE)}
              registrationType={initialType}
              initialData={registerData}
            />
          )}

          {step === STEPS.REGISTER_2 && (
            <Step2AgencyDetails
              onNext={handleStep2Next}
              onBack={() => setStep(STEPS.REGISTER_1)}
              initialData={registerData}
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
            <UpdateEmail
              userId={registeredUserId}
              onBackToSignIn={() => setStep(STEPS.MOBILE)}
              onToast={showToast}
            />
          )}
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegistrationForm;
