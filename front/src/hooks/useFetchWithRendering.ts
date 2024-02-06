import { useEffect, useState, useContext } from "react";
import { ErrorWithToast } from '@utils/erros';
import { LoginContext } from "@context/LoginContext";
import { ExpiredAccessTokenError } from "@utils/erros";

const useFetchWithRendering =  <T,U extends any[]>(fetchFunction: (accessToken:string,...args:U) => Promise<T>, ...args:U): [T | null, boolean, ErrorWithToast | null] => {
    const { accessToken, refresh } = useContext(LoginContext);
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ErrorWithToast | null>(null);


    useEffect(() => {
        fetchFunction(accessToken, ...args)
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                if(error instanceof ExpiredAccessTokenError) {
                    return refresh();
                }
                setError(error);
                setLoading(false);
            });
    // eslint-disable-next-line
    }, [fetchFunction, accessToken, refresh]);

    return [data, loading, error];
}

export default useFetchWithRendering;