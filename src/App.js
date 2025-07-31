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
    const [gettingSession, setGettingSession] = useState(true);

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (_event == "SIGNED_IN") {
                supabase
                    .from("users")
                    .select()
                    .eq("id", session.user.id)
                    .then(({ data }) => {
                        if (data.length == 0) {
                            supabase.from("users").insert({
                                role: 0,
                                photo: session.user.user_metadata.avatar_url,
                                name: session.user.user_metadata.name,
                            });
                        }
                    });
            }
            setSession(session);
            setGettingSession(false);
        });
        return () => subscription.unsubscribe();
    }, []);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <SessionContext.Provider
                        value={{ session, gettingSession }}
                    >
                        <Login></Login>
                    </SessionContext.Provider>
                }
            ></Route>
            <Route
                path="/home"
                element={
                    <SessionContext.Provider
                        value={{ session, gettingSession }}
                    >
                        <Home></Home>
                    </SessionContext.Provider>
                }
            ></Route>
            <Route
                path="/tasks/create"
                element={
                    <SessionContext.Provider
                        value={{ session, gettingSession }}
                    >
                        <CreateTask></CreateTask>
                    </SessionContext.Provider>
                }
            ></Route>
            <Route
                path="/tasks/view/:id"
                element={
                    <SessionContext.Provider
                        value={{ session, gettingSession }}
                    >
                        <TaskView></TaskView>
                    </SessionContext.Provider>
                }
            ></Route>
        </Routes>
    );
    // return <CreateTask></CreateTask>;
    // return <TaskView></TaskView>;
}

export default App;
