import React, { useContext } from "react";
import Header from "../components/Header";
import CreateForm from "../components/Tasks/CreateForm";
import { Navigate } from "react-router-dom";
import { SessionContext } from "../App";

function CreateTask() {
    const session = useContext(SessionContext);
    return session ? (
        <div>
            <Header profile={session}></Header>
            <main>
                <div className="container">
                    <CreateForm></CreateForm>
                </div>
            </main>
        </div>
    ) : (
        <Navigate to="/"></Navigate>
    );
}

export default CreateTask;
