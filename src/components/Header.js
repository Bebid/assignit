import React, { useState } from "react";
import logo from "../images/AI-Logo.png";
import "./header.css";

import Button from "./Button";

import supabase from "../supabase";
import { NavLink } from "react-router-dom";

function Header({
    profile: {
        user: {
            user_metadata: { avatar_url, name },
        },
    },
}) {
    const [profileStatus, setProfileStatus] = useState(false);
    const [mobileMenuStatus, setMobileMenuStatus] = useState(false);
    const openClass = profileStatus ? "open" : "";
    const mobileMenuOpenClass = mobileMenuStatus ? "open" : "";

    function toggleProfileMenu() {
        setProfileStatus(!profileStatus);
    }

    function toggleMobileMenu() {
        setMobileMenuStatus(!mobileMenuStatus);
    }

    function logout() {
        supabase.auth.signOut();
    }

    return (
        <header>
            <div className="container">
                <section className="desktop-menu">
                    <nav>
                        <img src={logo} alt="App Logo" className="logo"></img>
                        <ul>
                            <li>
                                <NavLink to="/home">Tasks</NavLink>
                            </li>
                            <li>
                                <NavLink to="/tasks/create">
                                    <Button type="inverted" size="small">
                                        Create Task
                                    </Button>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    <figure className="profile">
                        <figcaption>{name}</figcaption>
                        <img
                            src={avatar_url}
                            alt="Profile Picture"
                            onClick={() => toggleProfileMenu()}
                        ></img>
                    </figure>
                    <figure className="profile mobile">
                        <img
                            src={avatar_url}
                            alt="Profile Picture"
                            onClick={() => toggleMobileMenu()}
                        ></img>
                    </figure>
                    <div
                        onClick={() => logout()}
                        className={`header-dropdown ${openClass}`}
                    >
                        <p>Logout</p>
                    </div>
                </section>
                <section className={`mobile-menu ${mobileMenuOpenClass}`}>
                    <nav>
                        <ul>
                            <li>
                                <p>{name}</p>
                            </li>
                            <li>
                                <NavLink to="/home">Tasks</NavLink>
                            </li>
                            <li>
                                <NavLink to="/tasks/create">
                                    <Button type="inverted" size="small">
                                        Create Task
                                    </Button>
                                </NavLink>
                            </li>
                            <li onClick={() => logout()}>
                                <p>Logout</p>
                            </li>
                        </ul>
                    </nav>
                </section>
            </div>
        </header>
    );
}

export default Header;
