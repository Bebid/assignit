import React from "react";
import "./Textarea.css";

const Textarea = React.forwardRef(
    (
        {
            id,
            label,
            placeholder = `Enter ${id} here`,
            display = false,
            children,
            invalid,
        },
        ref
    ) => {
        return (
            <div className={`form-textarea ${invalid && "invalid"}`}>
                <label htmlFor={id}>{label}</label>
                <div
                    className={`textarea-container ${display ? "display" : ""}`}
                >
                    <textarea
                        ref={ref}
                        id={id}
                        placeholder={placeholder}
                        disabled={display}
                        value={children}
                    ></textarea>
                </div>
                {invalid && <p class="error-message">Field is required</p>}
            </div>
        );
    }
);

export default Textarea;
