import React, { useState } from "react";
import logo from "../images/AI-Logo.png";
import "./header.css";

import Button from "./Button";

function Header() {
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

    return (
        <header>
            <div className="container">
                <section className="desktop-menu">
                    <nav>
                        <img src={logo} alt="App Logo" className="logo"></img>
                        <ul>
                            <li>
                                <a href="">Tasks</a>
                            </li>
                            <li>
                                <Button type="inverted" size="small">
                                    Create Task
                                </Button>
                            </li>
                        </ul>
                    </nav>
                    <figure className="profile">
                        <figcaption>John</figcaption>
                        <img
                            alt="Profile Picture"
                            onClick={() => toggleProfileMenu()}
                        ></img>
                    </figure>
                    <figure className="profile mobile">
                        <img
                            alt="Profile Picture"
                            onClick={() => toggleMobileMenu()}
                        ></img>
                    </figure>
                    <div className={`header-dropdown ${openClass}`}>
                        <a href="#">Logout</a>
                    </div>
                </section>
                <section className={`mobile-menu ${mobileMenuOpenClass}`}>
                    <nav>
                        <ul>
                            <li>
                                <p>John</p>
                            </li>
                            <li>
                                <a href="">Tasks</a>
                            </li>
                            <li>
                                <button className="button inverted small">
                                    Create Task
                                </button>
                            </li>
                            <li>
                                <a href="#">Logout</a>
                            </li>
                        </ul>
                    </nav>
                </section>
            </div>
        </header>
    );
}

export default Header;
