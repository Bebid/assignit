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
        },
        ref
    ) => {
        return (
            <div className="form-textarea">
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
            </div>
        );
    }
);

export default Textarea;
