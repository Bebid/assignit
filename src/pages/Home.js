import React, { useContext, useEffect, useState } from "react";

import Header from "../components/Header";
import TasksList from "../components/Tasks/TasksList";
import { SessionContext } from "../App";
import { Navigate } from "react-router-dom";
import supabase from "../supabase";

function Home() {
    const { session, gettingSession } = useContext(SessionContext);
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        supabase
            .from("tasks")
            .select()
            .then(({ data, error }) => {
                setTasks(data);
            });
    }, []);
    return !gettingSession ? (
        session ? (
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
        )
    ) : (
        <div>Loading</div>
    );
}

export default Home;
