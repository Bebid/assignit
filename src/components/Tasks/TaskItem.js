import React from "react";
import "./TaskItem.css";
import Status from "../Status";
import { Link } from "react-router-dom";

function TaskItem({ task }) {
    return (
        <li className="task-item">
            <Link to={`/tasks/view/${task.id}`}>
                <p>{task.title}</p>
                <Status code={task.status}></Status>
            </Link>
        </li>
    );
}

export default TaskItem;
