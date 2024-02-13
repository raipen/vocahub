import { useState, useContext } from "react";
import { ErrorWithToast,ExpiredAccessTokenError } from '@utils/errors';
import { LoginContext } from "@context/LoginContext";

const useFetchUpdate =  <T,U extends any[]>(fetchFunction: (accessToken:string,...args:U) => Promise<T>)
    : [boolean, (...args:U)=>Promise<T>] => {
    const { accessToken, refresh } = useContext(LoginContext);
    const [loading, setLoading] = useState(false);
    
    const fetch = async (...args:U) => {
        setLoading(true);
        try {
            return await fetchFunction(accessToken, ...args);
        } catch (e : unknown) {
            if(e instanceof ExpiredAccessTokenError){
                await refresh();
            }
            throw e instanceof ErrorWithToast ? e : new ErrorWithToast("unknown error");
        } finally {
            setLoading(false);
        }
    }

    return [loading, fetch];
}

export default useFetchUpdate;
