import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Task from "../components/Tasks/Task";
import { useParams } from "react-router-dom";
import supabase from "../supabase";
import { SessionContext } from "../App";
import { Navigate } from "react-router-dom";

function TaskView() {
    const { session, user } = useContext(SessionContext);
    const { id } = useParams();

    return (
        <div>
            <Header session={session} user={user}></Header>
            <main>
                <div className="container">
                    <Task id={id}></Task>
                </div>
            </main>
        </div>
    );
}

export default TaskView;
