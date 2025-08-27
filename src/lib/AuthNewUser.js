import React, { useContext } from "react";
import { SessionContext } from "../App";
import { Navigate } from "react-router-dom";

function AuthNewUser({ children }) {
    const { user } = useContext(SessionContext);

    if (user.role != "0") {
        return <Navigate to="/home"></Navigate>;
    }

    return children;
}

export default AuthNewUser;
