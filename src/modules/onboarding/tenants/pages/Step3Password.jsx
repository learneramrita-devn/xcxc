import { useState } from 'react';
import StepBar from '../components/StepBar';
import { validatePassword } from '../services/validationService';

const INITIAL_FORM = { password: '', confirmPassword: '' };

const Step3Password = ({ onSubmit, onBack, loading }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = () => {
    const errs = validatePassword(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSubmit(form.password);
  };

  const err = (field) => errors[field] && (
    <span style={{ color: '#E70D0D', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors[field]}</span>
  );

  return (
    <>
      <StepBar total={3} current={3} />

      <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '20px', lineHeight: '20px' }}>
        Use 8 or more characters with a mix of letters, numbers & symbols <strong>"@$%!#*?&"</strong>
      </p>

      <div className="trav_form-group">
        <label className="form_label">Password <span style={{ color: '#E70D0D' }}>*</span></label>
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Enter password" className="form-control" />
        {err('password')}
      </div>

      <div className="trav_form-group">
        <label className="form_label">Confirm Password <span style={{ color: '#E70D0D' }}>*</span></label>
        <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm your password" className="form-control" />
        {err('confirmPassword')}
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button className="btn-primary trav-btn" style={{ background: '#6B7280' }} onClick={onBack}>Back</button>
        <button className="btn-primary trav-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Submitting...' : 'Continue'}
        </button>
      </div>
    </>
  );
};

export default Step3Password;
