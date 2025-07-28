import React from "react";
import "./Input.css";

function Input({ id, label, placeholder = `Enter ${id} here`, type = "text" }) {
    return (
        <p className="form-input">
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                name={id}
                placeholder={placeholder}
            ></input>
        </p>
    );
}

export default Input;
