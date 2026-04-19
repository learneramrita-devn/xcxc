import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './_header.scss';
import { useAuth } from '../../app/providers/AuthContext';

const NAV_TABS = [
  {
    label: 'Flights',
    path: '/flights',
    icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" /></svg>,
  },
  {
    label: 'Hotels',
    path: '/hotels',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 22V8l9-6 9 6v14" /><path d="M9 22V12h6v10" /></svg>,
  },
  {
    label: 'Bus',
    path: '/bus',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="13" rx="2" /><path d="M3 10h18M8 19l-1 2m10-2 1 2M8 5V3m8 2V3" /></svg>,
  },
  {
    label: 'Trains',
    path: '/trains',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="14" rx="3" /><path d="M4 11h16M8 17l-2 4m10-4 2 4M12 3v8" /></svg>,
  },
  {
    label: 'Travel Insurance',
    path: '/insurance',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  },
];

const BUSINESS_OPTIONS = [
  {
    label: 'Travel Agent Portal',
    desc: 'Best Deal for Travel Agents Partners & Distributors',
    path: '/agency/register',
  },
  {
    label: 'API Partners',
    desc: 'Explore Seamless API Integration with best in class APIs',
    path: '/api-partner/register',
  },
  {
    label: 'White Label Solutions',
    desc: 'Get your Travel Business live within a day',
    path: '/whitelabel/register',
  },
  {
    label: 'Corporates & Expense Management',
    desc: 'One Stop Solution for managing your expenses and travels',
    path: '/agency/register',
  },
];

export default function Header() {
  const [businessOpen, setBusinessOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const dropdownRef = useRef(null);
  const accountRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setBusinessOpen(false);
      if (accountRef.current && !accountRef.current.contains(e.target)) setAccountOpen(false);
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleLogout = () => {
    logout();
    setAccountOpen(false);
    setMobileNavOpen(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header__top">
        <Link to="/" className="header__logo">
          <img src={logo} alt="TravelApp" />
        </Link>

        <nav className={`header__nav${mobileNavOpen ? ' header__nav--open' : ''}`}>
          <Link to="/support" className="header__link" onClick={() => setMobileNavOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18.364 5.636a9 9 0 1 1-12.728 0" /><path d="M12 2v7" /></svg>
            Support
          </Link>
          <Link to="/my-trips" className="header__link" onClick={() => setMobileNavOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg>
            My Trips
          </Link>
          <Link to="/offers" className="header__link" onClick={() => setMobileNavOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            Offers
          </Link>

          {!isLoggedIn && (
            <div className="header__business" ref={dropdownRef}>
              <button
                className={`header__business-trigger${businessOpen ? ' header__business-trigger--open' : ''}`}
                onClick={() => setBusinessOpen((prev) => !prev)}
              >
                Business
                <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {businessOpen && (
                <div className="header__business-dropdown">
                  <div className="header__business-dropdown-header">For Business</div>
                  {BUSINESS_OPTIONS.map((opt) => (
                    <Link
                      key={opt.path}
                      to={opt.path}
                      className="header__business-dropdown-item"
                      onClick={() => { setBusinessOpen(false); setMobileNavOpen(false); }}
                    >
                      <span className="dropdown-item__title">{opt.label}</span>
                      <span className="dropdown-item__desc">{opt.desc}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {isLoggedIn ? (
            <div className="header__business" ref={accountRef}>
              <button
                className={`header__business-trigger${accountOpen ? ' header__business-trigger--open' : ''}`}
                onClick={() => setAccountOpen((prev) => !prev)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                My Account
                <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {accountOpen && (
                <div className="header__business-dropdown">
                  <div className="header__business-dropdown-header">My Account</div>
                  <Link to="/profile" className="header__business-dropdown-item" onClick={() => { setAccountOpen(false); setMobileNavOpen(false); }}>
                    <span className="dropdown-item__title">Profile</span>
                    <span className="dropdown-item__desc">View & edit your profile</span>
                  </Link>
                  <Link to="/my-trips" className="header__business-dropdown-item" onClick={() => { setAccountOpen(false); setMobileNavOpen(false); }}>
                    <span className="dropdown-item__title">My Trips</span>
                    <span className="dropdown-item__desc">View your bookings</span>
                  </Link>
                  <div className="header__business-dropdown-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                    <span className="dropdown-item__title" style={{ color: '#E70D0D' }}>Logout</span>
                    <span className="dropdown-item__desc">Sign out of your account</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/register" className="header__auth-btn" onClick={() => setMobileNavOpen(false)}>Login / Signup</Link>
          )}
        </nav>

        <button className="header__hamburger" onClick={() => setMobileNavOpen((prev) => !prev)} aria-label="Toggle menu">
          {mobileNavOpen
            ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
            : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          }
        </button>
      </div>

      <div className="header__bottom">
        {NAV_TABS.map(({ label, path, icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => `header__tab${isActive ? ' active' : ''}`}
          >
            {icon}
            {label}
          </NavLink>
        ))}
      </div>
    </header>
  );
}
