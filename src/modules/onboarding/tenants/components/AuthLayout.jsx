import React from "react";
import auth from "@/assets/images/auth.svg";
import Footer from '../pages/Footer';

const AuthLayout = ({ children }) => {
    return (
        <section className="trav_onboarding">
            <div className="trav_onboarding__left">
                <img
                    src={auth}
                    alt="illustration"
                    className="trav_onboarding__image"
                />
                <Footer />
            </div>

            <div className="trav_onboarding__right">
                {children}
            </div>
        </section>
    );
};

export default AuthLayout;