import React, { useEffect, useRef, useState } from "react";
import "./Task.css";

import Input from "../Form/Input";
import Textarea from "../Form/Textarea";
import Dropdown from "../Form/Dropdown";
import supabase from "../../supabase";
import { statuses } from "../../data";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

function Task({ task }) {
    const [selectedIndex, setSelectedIndex] = useState(task.status);
    const [users, setUsers] = useState([]);

    const changeStatus = (status) => {
        supabase
            .from("tasks")
            .update({
                status: status,
            })
            .eq("id", task.id)
            .then((result) => {
                console.log(result);
            });
    };

    useEffect(() => {
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
            .eq("id", task.id)
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
            .eq("id", task.id)
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
            .eq("id", task.id)
            .then((result) => {
                console.log(result);
            });
    };

    const navigate = useNavigate();
    const deleteTask = () => {
        supabase
            .from("tasks")
            .delete()
            .eq("id", task.id)
            .then((result) => {
                navigate("/home");
            });
    };

    return (
        <article className="task">
            <Input
                id="Title"
                label="Title"
                allowEdit={true}
                isText={true}
                value={task.title}
                onSave={() => updateTitle()}
                ref={titleInputRef}
                independent={true}
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
                independent={true}
            >
                {task.description}
            </Textarea>

            <div className="task-actions">
                <Button
                    onClick={() => {
                        deleteTask();
                    }}
                >
                    Delete
                </Button>
            </div>
        </article>
    );
}

export default Task;
