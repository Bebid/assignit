import "../css/style.css";
import "../css/login.css";
import google from "../images/google.svg";
import React from "react";

const Login = () => {
    return (
        <section id="login">
            <div class="container">
                <div class="card">
                    <div class="card-header font-cursive">Assign.It</div>
                    <div class="card-body">
                        <h1>Hello, Welcome!</h1>
                        <button class="button">
                            <img src={google}></img>Login with Google
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
