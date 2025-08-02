import React from "react";
import Header from "../components/Header";
import CreateForm from "../components/Tasks/CreateForm";

function CreateTask() {
    return (
        <>
            <Header></Header>
            <main>
                <div className="container">
                    <CreateForm></CreateForm>
                </div>
            </main>
        </>
    );
}

export default CreateTask;
