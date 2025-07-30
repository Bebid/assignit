import React, { useContext } from "react";

// resources
import "../css/style.css";
import "../css/login.css";
import google from "../images/google.svg";

// components
import Button from "../components/Button";
import { SessionContext } from "../App";
import supabase from "../supabase";
import Home from "./Home";
import { Navigate } from "react-router-dom";

const Login = () => {
    const session = useContext(SessionContext);

    function googleLogin() {
        supabase.auth.signInWithOAuth({
            provider: "google",
        });
    }

    return !session ? (
        <section id="login">
            <div className="container">
                <div className="card">
                    <div className="card-header font-cursive">Assign.It</div>
                    <div className="card-body">
                        <h1>Hello, Welcome!</h1>
                        <Button type="secondary" onClick={() => googleLogin()}>
                            <img src={google}></img>Login with Google
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    ) : (
        <Navigate to="/home" />
    );
};

export default Login;
