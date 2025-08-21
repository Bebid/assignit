import React, { useEffect, useState } from "react";
import "../css/admin.css";
import Header from "../components/Header";
import Dropdown from "../components/Form/Dropdown";
import supabase from "../supabase";
import { roles } from "../data";
import Checkbox from "../components/Form/Checkbox";
import Alert from "../components/Alert";

function Admin() {
    const [users, setUsers] = useState([]);
    const [alert, setAlert] = useState({});

    const closeAlert = () => {
        setAlert((prev) => {
            return { ...prev, display: false };
        });

        clearTimeout(alert.timeout);
    };

    const showAlert = (message, type = "success", timeoutFn = closeAlert) => {
        const timeout = setTimeout(timeoutFn, 5000);
        setAlert({
            display: true,
            message: message,
            timeout: timeout,
            onClose: closeAlert,
            type: type,
        });
    };

    useEffect(() => {
        supabase
            .from("users")
            .select()
            .then(({ data }) => {
                setUsers(data);
            });
    }, []);

    const changeUserRole = (key, role) => {
        closeAlert();
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
                showAlert("Successfully changed user role");
            });
    };

    const toggleAdminAccess = (key) => {
        closeAlert();
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
                showAlert("Successfully changed admin access");
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
