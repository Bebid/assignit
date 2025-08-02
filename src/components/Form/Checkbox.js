import React, { useState } from "react";
import check from "../../images/check.svg";
import "./Checkbox.css";

function Checkbox({ checked, onClick, label }) {
    const [isCheck, setIsCheck] = useState(checked);
    const toggleCheckbox = () => {
        setIsCheck(!isCheck);
        onClick && onClick();
    };
    return (
        <div className="checkbox" onClick={() => toggleCheckbox()}>
            <div>{isCheck && <img src={check}></img>}</div>
            {label && <label>{label}</label>}
        </div>
    );
}

export default Checkbox;
