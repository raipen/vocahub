import { createContext, useState, useCallback, useMemo, useEffect } from 'react';
import { requestLogin, requestRefresh, requestLogout } from '@apis/auth';
import { ErrorWithToast } from '@utils/errors';

export const LoginContext = createContext({
    isLogined: false,
    loading: true,
    accessToken: "",
    refresh: async ()=>{},
    login: (arg: {email: string, password: string})=>{},
    logout: ()=>{}
});


export const useInitLoginContext = () => {
    const [isLogined, setIsLogined] = useState(false);
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState("");

    useEffect(()=>{
        (async ()=>{
            try {
                const accessToken = await requestRefresh();
                setAccessToken(accessToken);
                setIsLogined(true);
            } catch (e: unknown) {
                setIsLogined(false);
                throw e instanceof ErrorWithToast ? e : new ErrorWithToast("unknown error");
            } finally {
                setLoading(false);
            }
        })();
    },[]);
    
    const refresh = useCallback(async ()=>{
        setLoading(true);
        try {
            const accessToken = await requestRefresh();
            setAccessToken(accessToken);
            setIsLogined(true);
        } catch (e: unknown) {
            setIsLogined(false);
            throw e instanceof ErrorWithToast ? e : new ErrorWithToast("unknown error");
        } finally {
            setLoading(false);
        }
    }, []);
    const login = useCallback(async ({email, password}:{email:string,password:string})=>{
        setLoading(true);
        try {
            const accessToken = await requestLogin({email, password});
            setAccessToken(accessToken);
            setIsLogined(true);
        } catch (e: unknown) {
            setIsLogined(false);
            throw e instanceof ErrorWithToast ? e : new ErrorWithToast("unknown error");
        } finally {
            setLoading(false);
        }
    }, []);
    const logout = useCallback(async ()=>{
        setLoading(true);
        try {
            await requestLogout();
            setAccessToken("");
            setIsLogined(false);
        } catch (e: unknown) {
            setIsLogined(false);
            throw e instanceof ErrorWithToast ? e : new ErrorWithToast("unknown error");
        } finally {
            setLoading(false);
        }
    }, []);

    return useMemo(() => ({ isLogined, loading, accessToken,  refresh, login , logout }), [isLogined, loading, accessToken, refresh, login, logout]);
}
