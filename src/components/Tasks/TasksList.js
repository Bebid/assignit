import React, { useState } from "react";
import chevron from "../../images/chevron-down.svg";
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
                    {headline} ({filteredTasks.length}){" "}
                    <img src={chevron} alt="Chevron Down" />
                </h2>
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
