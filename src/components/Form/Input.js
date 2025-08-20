import React, { useRef, useState } from "react";
import "./Input.css";
import Button from "../Button";

const Input = React.forwardRef(
    (
        {
            id,
            label,
            placeholder = `Enter ${id} here`,
            type = "text",
            value = "",
            invalid,
            allowEdit,
            onSave,
            independent = false,
            isText = false,
            textType,
        },
        ref
    ) => {
        const [inputValue, setInputValue] = useState(value);
        const [editMode, setEditMode] = useState(!isText);
        const enableEditMode = (value = true) => {
            allowEdit && setEditMode(value);
        };

        const saveChanges = () => {
            setEditMode(false);
            onSave && onSave();
        };
        return (
            <div className={`form-input ${invalid ? "invalid" : ""}`}>
                {label && <label htmlFor={id}>{label}</label>}
                {editMode ? (
                    <input
                        ref={ref}
                        type={type}
                        id={id}
                        name={id}
                        placeholder={placeholder}
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                        }}
                    ></input>
                ) : textType == "headline" ? (
                    <h2 onClick={() => enableEditMode()}>{inputValue}</h2>
                ) : (
                    <p onClick={() => enableEditMode()}>{inputValue}</p>
                )}
                {invalid && (
                    <span class="error-message">Field is required</span>
                )}
                {editMode && independent && (
                    <div className="buttons">
                        <Button
                            size="small"
                            type="secondary"
                            onClick={() => enableEditMode(false)}
                        >
                            Cancel
                        </Button>
                        <Button size="small" onClick={() => saveChanges()}>
                            Save
                        </Button>
                    </div>
                )}
            </div>
        );
    }
);

export default Input;
