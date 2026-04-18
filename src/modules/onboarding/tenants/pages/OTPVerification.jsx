import React, { useState } from "react";
import OTPInput from "../components/OTPInput";
import { Link } from "react-router-dom";

const OTPVerification = () => {
    const [otp, setOtp] = useState("");

    return (
        <div className="form-container">

            <OTPInput length={6} onChange={setOtp} />

            <button className="btn" onClick={() => console.log(otp)}>
                Verify & Proceed
            </button>
            <div className="trav_form-footer">
                <p> Didn't get the OTP?  <Link className="btn-back-link" >
                    Resend OTP
                </Link></p>

                <Link className="btn-link" to="/">
                    Close
                </Link>
            </div>
        </div>
    );
};

export default OTPVerification;