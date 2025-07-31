import React, { useContext, useEffect, useRef, useState } from "react";
import "./CreateForm.css";

import Textarea from "../Form/Textarea";
import Dropdown from "../Form/Dropdown";
import Input from "../Form/Input";
import Button from "../Button";
import supabase from "../../supabase";
import { SessionContext } from "../../App";

function CreateFrom() {
    const session = useContext(SessionContext);

    const [users, setUsers] = useState([]);
    useEffect(() => {
        supabase
            .from("users")
            .select()
            .neq("id", session.user.id)
            .then(({ data, error }) => {
                const users = data.map((user) => {
                    return { id: user.id, text: user.name };
                });
                setUsers(users);
            });
    }, []);

    const [assignee, setAssignee] = useState();
    const titleInputRef = useRef(null);
    const descInputRef = useRef(null);

    async function formSubmitted(e) {
        e.preventDefault();
        if (!assignee) {
            alert("Assignee is required");
            return;
        }

        if (!titleInputRef.current.value) {
            alert("title is required");
            return;
        }

        const { error } = await supabase.from("tasks").insert({
            assigned_to: assignee,
            title: titleInputRef.current.value,
            description: descInputRef.current.value,
            status: "O",
        });
    }

    return (
        <form className="create-form" onSubmit={formSubmitted}>
            <h2>Create Form</h2>
            <Dropdown
                label="Assignee"
                items={users}
                onSelect={setAssignee}
            ></Dropdown>
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
