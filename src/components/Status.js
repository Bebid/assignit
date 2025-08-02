import React from "react";
import "./Status.css";
import { statuses } from "../data";

function Status({ code }) {
    const statusText = statuses.find((status) => status.id == code).text;
    return <p className={`status-${code}`}>{statusText}</p>;
}

export default Status;
