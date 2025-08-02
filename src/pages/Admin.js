import React, { useEffect, useState } from "react";
import "../css/admin.css";
import { useContext } from "react";
import { SessionContext } from "../App";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import Dropdown from "../components/Form/Dropdown";
import supabase from "../supabase";
import { roles, statuses } from "../data";
import Checkbox from "../components/Form/Checkbox";

function Admin() {
    const { session, gettingSession, user } = useContext(SessionContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        supabase
            .from("users")
            .select()
            .then(({ data, error }) => {
                setUsers(data);
                console.log(data);
            });
    }, []);

    const changeUserRole = (key, role) => {
        let usersCopy = [...users];
        usersCopy[key].role = role;

        supabase
            .from("users")
            .update({
                role: role,
            })
            .eq("id", usersCopy[key].id)
            .then(({ data, result }) => {
                setUsers(usersCopy);
            });
    };
    const toggleAdminAccess = (key) => {
        let usersCopy = [...users];
        usersCopy[key].isAdmin = !usersCopy[key].isAdmin;

        supabase
            .from("users")
            .update({
                isAdmin: usersCopy[key].isAdmin,
            })
            .eq("id", usersCopy[key].id)
            .then(() => {
                setUsers(usersCopy);
            });
    };
    return !gettingSession ? (
        session ? (
            <>
                <Header session={session} user={user}></Header>
                <main>
                    <div className="container">
                        <section id="admin">
                            <h2>User Management</h2>
                            <ul className="user-list">
                                <li>
                                    <strong>Name</strong>
                                    <strong>Role</strong>
                                    <strong>Admin Access</strong>
                                </li>
                                {users.map((user, key) => (
                                    <li key={user.id}>
                                        <div>
                                            <img src={user.photo}></img>
                                            {user.name}
                                        </div>
                                        <div>
                                            <Dropdown
                                                className={`role-${user.role}`}
                                                selected={roles.findIndex(
                                                    (role) =>
                                                        role.id == user.role
                                                )}
                                                items={roles}
                                                onSelect={(id) =>
                                                    changeUserRole(key, id)
                                                }
                                            ></Dropdown>
                                        </div>
                                        <div>
                                            <Checkbox
                                                checked={user.isAdmin}
                                                onClick={() =>
                                                    toggleAdminAccess(key)
                                                }
                                                label="Admin Access"
                                            ></Checkbox>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </main>
            </>
        ) : (
            <Navigate to="/" />
        )
    ) : (
        <div> Loading</div>
    );
}

export default Admin;
