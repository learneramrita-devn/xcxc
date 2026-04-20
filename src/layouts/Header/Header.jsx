import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import flightIcon from '../../assets/images/flight-icon.svg';
import hotelIcon from '../../assets/images/hotel-icon.svg';
import busIcon from '../../assets/images/bus-icon.svg';
import trainIcon from '../../assets/images/train-icon.svg';
import insuranceIcon from '../../assets/images/travel-insurance-icon.svg';
import './_header.scss';
import { useAuth } from '../../app/providers/AuthContext';

const NAV_TABS = [
  { label: 'Flights', path: '/flights', icon: flightIcon },
  { label: 'Hotels', path: '/hotels', icon: hotelIcon },
  { label: 'Bus', path: '/bus', icon: busIcon },
  { label: 'Trains', path: '/trains', icon: trainIcon },
  { label: 'Travel Insurance', path: '/insurance', icon: insuranceIcon },
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
    path: '/corporate/register',
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Support
          </Link>
          <Link to="/my-trips" className="header__link" onClick={() => setMobileNavOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            My Trips
          </Link>
          <Link to="/offers" className="header__link" onClick={() => setMobileNavOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
            Offers
          </Link>

          {!isLoggedIn && (
            <div className="header__business" ref={dropdownRef}>
              <button
                className={`header__business-trigger${businessOpen ? ' header__business-trigger--open' : ''}`}
                onClick={() => setBusinessOpen((prev) => !prev)}
              >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
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
            <img src={icon} alt={label} />
            {label}
          </NavLink>
        ))}
      </div>
    </header>
  );
}
