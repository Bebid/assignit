import React, { useEffect, useState } from "react";
import "./Task.css";

import Input from "../Form/Input";
import Textarea from "../Form/Textarea";
import Dropdown from "../Form/Dropdown";
import supabase from "../../supabase";

function Task({ id }) {
    const statuses = [
        { id: "O", text: "Open" },
        { id: "P", text: "Pending" },
        { id: "C", text: "Closed" },
    ];

    const [task, setTask] = useState({});
    const [taskLoading, setTaskLoading] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(0);

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

    useEffect(() => {
        supabase
            .from("tasks")
            .select(
                "*, assigned_to:users!tasks_assigned_to_fkey(name), created_by:users!tasks_created_by_fkey(name)"
            )
            .eq("id", id)
            .then(({ data }) => {
                setTask(data[0]);
                setTaskLoading(false);
                setSelectedIndex(
                    statuses.findIndex((stat) => stat.id == data[0].status)
                );
            });
    }, []);

    return (
        !taskLoading && (
            <article className="task">
                <h2>{task.title}</h2>
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
                    value={task.assigned_to.name}
                ></Input>
                <Input
                    id="creator"
                    label="Creator"
                    display={true}
                    value={task.created_by.name}
                ></Input>
                <Textarea id="description" label="Description" display={true}>
                    {task.description}
                </Textarea>
            </article>
        )
    );
}

export default Task;
