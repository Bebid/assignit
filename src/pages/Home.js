import React, { useContext } from "react";

import Header from "../components/Header";
import TasksList from "../components/Tasks/TasksList";
import { SessionContext } from "../App";
import { Navigate } from "react-router-dom";

function Home() {
    const session = useContext(SessionContext);
    const tasks = [
        {
            id: 1,
            title: "Get this document to John",
            dateCreated: new Date(),
            dateClosed: new Date(),
            status: "P",
            assigneeId: 1,
        },
        {
            id: 2,
            title: "Go to the store",
            dateCreated: new Date(),
            dateClosed: new Date(),
            status: "O",
            assigneeId: 1,
        },
        {
            id: 3,
            title: "Random task (required)",
            dateCreated: new Date(),
            dateClosed: new Date(),
            status: "C",
            assigneeId: 2,
        },
    ];
    return session ? (
        <div>
            <Header profile={session}></Header>
            <main>
                <div className="container">
                    <TasksList
                        headline="Tasks assigned to me"
                        tasks={tasks}
                    ></TasksList>
                    <TasksList
                        headline="Tasks I created"
                        tasks={tasks}
                    ></TasksList>
                </div>
            </main>
        </div>
    ) : (
        <Navigate to="/"></Navigate>
    );
}

export default Home;
