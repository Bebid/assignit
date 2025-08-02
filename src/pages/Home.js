import React, { useContext, useEffect, useState } from "react";

import Header from "../components/Header";
import TasksList from "../components/Tasks/TasksList";
import { SessionContext } from "../App";
import { Navigate } from "react-router-dom";
import supabase from "../supabase";

function Home() {
    const { session, user } = useContext(SessionContext);
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        supabase
            .from("tasks")
            .select()
            .then(({ data, error }) => {
                setTasks(data);
            });
    }, []);

    return (
        <div>
            <Header session={session} user={user}></Header>
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
    );
}

export default Home;
