import React, { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import logo from "@/assets/images/logo.png";
import MobileStep from "./MobileStep";
import PasswordStep from "./PasswordStep";
import OTPStep from "./OTPVerification";
import Footer from "../pages/Footer";

import OTPModal from "../components/OTPModal";



const RegistrationForm = () => {
    const [step, setStep] = useState(1);

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);


    const [showOtpModal, setShowOtpModal] = useState(false);

    const openOtpModal = () => setShowOtpModal(true);
    const closeOtpModal = () => setShowOtpModal(false);

    // 🔥 Dynamic content based on step
    const stepContent = {
        1: {
            heading: "Login / Sign up",
            subheading: "Log in or create an account using your mobile number",
        },
        2: {
            heading: showOtpModal ? "Enter OTP to continue" : "Login",
            subheading: showOtpModal
                ? "Sign up OTP has been sent to your Mobile Number ending ******789"
                : "",
        },
    };
    return (
        <AuthLayout>
            <div className="trav_form-box">

                <div className="trav_form-header">
                    <img src={logo} alt="Logo" />
                    <h2 className="trav_form-heading">
                        {stepContent[step].heading}
                    </h2>
                    <p className="trav_form-subheading">
                        {stepContent[step].subheading}
                    </p>
                </div>

                <div className="trav_form-body">
                    <form onSubmit={(e) => e.preventDefault()}>
                        {step === 1 && <MobileStep nextStep={nextStep} />}
                        {step === 2 && (
                            <PasswordStep
                                openOtpModal={openOtpModal}
                                prevStep={prevStep}
                            />
                        )}

                    </form>
                </div>
                {showOtpModal && (
                    <OTPModal onClose={closeOtpModal} />
                )}
                <Footer />
            </div>
        </AuthLayout>
    );
};

export default RegistrationForm;