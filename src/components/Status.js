import React from "react";
import "./Status.css";

function Status({ code }) {
    const statusCodes = {
        O: "Open",
        P: "Pending",
        C: "Closed",
    };
    return <p className={`status-${code}`}>{statusCodes[code]}</p>;
}

export default Status;
