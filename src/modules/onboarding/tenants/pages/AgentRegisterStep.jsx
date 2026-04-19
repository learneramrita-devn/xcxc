import { useState } from 'react';
import StepBar from '../components/StepBar';
import FormRenderer from '../components/FormRenderer';
import TermsCheckbox from '../components/TermsCheckbox';
import { STEP1_FIELDS, API_PARTNER_STEP1_FIELDS, WHITELABEL_STEP1_FIELDS, REGISTRATION_TYPES } from '../constants/formConfig';
import { validateFields } from '../services/validationService';

const INITIAL_FORM = {
  agencyName: '', companyName: '', brandName: '', domainName: '',
  agentType: '', distributorAgents: '',
  firstName: '', lastName: '', email: '', referralCode: '',
  websiteUrl: '', techContact: '', supportEmail: '',
};

const FIELDS_MAP = {
  [REGISTRATION_TYPES.AGENCY]:     STEP1_FIELDS,
  [REGISTRATION_TYPES.API_PARTNER]: API_PARTNER_STEP1_FIELDS,
  [REGISTRATION_TYPES.WHITELABEL]:  WHITELABEL_STEP1_FIELDS,
};

const AgentRegisterStep = ({ onNext, goToLogin, registrationType }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const fields = FIELDS_MAP[registrationType] || STEP1_FIELDS;

  const handleNext = () => {
    const errs = validateFields(fields, form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onNext(form);
  };

  return (
    <>
      <StepBar total={3} current={1} />
      <FormRenderer fields={fields} form={form} errors={errors} onChange={handleChange} />
      <TermsCheckbox />

      <button className="btn-primary trav-btn" onClick={handleNext}>Continue</button>

      <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#6B7280' }}>
        Already have an account?{' '}
        <span onClick={goToLogin} style={{ color: '#f19517', cursor: 'pointer', fontWeight: 600 }}>Sign In</span>
      </p>
    </>
  );
};

export default AgentRegisterStep;
