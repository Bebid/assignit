import React, { useState, useEffect } from "react";

import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateTask from "./pages/CreateTask";
import TaskView from "./pages/TaskView";

import supabase from "./supabase";
import { createContext } from "react";
import { Route, Routes } from "react-router-dom";

export const SessionContext = createContext();

function App() {
    const [session, setSession] = useState(null);
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
        return () => subscription.unsubscribe();
    }, []);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <SessionContext.Provider value={session}>
                        <Login></Login>
                    </SessionContext.Provider>
                }
            ></Route>
            <Route
                path="/home"
                element={
                    <SessionContext.Provider value={session}>
                        <Home></Home>
                    </SessionContext.Provider>
                }
            ></Route>
            <Route
                path="/tasks/create"
                element={
                    <SessionContext.Provider value={session}>
                        <CreateTask></CreateTask>
                    </SessionContext.Provider>
                }
            ></Route>
        </Routes>
    );
    // return <CreateTask></CreateTask>;
    // return <TaskView></TaskView>;
}

export default App;
