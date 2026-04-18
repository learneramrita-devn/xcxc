const MobileStep = ({ nextStep }) => {
    return (
        <>
            <div className="trav_form-group">
                <label className="form_label">Mobile Number</label>
                {/* <input type="tel" placeholder="Enter mobile number" /> */}
                <div className="mobile_input">
                    <div className="country">
                        <img
                            src="https://flagcdn.com/w40/in.png"
                            alt="India"
                        />
                        <span>+91</span>
                        <span className="down-chevron"></span>
                    </div>

                    <input
                        type="tel"
                        placeholder="Enter Mobile Number"

                    />
                </div>
            </div>

            <button className="btn-primary trav-btn" onClick={nextStep}>Continue</button>
        </>
    );
};

export default MobileStep;