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
    const [selectedItem, setSelectedItem] = useState(items[selected]);

    function toggle() {
        setOpen(!open);
    }
    function selectItem(index) {
        setOpen(false);
        setSelectedItem(items[index]);
        onSelect && onSelect(items[index].id);
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
                    {selectedItem
                        ? items.find((item) => {
                              return item.id == selectedItem.id;
                          }).text
                        : items[0].text}
                    <img src={chevronDown} />
                </button>
                <ul>
                    {items.map((item, index) => (
                        <li key={item.id} onClick={() => selectItem(index)}>
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
