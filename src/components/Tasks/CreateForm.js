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

function CreateFrom() {
    const { session } = useContext(SessionContext);

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
    const [assigneeInvalid, setAssigneeInvalid] = useState(false);
    const titleInputRef = useRef(null);
    const [titleInvalid, setTitleInvalid] = useState(false);
    const descInputRef = useRef(null);
    const [descInvalid, setDescInvalid] = useState(false);
    const [files, setFiles] = useState([]);

    const navigate = useNavigate();

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
            navigate(`/tasks/view/${tasks[0].id}`);
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
                <Button
                    type="secondary"
                    onClick={() => {
                        back();
                    }}
                >
                    Cancel
                </Button>
                <Button submit={true}>Save</Button>
            </div>
        </form>
    );
}

export default CreateFrom;
