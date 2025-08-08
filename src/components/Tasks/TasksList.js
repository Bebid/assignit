import React, { useState } from "react";
import "./TasksList.css";
import TaskItem from "./TaskItem";
import Dropdown from "../Form/Dropdown";
import { statuses } from "../../data";

function TasksList({ tasks, headline }) {
    const [filteredTasks, setFilteredTasks] = useState(tasks);
    const [selectedStatus, setSelectedStatus] = useState(tasks.status);

    const filterList = (status) => {
        if (status == "A") {
            setFilteredTasks(tasks);
        } else {
            setFilteredTasks(tasks.filter((task) => task.status == status));
        }
        setSelectedStatus(status);
    };

    return (
        <article>
            <h2 className="tasks-list-header">{headline}</h2>
            <section className="tasks-filter">
                <Dropdown
                    label="Status:"
                    items={[{ id: "A", text: "All" }, ...statuses]}
                    selected={selectedStatus}
                    className="row"
                    onSelect={filterList}
                ></Dropdown>
            </section>
            <ul className="tasks-list">
                {filteredTasks.map((task) => (
                    <TaskItem key={task.id} task={task}></TaskItem>
                ))}
            </ul>
        </article>
    );
}

export default TasksList;
