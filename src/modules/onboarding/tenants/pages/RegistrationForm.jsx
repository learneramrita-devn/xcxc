import { useState } from 'react';
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
import { REGISTRATION_TYPES } from '../constants/formConfig';

const STEPS = {
  MOBILE: 'mobile',
  LOGIN_PASSWORD: 'login_password',
  REGISTER_1: 'register_1',
  REGISTER_2: 'register_2',
  REGISTER_3: 'register_3',
  TERMS: 'terms',
  SUCCESS: 'success',
  UPDATE_EMAIL: 'update_email',
};

const getStepContent = (regType) => ({
  [STEPS.MOBILE]:         { heading: 'Login / Sign up',  subheading: 'Log in or create an account using your mobile number' },
  [STEPS.LOGIN_PASSWORD]: { heading: 'Login',             subheading: '' },
  [STEPS.REGISTER_1]:     {
    heading: regType === REGISTRATION_TYPES.API_PARTNER ? 'API Partner Sign Up'
           : regType === REGISTRATION_TYPES.WHITELABEL  ? 'Whitelabel Partner Sign Up'
           : 'Agency Sign Up',
    subheading: 'Please enter your Basic Details to sign up',
  },
  [STEPS.REGISTER_2]:     {
    heading: regType === REGISTRATION_TYPES.API_PARTNER ? 'API Partner Sign Up'
           : regType === REGISTRATION_TYPES.WHITELABEL  ? 'Whitelabel Partner Sign Up'
           : 'Agency Sign Up',
    subheading: 'Please enter your Agency Details to sign up',
  },
  [STEPS.REGISTER_3]:     {
    heading: regType === REGISTRATION_TYPES.API_PARTNER ? 'API Partner Sign Up'
           : regType === REGISTRATION_TYPES.WHITELABEL  ? 'Whitelabel Partner Sign Up'
           : 'Agency Sign Up',
    subheading: 'Create Strong Password for Login',
  },
  [STEPS.TERMS]:          { heading: 'Terms & Conditions', subheading: '' },
  [STEPS.SUCCESS]:        { heading: '', subheading: '' },
  [STEPS.UPDATE_EMAIL]:   { heading: '', subheading: '' },
});

const RegistrationForm = ({ registrationType = REGISTRATION_TYPES.AGENCY }) => {
  const [step, setStep] = useState(STEPS.MOBILE);
  const [mobile, setMobile] = useState('');
  const [tenantId, setTenantId] = useState(null);
  const [registerData, setRegisterData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [toast, setToast] = useState(null);

  const stepContent = getStepContent(registrationType);

  const showToast = (message, type) => setToast({ message, type });

  const handleStep1Next = (step1Data) => {
    setRegisterData((p) => ({ ...p, ...step1Data }));
    setStep(STEPS.REGISTER_2);
  };

  const handleStep2Next = (step2Data) => {
    setRegisterData((p) => ({ ...p, ...step2Data }));
    setStep(STEPS.REGISTER_3);
  };

  const handleStep3Submit = (password) => {
    setRegisterData((p) => ({ ...p, password }));
    setStep(STEPS.TERMS);
  };

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

  return (
    <AuthLayout>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="trav_form-box">
        <div className="trav_form-header">
          <img src={logo} alt="Logo" />
          {step !== STEPS.SUCCESS && step !== STEPS.UPDATE_EMAIL && (
            <>
              <h2 className="trav_form-heading">{stepContent[step].heading}</h2>
              {stepContent[step].subheading && (
                <p className="trav_form-subheading">{stepContent[step].subheading}</p>
              )}
            </>
          )}
        </div>

        <div className="trav_form-body">
          <form onSubmit={(e) => e.preventDefault()}>
            {step === STEPS.MOBILE && (
              <MobileStep
                nextStep={() => setStep(STEPS.LOGIN_PASSWORD)}
                goToRegister={() => setStep(STEPS.REGISTER_1)}
                onToast={showToast}
                onMobileCapture={setMobile}
                onTenantCapture={setTenantId}
              />
            )}
            {step === STEPS.LOGIN_PASSWORD && (
              <PasswordStep
                openOtpModal={() => setShowOtpModal(true)}
                prevStep={() => setStep(STEPS.MOBILE)}
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
              <UpdateEmail
                onBackToSignIn={() => setStep(STEPS.MOBILE)}
              />
            )}
          </form>
        </div>

        {showOtpModal && <OTPModal onClose={() => setShowOtpModal(false)} />}
      </div>
    </AuthLayout>
  );
};

export default RegistrationForm;
