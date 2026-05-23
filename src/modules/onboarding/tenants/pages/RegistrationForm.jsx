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
  const [step, setStep] = useState(() => {
    const saved = sessionStorage.getItem('registrationStep');
    return saved || STEPS.MOBILE;
  });
  const [mobile, setMobile] = useState(() => sessionStorage.getItem('registrationMobile') || '');
  const [tenantId, setTenantId] = useState(() => {
    const saved = sessionStorage.getItem('registrationTenantId');
    return saved ? Number(saved) : null;
  });
  const [loginType, setLoginType] = useState(() => sessionStorage.getItem('registrationLoginType') || 'user');
  const [registerData, setRegisterData] = useState(() => {
    const saved = sessionStorage.getItem('registrationData');
    return saved ? JSON.parse(saved) : {};
  });
  const [registeredUserId, setRegisteredUserId] = useState(() => {
    const saved = sessionStorage.getItem('registeredUserId');
    return saved ? Number(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [registrationType, setRegistrationType] = useState(() => {
    const saved = sessionStorage.getItem('registrationType');
    return saved || initialType;
  });

  const navigate = useNavigate();
  const { login } = useAuth();
  const stepContent = getStepContent(registrationType);
  const showToast = (message, type) => setToast({ message, type });

  // Persist state to sessionStorage
  const updateStep = (newStep) => {
    setStep(newStep);
    sessionStorage.setItem('registrationStep', newStep);
  };

  const updateMobile = (newMobile) => {
    setMobile(newMobile);
    sessionStorage.setItem('registrationMobile', newMobile);
  };

  const updateTenantId = (newTenantId) => {
    setTenantId(newTenantId);
    sessionStorage.setItem('registrationTenantId', newTenantId);
  };

  const updateLoginType = (newLoginType) => {
    setLoginType(newLoginType);
    sessionStorage.setItem('registrationLoginType', newLoginType);
  };

  const updateRegisterData = (newData) => {
    setRegisterData(newData);
    sessionStorage.setItem('registrationData', JSON.stringify(newData));
  };

  const updateRegistrationType = (newType) => {
    setRegistrationType(newType);
    sessionStorage.setItem('registrationType', newType);
  };

  const clearRegistrationData = () => {
    sessionStorage.removeItem('registrationStep');
    sessionStorage.removeItem('registrationMobile');
    sessionStorage.removeItem('registrationTenantId');
    sessionStorage.removeItem('registrationLoginType');
    sessionStorage.removeItem('registrationData');
    sessionStorage.removeItem('registeredUserId');
    sessionStorage.removeItem('registrationType');
  };

  const handleStep1Next = (d) => {
    // if came from Login/Signup, update registrationType from selected type
    if (!initialType && d.selectedAgentType) {
      updateRegistrationType(d.selectedAgentType);
    }
    const newData = { ...registerData, ...d };
    updateRegisterData(newData);
    updateStep(STEPS.REGISTER_2);
  };
  const handleStep2Next = (d) => {
    const newData = { ...registerData, ...d };
    updateRegisterData(newData);
    updateStep(STEPS.REGISTER_3);
  };
  const handleStep3Submit = (password) => {
    const newData = { ...registerData, password };
    updateRegisterData(newData);
    updateStep(STEPS.TERMS);
  };

  const handleTermsAccept = async () => {
    setLoading(true);
    try {
      const res = await registerUser({ mobile, tenantId, form: registerData, registrationType });
      const userId = res?.userId || null;
      setRegisteredUserId(userId);
      sessionStorage.setItem('registeredUserId', userId);
      updateStep(STEPS.SUCCESS);
    } catch (err) {
      showToast(err.message, 'error');
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
          <form onSubmit={(e) => e.preventDefault()}>

            {/* Step 1: Mobile — exist → password login, not exist → toast + register button */}
            {step === STEPS.MOBILE && (
              <MobileStep
                onContinue={() => updateStep(STEPS.LOGIN_PASSWORD)}
                onRegister={() => updateStep(STEPS.OTP)}
                onMobileCapture={updateMobile}
                onTenantCapture={updateTenantId}
                onLoginTypeCapture={updateLoginType}
                onToast={showToast}
              />
            )}

            {/* Step 2A: Login with password (existing user) */}
            {step === STEPS.LOGIN_PASSWORD && (
              <PasswordStep
                prevStep={() => updateStep(STEPS.MOBILE)}
                onToast={showToast}
                mobile={mobile}
                loginType={loginType}
              />
            )}

            {/* Step 2B: OTP — only for register flow */}
            {step === STEPS.OTP && (
              <OTPModal
                mobile={mobile}
                onClose={() => updateStep(STEPS.MOBILE)}
                onSuccess={() => updateStep(STEPS.REGISTER_1)}
              />
            )}

            {step === STEPS.REGISTER_1 && (
              <AgentRegisterStep
                onNext={handleStep1Next}
                goToLogin={() => { clearRegistrationData(); updateStep(STEPS.MOBILE); }}
                registrationType={initialType}
                initialData={registerData}
              />
            )}

            {step === STEPS.REGISTER_2 && (
              <Step2AgencyDetails
                onNext={handleStep2Next}
                onBack={() => updateStep(STEPS.REGISTER_1)}
                initialData={registerData}
              />
            )}

            {step === STEPS.REGISTER_3 && (
              <Step3Password
                onSubmit={handleStep3Submit}
                onBack={() => updateStep(STEPS.REGISTER_2)}
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
                onEditEmail={() => updateStep(STEPS.UPDATE_EMAIL)}
                onBackToSignIn={() => { clearRegistrationData(); updateStep(STEPS.MOBILE); }}
              />
            )}

            {step === STEPS.UPDATE_EMAIL && (
              <UpdateEmail
                userId={registeredUserId}
                onBackToSignIn={() => { clearRegistrationData(); updateStep(STEPS.MOBILE); }}
                onToast={showToast}
              />
            )}

          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegistrationForm;
