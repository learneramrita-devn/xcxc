import React from "react";
import { Link } from "react-router-dom";
import auth from "@/assets/images/auth.svg";
import Footer from '../pages/Footer';

const AuthLayout = ({ children }) => {
    return (
        <section className="trav_onboarding">
            <div className="trav_onboarding__left">
                <Link to="/" style={{
                    position: 'absolute', top: '20px', left: '20px',
                    display: 'flex', alignItems: 'center', gap: '6px',
                    color: '#fff', textDecoration: 'none', fontSize: '14px',
                    fontWeight: 600, background: 'rgba(0,0,0,0.25)',
                    padding: '8px 14px', borderRadius: '8px', zIndex: 10,
                }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z" />
                        <path d="M9 21V12h6v9" />
                    </svg>
                    Home
                </Link>
                <img src={auth} alt="illustration" className="trav_onboarding__image" />
                <Footer />
            </div>

            <div className="trav_onboarding__right">
                {children}
            </div>
        </section>
    );
};

export default AuthLayout;