import React from "react";
import ReactDOM from "react-dom";

import "./Confirm.css";

import Button from "../Button";

function Confirm({ value, setValue }) {
    return ReactDOM.createPortal(
        <div className={`confirm ${value.display ? "show" : ""}`}>
            <div
                className="confirm-bg"
                onClick={() => setValue({ ...value, display: false })}
            ></div>
            <div className="confirm-box">
                {value.message}
                <div className="confirm-actions">
                    <Button
                        type="tertiary"
                        size="small"
                        onClick={() => setValue({ ...value, display: false })}
                    >
                        {value.cancelText || "Cancel"}
                    </Button>
                    <Button size="small" onClick={() => value.action()}>
                        {value.actionText}
                    </Button>
                </div>
            </div>
        </div>,
        document.getElementById("root-modal")
    );
}

export default Confirm;
