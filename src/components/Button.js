import React from "react";
import "./Button.css";

function Button({ type = "primary", size = "regular", children }) {
    return <button className={`button ${type} ${size}`}>{children}</button>;
}

export default Button;
