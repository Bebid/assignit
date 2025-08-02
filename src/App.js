import React, { useState, useEffect } from "react";

import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateTask from "./pages/CreateTask";
import TaskView from "./pages/TaskView";

import supabase from "./supabase";
import { createContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ForApproval from "./pages/ForApproval";
import Admin from "./pages/Admin";
import AuthNewUser from "./lib/AuthNewUser";
import AuthRegisteredUser from "./lib/AuthRegisteredUser";
import AuthAdmin from "./lib/AuthAdmin";
export const SessionContext = createContext();

function App() {
    const navigate = useNavigate();
    const [session, setSession] = useState(null);
    const [gettingSession, setGettingSession] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (_event == "INITIAL_SESSION") {
                return;
            }

            if (_event == "SIGNED_IN") {
                supabase
                    .from("users")
                    .select()
                    .eq("id", session.user.id)
                    .then(async ({ data }) => {
                        let user = data[0];
                        if (data.length == 0) {
                            let { data } = await supabase
                                .from("users")
                                .insert({
                                    role: "0",
                                    photo: session.user.user_metadata
                                        .avatar_url,
                                    name: session.user.user_metadata.name,
                                })
                                .select();
                            user = data[0];
                        }
                        setUser(user);
                        setGettingSession(false);
                    });
            } else {
                setGettingSession(false);
            }
            setSession(session);
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
                        value={{ session, gettingSession, user }}
                    >
                        <AuthRegisteredUser>
                            <Home></Home>
                        </AuthRegisteredUser>
                    </SessionContext.Provider>
                }
            ></Route>
            <Route
                path="/tasks/create"
                element={
                    <SessionContext.Provider
                        value={{ session, gettingSession, user }}
                    >
                        <AuthRegisteredUser>
                            <CreateTask></CreateTask>
                        </AuthRegisteredUser>
                    </SessionContext.Provider>
                }
            ></Route>
            <Route
                path="/tasks/view/:id"
                element={
                    <SessionContext.Provider
                        value={{ session, gettingSession, user }}
                    >
                        <AuthRegisteredUser>
                            <TaskView></TaskView>
                        </AuthRegisteredUser>
                    </SessionContext.Provider>
                }
            ></Route>

            {/* Admin */}
            <Route
                path="/admin"
                element={
                    <SessionContext.Provider
                        value={{ session, gettingSession, user }}
                    >
                        <AuthRegisteredUser>
                            <AuthAdmin>
                                <Admin></Admin>
                            </AuthAdmin>
                        </AuthRegisteredUser>
                    </SessionContext.Provider>
                }
            ></Route>

            <Route
                path="/for-approval"
                element={
                    <SessionContext.Provider
                        value={{ session, gettingSession, user }}
                    >
                        <AuthNewUser>
                            <ForApproval></ForApproval>
                        </AuthNewUser>
                    </SessionContext.Provider>
                }
            ></Route>
        </Routes>
    );
    // return <CreateTask></CreateTask>;
    // return <TaskView></TaskView>;
}

export default App;
