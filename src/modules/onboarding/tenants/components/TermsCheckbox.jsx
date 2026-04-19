import { Link } from 'react-router-dom';

const TermsCheckbox = ({ name = 'agreed', checked, onChange, error, showCheckbox = false }) => (
  <>
    <div className="trav_form-group" style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
      {showCheckbox && (
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          style={{ accentColor: '#f19517', marginTop: '3px', width: '16px', height: '16px', flexShrink: 0 }}
        />
      )}
      <span style={{ fontSize: '13px', color: '#6B7280', lineHeight: '20px' }}>
        By continuing you Agree to{' '}
        <Link to="/terms" style={{ color: '#f19517', textDecoration: 'none' }}>Terms</Link>
        {' & '}
        <Link to="/privacy" style={{ color: '#f19517', textDecoration: 'none' }}>Privacy</Link>
      </span>
    </div>
    {error && <span style={{ color: '#E70D0D', fontSize: '12px', marginTop: '4px', display: 'block' }}>{error}</span>}
  </>
);

export default TermsCheckbox;
