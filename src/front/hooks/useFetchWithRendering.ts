import { useEffect, useState, useContext } from "react";
import { ErrorWithToast, ExpiredAccessTokenError } from '@errors';
import LoginContext from "@context/LoginContext";

const useFetchWithRendering =  <T,U extends any[]>(fetchFunction: (accessToken:string,...args:U) => Promise<T>, ...args:U)
    : [T | null, ErrorWithToast | null] => {
    const { accessToken, refresh } = useContext(LoginContext);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<ErrorWithToast | null>(null);

    useEffect(() => {
        (async () => {
            try{
                const data = await fetchFunction(accessToken, ...args);
                setData(data);
            } catch (error) {
                if(error instanceof ExpiredAccessTokenError){
                    await refresh();
                }
                setError(error as ErrorWithToast);
            }
        })();
    // eslint-disable-next-line
    }, [accessToken]);

    return [data, error];
}

export default useFetchWithRendering;
