import React from "react";
import "./Task.css";

import Input from "../Form/Input";
import Textarea from "../Form/Textarea";
import Dropdown from "../Form/Dropdown";
import supabase from "../../supabase";

function Task({
    task: { id, title, assigned_to, created_by, description, status },
}) {
    const statuses = [
        { id: "O", text: "Open" },
        { id: "P", text: "Pending" },
        { id: "C", text: "Closed" },
    ];

    const selectedIndex = statuses.findIndex((stat) => stat.id == status);

    const changeStatus = (status) => {
        supabase
            .from("tasks")
            .update({
                status: status,
            })
            .eq("id", id)
            .then((result) => {
                console.log(result);
            });
    };

    return (
        <article className="task">
            <h2>{title}</h2>
            <Dropdown
                label="Status"
                selected={selectedIndex}
                items={statuses}
                onSelect={changeStatus}
            ></Dropdown>
            <Input
                id="assigned_to"
                label="Assignee"
                display={true}
                value={assigned_to.name}
            ></Input>
            <Input
                id="creator"
                label="Creator"
                display={true}
                value={created_by.name}
            ></Input>
            <Textarea id="description" label="Description" display={true}>
                {description}
            </Textarea>
        </article>
    );
}

export default Task;
