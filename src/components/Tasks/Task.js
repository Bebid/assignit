import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Task.css";

import { statuses } from "../../data";

import Input from "../Form/Input";
import Textarea from "../Form/Textarea";
import Dropdown from "../Form/Dropdown";
import supabase from "../../supabase";
import Button from "../Button";
import FileUpload from "../Form/FileUpload";
import Alert from "../Alert";
import Confirm from "../Modals/Confirm";
import { SessionContext } from "../../App";

function Task({ task }) {
    const { session } = useContext(SessionContext);
    const [users, setUsers] = useState([]);
    const [files, setFiles] = useState([]);
    const [gettingFiles, setGettingFiles] = useState(true);
    const [gettingUsers, setGettingUsers] = useState(true);
    const [blobs, setBlobs] = useState([]);

    const [alert, setAlert] = useState({
        display: false,
        timeout: null,
        message: "",
        onClose: null,
        type: "success",
    });

    const [confirm, setConfirm] = useState({
        display: false,
        action: null,
        message: "",
    });

    const descInputRef = useRef(null);
    const titleInputRef = useRef(null);

    const navigate = useNavigate();

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

    const closeAlert = () => {
        setAlert((prev) => {
            return { ...prev, display: false };
        });

        clearTimeout(alert.timeout);
    };

    const closeAlertAndRedirect = () => {
        setAlert((prev) => {
            return { ...prev, display: false };
        });
        navigate("/home");
    };

    const showAlert = (message, type = "success", timeoutFn = closeAlert) => {
        const timeout = setTimeout(timeoutFn, 3000);
        setAlert({
            display: true,
            message: message,
            timeout: timeout,
            onClose: closeAlert,
            type: type,
        });
    };

    const closeConfirm = () => {
        setConfirm((confirm) => {
            return {
                ...confirm,
                display: false,
            };
        });
    };

    const changeStatus = (status) => {
        closeAlert();
        supabase
            .from("tasks")
            .update({
                status: status,
            })
            .eq("id", task.id)
            .then((result) => {
                showAlert("Status updated.");
            });
    };

    const setAssigneeOnDb = (userId) => {
        closeAlert();
        supabase
            .from("tasks")
            .update({
                assigned_to: userId,
            })
            .eq("id", task.id)
            .then((result) => {
                showAlert(
                    `Assigned to ${
                        users.find((user) => user.id == userId).text
                    }.`
                );
            });
    };

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

    const confirmDeleteTask = () => {
        closeAlert();
        setConfirm({
            display: true,
            message: "Do you really want to delete this item?",
            actionText: "Delete",
            action: deleteTask,
        });
    };

    const deleteTask = () => {
        files.length > 0 && removeFiles(files.map((file) => file.name));
        supabase
            .from("tasks")
            .delete()
            .eq("id", task.id)
            .then((result) => {
                closeConfirm();
                showAlert(
                    "Task deleted successfully.",
                    "success",
                    closeAlertAndRedirect
                );
            });
    };

    const confirmRemoveFile = (inputRef, key, fileNames) => {
        closeAlert();
        setConfirm({
            display: true,
            message: "Do you really want to delete this file?",
            actionText: "Delete",
            action: () => removeFile(inputRef, key, fileNames),
        });
    };

    const removeFile = (inputRef, key, fileNames) => {
        const filesCopy = [...files];
        filesCopy.splice(key, 1);
        setFiles(filesCopy);

        inputRef.current.value = "";

        removeFiles(fileNames);
    };

    const removeFiles = (fileNames) => {
        const filePaths = fileNames.map((name) => `${task.id}/${name}`);
        supabase.storage
            .from("attachments")
            .remove(filePaths)
            .then(({ data, error }) => {
                if (!error) {
                    closeConfirm();
                    showAlert("File deleted successfully.");
                }
            });
    };

    const uploadFile = (inputRef) => {
        closeAlert();
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
                } else {
                    showAlert(
                        `A file with this name already exists.`,
                        "danger"
                    );
                }
            });
        });
    };

    return (
        <article className="task">
            <Input
                id="Title"
                allowEdit={true}
                isText={true}
                textType="headline"
                value={task.title}
                onSave={() => updateTitle()}
                ref={titleInputRef}
                independent={true}
            ></Input>
            <Dropdown
                label="Status"
                selected={task.status}
                items={statuses}
                onSelect={changeStatus}
            ></Dropdown>
            {!gettingUsers && (
                <Dropdown
                    label="Assignee"
                    items={users}
                    selected={task.assigned_to.id}
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
                        removeFile={confirmRemoveFile}
                        uploadFile={uploadFile}
                    ></FileUpload>
                </div>
            )}

            {session.user.id == task.created_by.id && (
                <div className="task-actions">
                    <Button
                        onClick={() => {
                            confirmDeleteTask();
                        }}
                        type="tertiary"
                    >
                        <svg
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 640"
                        >
                            <path d="M232.7 69.9C237.1 56.8 249.3 48 263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9zM128 208L512 208L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 208zM216 272C202.7 272 192 282.7 192 296L192 488C192 501.3 202.7 512 216 512C229.3 512 240 501.3 240 488L240 296C240 282.7 229.3 272 216 272zM320 272C306.7 272 296 282.7 296 296L296 488C296 501.3 306.7 512 320 512C333.3 512 344 501.3 344 488L344 296C344 282.7 333.3 272 320 272zM424 272C410.7 272 400 282.7 400 296L400 488C400 501.3 410.7 512 424 512C437.3 512 448 501.3 448 488L448 296C448 282.7 437.3 272 424 272z" />
                        </svg>
                        Delete
                    </Button>
                </div>
            )}

            <Alert value={alert}></Alert>
            <Confirm value={confirm} setValue={setConfirm}></Confirm>
        </article>
    );
}

export default Task;
