import React, { useRef } from "react";
import "./CreateForm.css";

import Textarea from "../Form/Textarea";
import Input from "../Form/Input";
import Button from "../Button";
import supabase from "../../supabase";

function CreateFrom() {
    const assigneeInputRef = useRef(null);
    const titleInputRef = useRef(null);
    const descInputRef = useRef(null);

    async function formSubmitted(e) {
        e.preventDefault();
        const { error } = await supabase.from("tasks").insert({
            title: titleInputRef.current.value,
            description: descInputRef.current.value,
            status: "O",
        });
    }

    return (
        <form className="create-form" onSubmit={formSubmitted}>
            <h2>Create Form</h2>
            <Input
                id="assignee"
                label="Assignee"
                ref={assigneeInputRef}
            ></Input>
            <Input id="title" label="Title" ref={titleInputRef}></Input>
            <Textarea
                id="description"
                label="Description"
                ref={descInputRef}
            ></Textarea>
            <div className="form-footer">
                <Button type="secondary">Cancel</Button>
                <Button submit={true}>Save</Button>
            </div>
        </form>
    );
}

export default CreateFrom;
