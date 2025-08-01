import React from "react";
import "../css/for-approval.css";
import logo from "../images/logo192.png";

function ForApproval() {
    return (
        <section id="for-approval">
            <div className="container">
                <img src={logo} alt="Assign It Logo" />

                <div>
                    <h1>Your account has been successfully registered!</h1>
                    <p>
                        We're currently reviewing your information.
                        <br />
                        Access to the app will be granted once the approval
                        process is complete.
                        <br />
                        <br />
                        Thank you for your patience!
                    </p>
                </div>
            </div>
        </section>
    );
}

export default ForApproval;
