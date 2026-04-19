import { useState } from 'react';
import { REGISTRATION_TYPES } from '../constants/formConfig';

const OPTIONS = [
  {
    type: REGISTRATION_TYPES.AGENCY,
    label: 'Travel Agent',
    desc: 'For Travel Agents, Partners & Distributors',
    icon: '🏢',
  },
  {
    type: REGISTRATION_TYPES.API_PARTNER,
    label: 'API Partner',
    desc: 'Seamless API Integration for your platform',
    icon: '🔗',
  },
  {
    type: REGISTRATION_TYPES.WHITELABEL,
    label: 'Whitelabel Partner',
    desc: 'Get your Travel Business live within a day',
    icon: '🏷️',
  },
];

const AccountTypeSelect = ({ onSelect, onBack }) => {
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (!selected) { setError('Please select an account type to continue'); return; }
    onSelect(selected);
  };

  return (
    <>
      <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '20px' }}>
        Select the type of account you want to create.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
        {OPTIONS.map((opt) => (
          <div
            key={opt.type}
            onClick={() => { setSelected(opt.type); setError(''); }}
            style={{
              display: 'flex', alignItems: 'center', gap: '14px',
              padding: '14px 16px', borderRadius: '10px', cursor: 'pointer',
              border: `2px solid ${selected === opt.type ? '#f19517' : '#E5E7EB'}`,
              background: selected === opt.type ? '#FEF9EC' : '#fff',
              transition: 'all 0.2s',
            }}
          >
            <span style={{ fontSize: '28px' }}>{opt.icon}</span>
            <div>
              <p style={{ fontWeight: 600, fontSize: '14px', color: '#1F2937', margin: 0 }}>{opt.label}</p>
              <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>{opt.desc}</p>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <div style={{
                width: '18px', height: '18px', borderRadius: '50%',
                border: `2px solid ${selected === opt.type ? '#f19517' : '#D1D5DB'}`,
                background: selected === opt.type ? '#f19517' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {selected === opt.type && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {error && <span style={{ color: '#E70D0D', fontSize: '12px', display: 'block', marginBottom: '12px' }}>{error}</span>}

      <button className="btn-primary trav-btn" onClick={handleContinue}>Continue</button>

      <div className="trav_form-footer" style={{ justifyContent: 'center', marginTop: '12px' }}>
        <span onClick={onBack} style={{ cursor: 'pointer', fontSize: '13px', color: '#6B7280' }}>← Back</span>
      </div>
    </>
  );
};

export default AccountTypeSelect;
