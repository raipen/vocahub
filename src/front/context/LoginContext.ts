import { createContext, useState, useCallback, useMemo, useEffect } from 'react';
import { requestLogin, requestRefresh, requestLogout, requestSignUp } from '@apis/auth';
import { ErrorWithToast, NoAuthorizationInCookieError, UserAuthorizationError } from '@errors';
import { useNavigate } from 'react-router-dom';

export const LoginContext = createContext({
    isLogined: false,
    loading: true,
    accessToken: "",
    refresh: async <T,U extends any[]> (callback?:(accessToken:string,...args:U)=>Promise<T>, ...args:U)=>{},
    login: async (arg: {name: string, password: string})=>{},
    logout: async ()=>{},
    signUp: async (arg: {name: string, password: string})=>{},
});


export const useInitLoginContext = () => {
    const [isLogined, setIsLogined] = useState(false);
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        (async ()=>{
            try {
                const accessToken = await requestRefresh();
                setAccessToken(accessToken);
                setIsLogined(true);
            } catch (e: unknown) {
                setIsLogined(false);
                if(e instanceof NoAuthorizationInCookieError) return;
                if(e instanceof UserAuthorizationError) {
                    await requestLogout();
                    alert("로그인 정보가 만료되었습니다. 다시 로그인해주세요.");
                    return;
                }
                throw e instanceof ErrorWithToast ? e : new ErrorWithToast("unknown error");
            } finally {
                setLoading(false);
            }
        })();
    },[]);
    
    const refresh = useCallback(async<T,U extends any[]> (callback?:(accessToken:string,...args:U)=>Promise<T>, ...args:U)=>{
        setLoading(true);
        try {
            const accessToken = await requestRefresh();
            await callback?.(accessToken, ...args);
            setAccessToken(accessToken);
            setIsLogined(true);
        } catch (e: unknown) {
            setIsLogined(false);
            throw e instanceof ErrorWithToast ? e : new ErrorWithToast("unknown error");
        } finally {
            setLoading(false);
        }
    }, []);
    const login = useCallback(async ({name, password}:{name:string,password:string})=>{
        setLoading(true);
        try {
            const accessToken = await requestLogin({name, password});
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
            navigate("/");
        }
    }, []);
    const signUp = useCallback(async ({name, password}:{name:string,password:string})=>{
        setLoading(true);
        try {
            const accessToken = await requestSignUp({name, password});
            setAccessToken(accessToken);
            setIsLogined(true);
        } catch (e: unknown) {
            setIsLogined(false);
            throw e instanceof ErrorWithToast ? e : new ErrorWithToast("unknown error");
        } finally {
            setLoading(false);
        }
    }, []);

    return useMemo(() => ({ isLogined, loading, accessToken,  refresh, login , logout, signUp }), [isLogined, loading, accessToken, refresh, login, logout, signUp]);
}
