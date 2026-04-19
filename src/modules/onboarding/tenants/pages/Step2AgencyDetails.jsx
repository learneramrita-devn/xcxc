import { useState } from 'react';
import StepBar from '../components/StepBar';
import FormRenderer from '../components/FormRenderer';
import TermsCheckbox from '../components/TermsCheckbox';
import { FIRM_TYPE_FIELDS } from '../constants/formConfig';
import { FIRM_TYPES } from '../constants/onboardingSteps';
import { validateFields } from '../services/validationService';

const INITIAL_FORM = { firmType: '' };

const Step2AgencyDetails = ({ onNext, onBack }) => {
  const [form, setForm] = useState({ firmType: 'Proprietor' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => {
      if (name === 'firmType') { setErrors({}); return { firmType: value }; }
      return { ...p, [name]: value };
    });
  };

  const activeFields = form.firmType ? FIRM_TYPE_FIELDS[form.firmType].filter((f) => f.name !== 'firmType') : [];

  const handleNext = () => {
    if (!form.firmType) { setErrors({ firmType: 'Firm type is required' }); return; }
    const errs = validateFields(activeFields, form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onNext(form);
  };

  return (
    <>
      <StepBar total={3} current={2} />

      {/* Firm Type Selector */}
      <div className="row">
        <div className="trav_form-group col-md-6">
          <label className="form_label">Firm Type <span style={{ color: '#E70D0D' }}>*</span></label>
          <select name="firmType" value={form.firmType} onChange={handleChange} className="form-select">
            <option value="">Select Firm Type</option>
            {FIRM_TYPES.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
          {errors.firmType && <span style={{ color: '#E70D0D', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.firmType}</span>}
        </div>
      </div>

      {/* Dynamic fields based on firm type — skip firmType field since already rendered above */}
      {form.firmType && (
        <FormRenderer
          fields={activeFields}
          form={form}
          errors={errors}
          onChange={handleChange}
        />
      )}

      <TermsCheckbox />

      <div style={{ display: 'flex', gap: '12px' }}>
        <button className="btn-primary trav-btn" style={{ background: '#6B7280' }} onClick={onBack}>Back</button>
        <button className="btn-primary trav-btn" onClick={handleNext}>Continue</button>
      </div>
    </>
  );
};

export default Step2AgencyDetails;
