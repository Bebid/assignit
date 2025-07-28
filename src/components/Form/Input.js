import React from "react";
import "./Input.css";

function Input({
    id,
    label,
    placeholder = `Enter ${id} here`,
    type = "text",
    display = false,
    value,
}) {
    return (
        <p className="form-input">
            <label htmlFor={id}>{label}</label>
            <input
                className={`${display ? "display" : ""}`}
                type={type}
                id={id}
                name={id}
                placeholder={placeholder}
                value={value}
                disabled={display}
            ></input>
        </p>
    );
}

export default Input;
