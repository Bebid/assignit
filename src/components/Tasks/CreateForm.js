import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./CreateForm.css";

import { SessionContext } from "../../App";
import Textarea from "../Form/Textarea";
import Dropdown from "../Form/Dropdown";
import Input from "../Form/Input";
import Button from "../Button";
import supabase from "../../supabase";
import FileUpload from "../Form/FileUpload";
import Alert from "../Alert";
import Confirm from "../Modals/Confirm";

function CreateFrom() {
    const { session } = useContext(SessionContext);

    const [users, setUsers] = useState([]);

    const [assignee, setAssignee] = useState();
    const [assigneeInvalid, setAssigneeInvalid] = useState(false);
    const titleInputRef = useRef(null);
    const [titleInvalid, setTitleInvalid] = useState(false);
    const descInputRef = useRef(null);
    const [descInvalid, setDescInvalid] = useState(false);
    const [files, setFiles] = useState([]);

    const [formDisabled, setFormDisabled] = useState(false);

    const [alert, setAlert] = useState({});
    const [confirm, setConfirm] = useState({
        display: false,
        action: null,
        message: "",
    });

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

    const confirmDiscard = () => {
        setConfirm({
            display: true,
            message: "Do you want to discard this new task?",
            actionText: "Discard",
            cancelText: "Continue Editing",
            action: back,
        });
    };

    const navigate = useNavigate();

    const closeAlertAndRedirect = (redirect) => {
        setAlert((prev) => {
            return { ...prev, display: false };
        });
        navigate(redirect);
    };

    const showAlert = (message, redirect) => {
        const timeout = setTimeout(() => closeAlertAndRedirect(redirect), 5000);
        setAlert({
            display: true,
            message: message,
            timeout: timeout,
            onClose: () => closeAlertAndRedirect(redirect),
            type: "success",
        });
    };

    const validateForm = () => {
        let result = true;
        if (!assignee) {
            setAssigneeInvalid(true);
            result = false;
        } else {
            setAssigneeInvalid(false);
        }

        if (!titleInputRef.current.value) {
            setTitleInvalid(true);
            result = false;
        } else {
            setTitleInvalid(false);
        }

        if (!descInputRef.current.value) {
            setDescInvalid(true);
            result = false;
        } else {
            setDescInvalid(false);
        }

        return result;
    };

    const formSubmitted = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setTimeout(async () => {
            const { data: tasks, error } = await supabase
                .from("tasks")
                .insert({
                    assigned_to: assignee,
                    title: titleInputRef.current.value,
                    description: descInputRef.current.value,
                    status: "O",
                })
                .select("id");

            for (let i = 0; i < files.length; i++) {
                const { data, error } = await supabase.storage
                    .from("attachments")
                    .upload(`${tasks[0].id}/${files[i].name}`, files[i], {
                        cacheControl: "3600",
                        upsert: false,
                    });
            }

            setFormDisabled(true);
            showAlert(
                "Successfully created a task!",
                `/tasks/view/${tasks[0].id}`
            );
        }, 0);
    };

    const back = () => {
        navigate(-1);
    };

    const uploadFile = (inputRef) => {
        const uploadedFiles = inputRef.current.files;
        setFiles([...files, ...uploadedFiles]);
    };

    const removeFile = (inputRef, key) => {
        const filesCopy = [...files];
        filesCopy.splice(key, 1);
        setFiles(filesCopy);

        inputRef.current.value = "";
    };

    return (
        <>
            {" "}
            {!formDisabled && (
                <form className="create-form" onSubmit={formSubmitted}>
                    <h2>Create Form</h2>
                    <Dropdown
                        invalid={assigneeInvalid}
                        label="Assignee"
                        items={users}
                        onSelect={setAssignee}
                    ></Dropdown>
                    <Input
                        id="title"
                        label="Title"
                        ref={titleInputRef}
                        invalid={titleInvalid}
                    ></Input>
                    <Textarea
                        id="description"
                        label="Description"
                        ref={descInputRef}
                        invalid={descInvalid}
                    ></Textarea>
                    <FileUpload
                        multiple={true}
                        uploadedFiles={files}
                        uploadFile={uploadFile}
                        removeFile={removeFile}
                    ></FileUpload>
                    <div className="form-footer">
                        <Button type="secondary" onClick={confirmDiscard}>
                            Cancel
                        </Button>
                        <Button submit={true}>Save</Button>
                    </div>
                </form>
            )}
            <Alert value={alert}></Alert>
            <Confirm value={confirm} setValue={setConfirm}></Confirm>
        </>
    );
}

export default CreateFrom;
