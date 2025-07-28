import React from "react";
import "./TaskItem.css";
import Status from "../Status";

function TaskItem({ task }) {
    return (
        <li className="task-item">
            <p>{task.title}</p>
            <Status code={task.status}></Status>
        </li>
    );
}

export default TaskItem;
