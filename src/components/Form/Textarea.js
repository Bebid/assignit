import React from "react";
import "./Textarea.css";

function Textarea({
    id,
    label,
    placeholder = `Enter ${id} here`,
    display = false,
    children,
}) {
    return (
        <div className="form-textarea">
            <label htmlFor={id}>{label}</label>
            <div className={`textarea-container ${display ? "display" : ""}`}>
                <textarea
                    id={id}
                    placeholder={placeholder}
                    disabled={display}
                    value={children}
                ></textarea>
            </div>
        </div>
    );
}

export default Textarea;
