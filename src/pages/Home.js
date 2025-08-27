import React, { useContext, useEffect, useState } from "react";

import Header from "../components/Header";
import TasksList from "../components/Tasks/TasksList";
import supabase from "../supabase";
import { SessionContext } from "../App";

function Home() {
    const { user } = useContext(SessionContext);

    const [tasks, setTasks] = useState([]);
    const [gettingTasks, setGettingTasks] = useState(true);
    const [createdTasks, setCreatedTasks] = useState([]);
    const [gettingCreatedTasks, setGettingCreatedTasks] = useState(true);

    useEffect(() => {
        supabase
            .from("tasks")
            .select()
            .eq("assigned_to", user.id)
            .then(({ data, error }) => {
                setTasks(data);
                setGettingTasks(false);
            });

        supabase
            .from("tasks")
            .select()
            .eq("created_by", user.id)
            .then(({ data, error }) => {
                setCreatedTasks(data);
                setGettingCreatedTasks(false);
            });
    }, []);

    return (
        <div>
            <Header></Header>
            <main>
                <div className="container gap-sm">
                    {!gettingTasks ? (
                        <TasksList
                            headline="Tasks assigned to me"
                            tasks={tasks}
                            defaultState={true}
                        ></TasksList>
                    ) : (
                        <div className="tasks">Getting Task...</div>
                    )}
                    {!gettingCreatedTasks ? (
                        <TasksList
                            headline="Tasks I created"
                            tasks={createdTasks}
                        ></TasksList>
                    ) : (
                        <div className="tasks">Getting Task...</div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Home;
