import React, { useEffect, useReducer, useState } from "react";
import "../css/admin.css";
import Header from "../components/Header";
import Dropdown from "../components/Form/Dropdown";
import supabase from "../supabase";
import { roles } from "../data";
import Checkbox from "../components/Form/Checkbox";
import Alert from "../components/Alert";
import { alertReducer } from "../reducers/alertReducer";

function Admin() {
    const [users, setUsers] = useState([]);
    const [alert, dispatchAlert] = useReducer(alertReducer, {});

    useEffect(() => {
        supabase
            .from("users")
            .select()
            .then(({ data }) => {
                setUsers(data);
            });
    }, []);

    const changeUserRole = (key, role) => {
        dispatchAlert({ type: "close" });
        let usersCopy = [...users];
        usersCopy[key].role = role;

        supabase
            .from("users")
            .update({
                role: role,
            })
            .eq("id", usersCopy[key].id)
            .then(() => {
                setUsers(usersCopy);
                dispatchAlert({
                    type: "open",
                    alert: {
                        message: `You've changed ${
                            usersCopy[key].name
                        } role to ${
                            roles.find((oRole) => oRole.id == role).text
                        }`,
                        timeout: setTimeout(() => {
                            dispatchAlert({ type: "close" });
                        }, 3000),
                    },
                });
            });
    };

    const toggleAdminAccess = (key) => {
        dispatchAlert({ type: "close" });
        let usersCopy = [...users];
        let isAdmin = !usersCopy[key].isAdmin;
        usersCopy[key].isAdmin = isAdmin;

        supabase
            .from("users")
            .update({
                isAdmin: usersCopy[key].isAdmin,
            })
            .eq("id", usersCopy[key].id)
            .then(() => {
                setUsers(usersCopy);
                dispatchAlert({
                    type: "open",
                    alert: {
                        message: isAdmin
                            ? `You've granted Admin access to ${usersCopy[key].name}`
                            : `${usersCopy[key].name} no longer has Admin rights.`,
                        type: "info",
                        timeout: setTimeout(() => {
                            dispatchAlert({ type: "close" });
                        }, 3000),
                    },
                });
            });
    };

    return (
        <>
            <Header></Header>
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
                                            selected={user.role}
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
            <Alert value={alert}></Alert>
        </>
    );
}

export default Admin;
