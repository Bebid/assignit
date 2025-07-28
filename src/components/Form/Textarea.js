import React from "react";
import "./Textarea.css";

function Textarea({ id, label, placeholder = `Enter ${id} here` }) {
    return (
        <div className="form-textarea">
            <label htmlFor={id}>{label}</label>
            <div className="textarea-container">
                <textarea id={id} placeholder={placeholder}></textarea>
            </div>
        </div>
    );
}

export default Textarea;
