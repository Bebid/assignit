import React from "react";
import Header from "../components/Header";
import Task from "../components/Tasks/Task";
import { useParams } from "react-router-dom";

function TaskView() {
    const { id } = useParams();

    return (
        <div>
            <Header></Header>
            <main>
                <div className="container">
                    <Task id={id}></Task>
                </div>
            </main>
        </div>
    );
}

export default TaskView;
