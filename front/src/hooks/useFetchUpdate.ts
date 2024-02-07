import { useState, useContext } from "react";
import { ErrorWithToast } from '@utils/erros';
import { LoginContext } from "@context/LoginContext";

const useFetchUpdate =  <T,U extends any[]>(fetchFunction: (accessToken:string,...args:U) => Promise<T>)
    : [boolean, (...args:U)=>Promise<void>, ErrorWithToast | null] => {
    const { accessToken, refresh } = useContext(LoginContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ErrorWithToast | null>(null);
    
    const fetch = async (...args:U) => {
        setLoading(true);
        try {
            await fetchFunction(accessToken, ...args);
        } catch (e : any) {
                setError(e);
        }
        setLoading(false);
        refresh();
    }

    return [loading, fetch, error];
}

export default useFetchUpdate;