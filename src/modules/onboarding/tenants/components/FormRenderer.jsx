const FormRenderer = ({ fields, form, errors, onChange }) => {
  const err = (field) => errors[field] && (
    <span style={{ color: '#E70D0D', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors[field]}</span>
  );

  return (
    <div className="row">
      {fields.map((field) => {
        if (field.showIf && !field.showIf(form)) return null;
        return (
          <div key={field.name} className={`trav_form-group col-md-${field.col}`}>
            <label className="form_label">
              {field.label}
              {field.required && <span style={{ color: '#E70D0D' }}> *</span>}
            </label>

            {field.type === 'select' ? (
              <select name={field.name} value={form[field.name] || ''} onChange={onChange} className="form-select">
                <option value="">{field.placeholder}</option>
                {field.options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={form[field.name] || ''}
                onChange={onChange}
                placeholder={field.placeholder}
                className="form-control"
                min={field.type === 'number' ? 1 : undefined}
              />
            )}
            {err(field.name)}
          </div>
        );
      })}
    </div>
  );
};

export default FormRenderer;
