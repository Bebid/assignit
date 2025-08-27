import React, { useContext } from "react";
import { SessionContext } from "../App";
import { Navigate } from "react-router-dom";

function AuthRegisteredUser({ children }) {
    const { session, user } = useContext(SessionContext);
    if (!session) {
        return <Navigate to="/" />;
    }

    if (user.role == "0") {
        return <Navigate to="/for-approval" />;
    }

    return children;
}

export default AuthRegisteredUser;
