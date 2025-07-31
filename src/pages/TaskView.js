import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Task from "../components/Tasks/Task";
import { useParams } from "react-router-dom";
import supabase from "../supabase";
import { SessionContext } from "../App";
import { Navigate } from "react-router-dom";

function TaskView() {
    const { session, gettingSession } = useContext(SessionContext);
    const { id } = useParams();

    return !gettingSession ? (
        session ? (
            <div>
                <Header profile={session}></Header>
                <main>
                    <div className="container">
                        <Task id={id}></Task>
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
