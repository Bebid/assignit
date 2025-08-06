import React, { useEffect, useRef, useState } from "react";
import "./Task.css";

import Input from "../Form/Input";
import Textarea from "../Form/Textarea";
import Dropdown from "../Form/Dropdown";
import supabase from "../../supabase";
import { statuses } from "../../data";

function Task({ id }) {
    const [task, setTask] = useState({});
    const [taskLoading, setTaskLoading] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [users, setUsers] = useState([]);

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
                "*, assigned_to:users!tasks_assigned_to_fkey(id, name), created_by:users!tasks_created_by_fkey(id, name)"
            )
            .eq("id", id)
            .then(({ data }) => {
                setTask(data[0]);
                setTaskLoading(false);
                setSelectedIndex(
                    statuses.findIndex((stat) => stat.id == data[0].status)
                );
            });

        supabase
            .from("users")
            .select()
            .then(({ data, error }) => {
                const users = data.map((user) => {
                    return { id: user.id, text: user.name };
                });
                setUsers(users);
            });
    }, []);

    const setAssigneeOnDb = (userId) => {
        supabase
            .from("tasks")
            .update({
                assigned_to: userId,
            })
            .eq("id", id)
            .then((result) => {
                console.log(result);
            });
    };

    const descInputRef = useRef(null);

    const updateDescription = () => {
        supabase
            .from("tasks")
            .update({
                description: descInputRef.current.value,
            })
            .eq("id", id)
            .then((result) => {
                console.log(result);
            });
    };

    const titleInputRef = useRef(null);
    const updateTitle = () => {
        supabase
            .from("tasks")
            .update({
                title: titleInputRef.current.value,
            })
            .eq("id", id)
            .then((result) => {
                console.log(result);
            });
    };

    return (
        !taskLoading && (
            <article className="task">
                <Input
                    id="Title"
                    label="Title"
                    allowEdit={true}
                    isText={true}
                    value={task.title}
                    onSave={() => updateTitle()}
                    ref={titleInputRef}
                ></Input>
                <Dropdown
                    label="Status"
                    selected={selectedIndex}
                    items={statuses}
                    onSelect={changeStatus}
                ></Dropdown>
                <Dropdown
                    label="Assignee"
                    items={users}
                    selected={users.findIndex(
                        (user) => user.id == task.assigned_to.id
                    )}
                    onSelect={setAssigneeOnDb}
                ></Dropdown>
                <Input
                    id="creator"
                    label="Creator"
                    isText={true}
                    value={task.created_by.name}
                ></Input>
                <Textarea
                    id="description"
                    label="Description"
                    isText={true}
                    allowEdit={true}
                    onSave={() => updateDescription()}
                    ref={descInputRef}
                >
                    {task.description}
                </Textarea>
            </article>
        )
    );
}

export default Task;
