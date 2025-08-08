import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Task from "../components/Tasks/Task";
import { useParams } from "react-router-dom";
import { SessionContext } from "../App";
import supabase from "../supabase";

function TaskView() {
    const { id } = useParams();
    const { user } = useContext(SessionContext);

    const [task, setTask] = useState({});
    const [taskLoading, setTaskLoading] = useState(true);

    useEffect(() => {
        supabase
            .from("tasks")
            .select(
                "*, assigned_to:users!tasks_assigned_to_fkey(id, name), created_by:users!tasks_created_by_fkey(id, name)"
            )
            .eq("id", id)
            .then(({ data }) => {
                setTask(data[0]);
                setTaskLoading(false);
            });
    }, []);

    return (
        <div>
            <Header></Header>
            <main>
                <div className="container">
                    {!taskLoading &&
                        (user.id != task.created_by.id &&
                        user.id != task.assigned_to ? (
                            "Permission Denied"
                        ) : (
                            <Task task={task}></Task>
                        ))}
                </div>
            </main>
        </div>
    );
}

export default TaskView;
