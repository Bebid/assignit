import "../css/style.css";
import "../css/login.css";
import google from "../images/google.svg";
import React from "react";

import Button from "../components/Button";

const Login = () => {
    return (
        <section id="login">
            <div className="container">
                <div className="card">
                    <div className="card-header font-cursive">Assign.It</div>
                    <div className="card-body">
                        <h1>Hello, Welcome!</h1>
                        <Button type="secondary">
                            <img src={google}></img>Login with Google
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
