import React, { useState } from "react";
import chevronDown from "../../images/chevron-down.svg";
import "./Dropdown.css";

function Dropdown({
    label,
    selected,
    items,
    onSelect,
    invalid,
    className = "",
}) {
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(selected);

    function toggle() {
        setOpen(!open);
    }
    function selectItem(id) {
        setOpen(false);
        if (id == selectedId) {
            return;
        }

        setSelectedId(id);
        onSelect && onSelect(id);
    }

    if (items.length == 0) {
        return "Loading";
    }

    return (
        <div
            className={`dropdown${invalid ? " invalid" : ""}${
                open ? " open" : ""
            } ${className}`}
        >
            {label && <label>{label}</label>}

            <div>
                <button type="button" onClick={() => toggle()}>
                    {selectedId
                        ? items.find((item) => {
                              return item.id == selectedId;
                          }).text
                        : `Select ${label}`}
                    <img src={chevronDown} />
                </button>
                <ul>
                    {items.map((item) => (
                        <li
                            className={`${
                                item.id == selectedId ? "active" : ""
                            }`}
                            key={item.id}
                            onClick={() => selectItem(item.id)}
                        >
                            {item.text}
                        </li>
                    ))}
                </ul>
            </div>
            {invalid && (
                <p className="error-message">Please select an option</p>
            )}
        </div>
    );
}

export default Dropdown;
