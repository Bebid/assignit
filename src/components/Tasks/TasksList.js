import React from "react";
import "./TasksList.css";
import TaskItem from "./TaskItem";

function TasksList({ tasks, headline }) {
    return (
        <article>
            <h2 className="tasks-list-header">{headline}</h2>
            <ul className="tasks-list">
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task}></TaskItem>
                ))}
            </ul>
        </article>
    );
}

export default TasksList;
