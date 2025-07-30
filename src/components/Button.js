import React from "react";
import "./Button.css";

function Button({
    type = "primary",
    size = "regular",
    children,
    submit = false,
    onClick,
}) {
    return (
        <button
            type={`${submit ? "submit" : "button"}`}
            className={`button ${type} ${size}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;
