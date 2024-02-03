import { Navigate } from "react-router";
import React, { useContext } from "react";
import { LoginContext } from "./context/LoginContext";

const LoginedRoute = ({element}) => {
    const { isLogined, refresh } = useContext(LoginContext);

    if(isLogined === null){
        refresh();
        return;
    }
    
    if(isLogined === false){
        return <Navigate to="/login" />;
    }
    return element;
};

export default LoginedRoute;