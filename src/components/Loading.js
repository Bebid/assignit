import React from "react";
import ReactDOM from "react-dom";

function Loading({ isLoading, text = "Loading..." }) {
    return ReactDOM.createPortal(
        <div className={`loading ${isLoading ? "show" : ""}`}>{text}</div>,
        document.getElementById("root-loaders")
    );
}

export default Loading;
