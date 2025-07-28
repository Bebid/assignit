import React, { useState } from "react";
import chevronDown from "../../images/chevron-down.svg";
import "./Dropdown.css";

function Dropdown({ label, selected, items }) {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(selected);

    function toggle() {
        setOpen(!open);
    }
    function selectItem(item) {
        setOpen(false);
        setSelectedItem(item);
    }
    return (
        <div className={`dropdown ${open ? "open" : ""}`}>
            <label>{label}</label>
            <div>
                <button onClick={() => toggle()}>
                    {items[selectedItem]}
                    <img src={chevronDown} />
                </button>
                <ul>
                    {Object.entries(items).map((item) => (
                        <li key={item[0]} onClick={() => selectItem(item[0])}>
                            {item[1]}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Dropdown;
