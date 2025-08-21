import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./Alert.css";

function Alert({
    value: { display = false, message = "", onClose = null, type = "success" },
}) {
    return ReactDOM.createPortal(
        <div className={`alert ${display ? "show" : ""}`}>
            <div className="alert-box">
                {type == "success" ? (
                    <div className="alert-icon success">
                        <svg
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 640"
                        >
                            <path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z" />
                        </svg>
                    </div>
                ) : type == "info" ? (
                    <div className="alert-icon info">
                        <svg
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 640"
                        >
                            <path d="M272 112C272 85.5 293.5 64 320 64C346.5 64 368 85.5 368 112C368 138.5 346.5 160 320 160C293.5 160 272 138.5 272 112zM224 256C224 238.3 238.3 224 256 224L320 224C337.7 224 352 238.3 352 256L352 512L384 512C401.7 512 416 526.3 416 544C416 561.7 401.7 576 384 576L256 576C238.3 576 224 561.7 224 544C224 526.3 238.3 512 256 512L288 512L288 288L256 288C238.3 288 224 273.7 224 256z" />
                        </svg>
                    </div>
                ) : (
                    <div className="alert-icon danger">
                        <svg
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 640"
                        >
                            <path d="M352 96C352 78.3 337.7 64 320 64C302.3 64 288 78.3 288 96L288 416C288 433.7 302.3 448 320 448C337.7 448 352 433.7 352 416L352 96zM320 576C342.1 576 360 558.1 360 536C360 513.9 342.1 496 320 496C297.9 496 280 513.9 280 536C280 558.1 297.9 576 320 576z" />
                        </svg>
                    </div>
                )}
                {message}
                <button
                    onClick={() => onClose()}
                    className="alert-icon alert-close"
                >
                    <svg
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                    >
                        <path d="M504.6 148.5C515.9 134.9 514.1 114.7 500.5 103.4C486.9 92.1 466.7 93.9 455.4 107.5L320 270L184.6 107.5C173.3 93.9 153.1 92.1 139.5 103.4C125.9 114.7 124.1 134.9 135.4 148.5L278.3 320L135.4 491.5C124.1 505.1 125.9 525.3 139.5 536.6C153.1 547.9 173.3 546.1 184.6 532.5L320 370L455.4 532.5C466.7 546.1 486.9 547.9 500.5 536.6C514.1 525.3 515.9 505.1 504.6 491.5L361.7 320L504.6 148.5z" />
                    </svg>
                </button>
            </div>
        </div>,
        document.getElementById("root-modal")
    );
}

export default Alert;
