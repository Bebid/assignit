import React, { useState } from "react";
import "./Textarea.css";
import Button from "../Button";

const Textarea = React.forwardRef(
    (
        {
            id,
            label,
            placeholder = `Enter ${id} here`,
            isText = false,
            children,
            invalid,
            allowEdit,
            onSave,
            independent = false,
        },
        ref
    ) => {
        const [value, setValue] = useState(children);
        const [editMode, setEditMode] = useState(!isText);

        const enableEditMode = (value = true) => {
            allowEdit && setEditMode(value);
        };

        const saveChanges = () => {
            setEditMode(false);
            onSave && onSave();
        };
        return (
            <div className={`form-textarea ${invalid && "invalid"}`}>
                <label htmlFor={id}>{label}</label>
                {editMode ? (
                    <div className={`textarea-container`}>
                        <textarea
                            ref={ref}
                            id={id}
                            placeholder={placeholder}
                            onChange={(e) => {
                                setValue(e.target.value);
                            }}
                        >
                            {value}
                        </textarea>
                    </div>
                ) : (
                    <p onClick={() => enableEditMode()}>{value}</p>
                )}
                {invalid && <p class="error-message">Field is required</p>}
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

export default Textarea;
