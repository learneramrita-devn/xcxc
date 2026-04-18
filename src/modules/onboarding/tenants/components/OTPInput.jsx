import React, { useRef } from "react";


const OTPInput = ({ length = 6, onChange }) => {
    const inputs = useRef([]);

    const handleChange = (e, index) => {
        const value = e.target.value;

        if (!/^[0-9]?$/.test(value)) return;

        if (value && index < length - 1) {
            inputs.current[index + 1].focus();
        }

        triggerChange();
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        const pasteData = e.clipboardData.getData("text").slice(0, length);
        if (!/^\d+$/.test(pasteData)) return;

        pasteData.split("").forEach((digit, index) => {
            if (inputs.current[index]) {
                inputs.current[index].value = digit;
            }
        });

        inputs.current[pasteData.length - 1]?.focus();
        triggerChange();
    };

    const triggerChange = () => {
        const otp = inputs.current.map((input) => input?.value || "").join("");
        onChange && onChange(otp);
    };

    return (
        <div className="otp-container" onPaste={handlePaste}>
            {Array.from({ length }).map((_, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="otp-input"
                    ref={(el) => (inputs.current[index] = el)}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                />
            ))}
        </div>
    );
};

export default OTPInput;