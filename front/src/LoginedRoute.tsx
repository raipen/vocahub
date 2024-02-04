import { Navigate } from "react-router";
import React, { useContext } from "react";
import { LoginContext } from "@context/LoginContext";

function LoginedRoute ({element}:{element:React.ReactElement}) {
    const { isLogined, refresh } = useContext(LoginContext);

    if(isLogined === null){
        refresh();
        return <></>;
    }
    
    if(isLogined === false){
        return <Navigate to="/login" />;
    }
    return element;
};

export default LoginedRoute;