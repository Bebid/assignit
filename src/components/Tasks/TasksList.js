import React, { useState } from "react";
import "./TasksList.css";
import TaskItem from "./TaskItem";
import Dropdown from "../Form/Dropdown";
import { statuses } from "../../data";

function TasksList({ tasks, headline, defaultState = false }) {
    const [filteredTasks, setFilteredTasks] = useState(tasks);
    const [selectedStatus, setSelectedStatus] = useState("A");
    const [open, setOpen] = useState(defaultState);

    const filterList = (status) => {
        if (status == "A") {
            setFilteredTasks(tasks);
        } else {
            setFilteredTasks(tasks.filter((task) => task.status == status));
        }
        setSelectedStatus(status);
    };

    return (
        <article className={`tasks ${open && "open"}`}>
            <button
                className="tasks-list-button"
                onClick={() => setOpen(!open)}
            >
                <h2 className="tasks-list-header">
                    <span>{headline}</span>
                    <span className="pill">{filteredTasks.length}</span>
                </h2>
                <svg
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                >
                    <path d="M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z" />
                </svg>
            </button>

            <section>
                <div className="tasks-filter">
                    <Dropdown
                        label="Status:"
                        items={[{ id: "A", text: "All" }, ...statuses]}
                        selected={selectedStatus}
                        className="row sm"
                        onSelect={filterList}
                    ></Dropdown>
                </div>
                {filteredTasks.length == 0 ? (
                    <section>No tasks found</section>
                ) : (
                    <ul className="tasks-list">
                        {filteredTasks.map((task) => (
                            <TaskItem key={task.id} task={task}></TaskItem>
                        ))}
                    </ul>
                )}
            </section>
        </article>
    );
}

export default TasksList;
