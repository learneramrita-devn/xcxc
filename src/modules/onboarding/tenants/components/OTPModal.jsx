import OTPInput from "../components/OTPInput";
import { Link } from "react-router-dom";


const OTPModal = ({ onClose }) => {
    return (
        <div className="otp-overlay">
            <div className="otp-modal">

                <h2>Verify OTP</h2>
                <p>Enter the 6-digit OTP sent to your mobile number</p>

                <OTPInput length={6} />



                <button className="btn-primary trav-btn">Verify & Proceed</button>

                <div className="trav_form-footer">
                    <p>  Didn't get the OTP?  <Link className="text-link" >   Resend OTP  </Link> </p>

                    <button type="button" className="close-btn" onClick={onClose}>
                        close
                    </button>
                </div>


            </div>
        </div>
    );
};

export default OTPModal;