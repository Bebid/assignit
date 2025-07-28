import React from "react";
import "./Button.css";

function Button({
    type = "primary",
    size = "regular",
    children,
    submit = false,
}) {
    return (
        <button
            type={`${submit ? "submit" : "button"}`}
            className={`button ${type} ${size}`}
        >
            {children}
        </button>
    );
}

export default Button;
