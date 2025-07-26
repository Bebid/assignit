import React, { useState } from "react";
import logo from "../images/AI-Logo.png";
import "./header.css";

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
            <div class="container">
                <section class="desktop-menu">
                    <nav>
                        <img src={logo} alt="App Logo" class="logo"></img>
                        <ul>
                            <li>
                                <a href="">Tasks</a>
                            </li>
                            <li>
                                <button class="button secondary small">
                                    Create Task
                                </button>
                            </li>
                        </ul>
                    </nav>
                    <figure class="profile">
                        <figcaption>John</figcaption>
                        <img
                            alt="Profile Picture"
                            onClick={() => toggleProfileMenu()}
                        ></img>
                    </figure>
                    <figure class="profile mobile">
                        <img
                            alt="Profile Picture"
                            onClick={() => toggleMobileMenu()}
                        ></img>
                    </figure>
                    <div class={`header-dropdown ${openClass}`}>
                        <a href="#">Logout</a>
                    </div>
                </section>
                <section class={`mobile-menu ${mobileMenuOpenClass}`}>
                    <nav>
                        <ul>
                            <li>
                                <p>John</p>
                            </li>
                            <li>
                                <a href="">Tasks</a>
                            </li>
                            <li>
                                <button class="button secondary small">
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
