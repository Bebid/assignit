import React from "react";
import Header from "../components/Header";
import Task from "../components/Tasks/Task";

function TaskView() {
    return (
        <div>
            <Header></Header>
            <main>
                <div className="container">
                    <Task></Task>
                </div>
            </main>
        </div>
    );
}

export default TaskView;
