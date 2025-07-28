import React from "react";
import "./CreateForm.css";

import Textarea from "../Form/Textarea";
import Input from "../Form/Input";
import Button from "../Button";

function CreateFrom() {
    return (
        <form className="create-form">
            <h2>Create Form</h2>
            <Input id="assignee" label="Assignee"></Input>
            <Input id="title" label="Title"></Input>
            <Textarea id="description" label="Description"></Textarea>
            <div className="form-footer">
                <Button type="secondary">Cancel</Button>
                <Button>Save</Button>
            </div>
        </form>
    );
}

export default CreateFrom;
