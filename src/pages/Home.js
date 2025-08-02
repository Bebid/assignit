import React, { useEffect, useState } from "react";

import Header from "../components/Header";
import TasksList from "../components/Tasks/TasksList";
import supabase from "../supabase";

function Home() {
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
            <Header></Header>
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
