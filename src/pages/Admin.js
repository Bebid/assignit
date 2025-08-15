import React, { useEffect, useState } from "react";
import "../css/admin.css";
import Header from "../components/Header";
import Dropdown from "../components/Form/Dropdown";
import supabase from "../supabase";
import { roles } from "../data";
import Checkbox from "../components/Form/Checkbox";

function Admin() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        supabase
            .from("users")
            .select()
            .then(({ data }) => {
                setUsers(data);
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
            .then(() => {
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
        </>
    );
}

export default Admin;
