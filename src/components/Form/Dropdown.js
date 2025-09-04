import React, { useState } from "react";
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
                    <svg
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 640"
                    >
                        <path d="M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z" />
                    </svg>
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
