import React from "react";
import "./CreateForm.css";

import Textarea from "../Form/Textarea";
import Input from "../Form/Input";
import Button from "../Button";

function CreateFrom() {
    function formSubmitted(event) {
        event.preventDefault();
        alert("test");
    }
    return (
        <form className="create-form" onSubmit={formSubmitted}>
            <h2>Create Form</h2>
            <Input id="assignee" label="Assignee"></Input>
            <Input id="title" label="Title"></Input>
            <Textarea id="description" label="Description"></Textarea>
            <div className="form-footer">
                <Button type="secondary">Cancel</Button>
                <Button submit={true}>Save</Button>
            </div>
        </form>
    );
}

export default CreateFrom;
