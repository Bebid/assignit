import React from "react";
import "./Task.css";

import Input from "../Form/Input";
import Textarea from "../Form/Textarea";
import Dropdown from "../Form/Dropdown";

function Task() {
    const title = "Login with Google";
    const value = "John Doe";

    return (
        <article className="task">
            <h2>{title}</h2>
            <Dropdown
                label="Status"
                selected="O"
                items={[
                    { id: "O", text: "Opening" },
                    { id: "P", text: "Pending" },
                    { id: "C", text: "Closing" },
                ]}
            ></Dropdown>
            <Dropdown
                label="Assignee"
                selected="john"
                items={{
                    john: "John David Apostol",
                    sog: "Sog Apostol",
                    arnold: "Arnold Apostol",
                }}
            ></Dropdown>
            <Input
                id="creator"
                label="Creator"
                display={true}
                value={value}
            ></Input>
            <Textarea id="description" label="Description" display={true}>
                {value}
            </Textarea>
        </article>
    );
}

export default Task;
