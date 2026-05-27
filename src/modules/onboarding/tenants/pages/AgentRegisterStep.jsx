import { useState } from 'react';
import StepBar from '../components/StepBar';
import FormRenderer from '../components/FormRenderer';
import TermsCheckbox from '../components/TermsCheckbox';
import {
  STEP1_FIELDS, API_PARTNER_STEP1_FIELDS, WHITELABEL_STEP1_FIELDS,
  CORPORATE_STEP1_FIELDS, REGISTRATION_TYPES, USER_TYPE_OPTIONS, AGENT_TYPE_LABELS,
} from '../constants/formConfig';
import { validateFields } from '../services/validationService';

const FIELDS_MAP = {
  [REGISTRATION_TYPES.AGENCY]:     STEP1_FIELDS,
  [REGISTRATION_TYPES.API_PARTNER]: API_PARTNER_STEP1_FIELDS,
  [REGISTRATION_TYPES.WHITELABEL]:  WHITELABEL_STEP1_FIELDS,
  [REGISTRATION_TYPES.CORPORATE]:   CORPORATE_STEP1_FIELDS,
};

const AgentRegisterStep = ({ onNext, goToLogin, registrationType: initialType, initialData = {} }) => {
  const [selectedType, setSelectedType] = useState(initialData.selectedAgentType || initialType || '');
  const [form, setForm] = useState({
    agencyName: initialData.agencyName || '',
    companyName: initialData.companyName || '',
    firstName: initialData.firstName || '',
    lastName: initialData.lastName || '',
    email: initialData.email || '',
    referralCode: initialData.referralCode || '',
    userType: initialData.userType || '',
    gender: initialData.gender || '',
    dob: initialData.dob || '',
  });
  const [errors, setErrors] = useState({});

  const regType = initialType || selectedType;
  const fields = FIELDS_MAP[regType] || [];

  // Dynamic userType options based on selected agentType
  const userTypeOptions = USER_TYPE_OPTIONS[regType] || [];

  // Inject dynamic userType options into fields
  const resolvedFields = fields.map((f) =>
    f.name === 'userType' ? { ...f, options: userTypeOptions } : f
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleNext = () => {
    if (!regType) { setErrors({ agentType: 'Please select a business type' }); return; }
    const errs = validateFields(resolvedFields, form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onNext({ ...form, selectedAgentType: regType });
  };

  return (
    <>
      <StepBar total={3} current={1} />

      {/* Show agentType selector only when coming from Login/Signup (no initialType) */}
      {!initialType && (
        <div className="trav_form-group">
          <label className="form_label">Business Type <span style={{ color: '#E70D0D' }}>*</span></label>
          <select
            className="form-select"
            value={selectedType}
            onChange={(e) => { setSelectedType(e.target.value); setForm((p) => ({ ...p, userType: '' })); setErrors({}); }}
          >
            <option value="">Select Business Type</option>
            {AGENT_TYPE_LABELS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {errors.agentType && <span style={{ color: '#E70D0D', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.agentType}</span>}
        </div>
      )}

      {/* Show fields only after type is selected */}
      {regType && (
        <FormRenderer fields={resolvedFields} form={form} errors={errors} onChange={handleChange} />
      )}

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
