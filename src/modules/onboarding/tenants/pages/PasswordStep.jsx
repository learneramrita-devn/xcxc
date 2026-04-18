import { Link } from "react-router-dom";

const PasswordStep = ({ openOtpModal, prevStep }) => {
    return (
        <>

            <div className="trav_form-group">
                <label className="form_label">Enter Password to Continue</label>
                <input type="password" placeholder="Enter password" className="form-control" />
            </div>

            <button className="btn-primary trav-btn" type="button" onClick={openOtpModal}>
                Continue
            </button>

            <div className="trav_form-footer">
                <Link className="btn-back-link" onClick={prevStep}>
                    Back
                </Link>
                <Link className="btn-link" to="/forgot-password">
                    Forget Password
                </Link>
            </div>
        </>
    );
};

export default PasswordStep;