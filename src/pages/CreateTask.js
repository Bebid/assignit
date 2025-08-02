import React, { useContext } from "react";
import Header from "../components/Header";
import CreateForm from "../components/Tasks/CreateForm";
import { Navigate } from "react-router-dom";
import { SessionContext } from "../App";

function CreateTask() {
    const { session, user } = useContext(SessionContext);

    return (
        <>
            <Header session={session} user={user}></Header>
            <main>
                <div className="container">
                    <CreateForm></CreateForm>
                </div>
            </main>
        </>
    );
}

export default CreateTask;
