import { Navigate, useParams } from "react-router-dom";
import { useContext,useEffect } from "react";
import LoginContext from "@context/LoginContext";

function SetAccessToken() {
  const { accessToken } = useParams() as {accessToken:string};
  const { login } = useContext(LoginContext);
  useEffect(() => {
    login(accessToken);
  }, [accessToken]);

  return <></>;
}

export default SetAccessToken;
