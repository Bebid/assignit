import React, { useRef } from "react";
import "./Input.css";

const Input = React.forwardRef(
    (
        {
            id,
            label,
            placeholder = `Enter ${id} here`,
            type = "text",
            display = false,
            value,
        },
        ref
    ) => {
        return (
            <p className="form-input">
                <label htmlFor={id}>{label}</label>
                <input
                    ref={ref}
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
);

export default Input;
