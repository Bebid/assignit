import React, { useContext } from "react";
import { SessionContext } from "../App";
import { Navigate } from "react-router-dom";

function AuthAdmin({ children }) {
    const { user } = useContext(SessionContext);

    if (!user.isAdmin) {
        return <Navigate to="/home" />;
    }
    return children;
}

export default AuthAdmin;
