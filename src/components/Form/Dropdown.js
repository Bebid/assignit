import React, { useEffect, useState } from "react";
import chevronDown from "../../images/chevron-down.svg";
import "./Dropdown.css";

function Dropdown({ label, selected, items, onSelect }) {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(items[selected]);

    useEffect(() => {
        setSelectedItem(items[selected]);
    }, [items]);

    function toggle() {
        setOpen(!open);
    }
    function selectItem(index) {
        setOpen(false);
        setSelectedItem(items[index]);
        onSelect && onSelect(items[index].id);
    }
    return (
        <div className={`dropdown ${open ? "open" : ""}`}>
            <label>{label}</label>

            <div>
                <button type="button" onClick={() => toggle()}>
                    {selectedItem
                        ? items.find((item) => {
                              return item.id == selectedItem.id;
                          }).text
                        : "Select an item"}
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
        </div>
    );
}

export default Dropdown;
