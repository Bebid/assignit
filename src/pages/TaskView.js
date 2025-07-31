import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Task from "../components/Tasks/Task";
import { useParams } from "react-router-dom";
import supabase from "../supabase";
import { SessionContext } from "../App";
import { Navigate } from "react-router-dom";

function TaskView() {
    const { session, gettingSession } = useContext(SessionContext);
    const [task, setTask] = useState({});
    const [taskLoading, setTaskLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        supabase
            .from("tasks")
            .select(
                "*, assigned_to:users!tasks_assigned_to_fkey(name), created_by:users!tasks_created_by_fkey(name)"
            )
            .eq("id", id)
            .then(({ data }) => {
                setTask(data[0]);
                setTaskLoading(false);
            });
    }, []);

    return !gettingSession ? (
        session ? (
            <div>
                <Header profile={session}></Header>
                <main>
                    <div className="container">
                        {!taskLoading && <Task task={task}></Task>}
                    </div>
                </main>
            </div>
        ) : (
            <Navigate to="/" />
        )
    ) : (
        <div> Loading</div>
    );
}

export default TaskView;
