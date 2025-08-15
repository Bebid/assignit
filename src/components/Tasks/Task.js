import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Task.css";

import { statuses } from "../../data";

import Input from "../Form/Input";
import Textarea from "../Form/Textarea";
import Dropdown from "../Form/Dropdown";
import supabase from "../../supabase";
import Button from "../Button";
import FileUpload from "../Form/FileUpload";

function Task({ task }) {
    const [users, setUsers] = useState([]);
    const [files, setFiles] = useState([]);
    const [gettingFiles, setGettingFiles] = useState(true);
    const [gettingUsers, setGettingUsers] = useState(true);
    const [blobs, setBlobs] = useState([]);

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
                setGettingUsers(false);
            });

        supabase.storage
            .from("attachments")
            .list(task.id, {
                limit: 100,
                offset: 0,
                sortBy: { column: "name", order: "asc" },
            })
            .then(({ data: fetchedFiles, error }) => {
                setFiles(fetchedFiles);

                fetchedFiles.map((file, key) => {
                    setTimeout(async () => {
                        const { data, error } = await supabase.storage
                            .from("attachments")
                            .download(`${task.id}/${file.name}`);

                        const blobUrl = URL.createObjectURL(data);
                        setBlobs((blobs) => [
                            ...blobs,
                            { id: file.id, downloadLink: blobUrl },
                        ]);
                    }, 0);
                });

                setGettingFiles(false);
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

    const removeFileFromDB = (fileName) => {
        supabase.storage.from("attachments").remove([`${task.id}/${fileName}`]);
    };

    const uploadFile = (inputRef) => {
        const uploadedFiles = inputRef.current.files;

        Array.from(uploadedFiles).forEach((attachment) => {
            setTimeout(async () => {
                const { data, error } = await supabase.storage
                    .from("attachments")
                    .upload(`${task.id}/${attachment.name}`, attachment, {
                        cacheControl: "3600",
                        upsert: false,
                    });

                if (!error) {
                    setFiles((files) => [...files, attachment]);
                }
            });
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
                selected={statuses.findIndex(
                    (status) => status.id == task.status
                )}
                items={statuses}
                onSelect={changeStatus}
            ></Dropdown>
            {!gettingUsers && (
                <Dropdown
                    label="Assignee"
                    items={users}
                    selected={users.findIndex(
                        (user) => user.id == task.assigned_to.id
                    )}
                    onSelect={setAssigneeOnDb}
                ></Dropdown>
            )}
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

            {!gettingFiles && (
                <div>
                    <label>Attachments</label>

                    <FileUpload
                        multiple
                        blobs={blobs}
                        uploadedFiles={files}
                        setUploadedFiles={setFiles}
                        removeFileFromDB={removeFileFromDB}
                        uploadFile={uploadFile}
                    ></FileUpload>
                </div>
            )}

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
