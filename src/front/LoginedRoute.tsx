import { Navigate } from "react-router";
import React, { useContext } from "react";
import { LoginContext } from "@context/LoginContext";

function LoginedRoute ({element, isLoginPage=true}:{element:React.ReactElement, isLoginPage?:boolean}) {
    const { isLogined, loading } = useContext(LoginContext);

    if(loading){
        return <></>;
    }
    
    if(isLogined === false && isLoginPage === true){
        return <Navigate to="/login" />;
    }
    if(isLogined === true && isLoginPage === false){
        return <Navigate to="/mywordbook" />;
    }
    return element;
};

export default LoginedRoute;
