import { useState, useCallback, useMemo, useEffect } from 'react';
import { requestRefresh, requestLogout } from '@apis/auth';
import { ErrorWithToast, NoAuthorizationInCookieError, UserAuthorizationError } from '@errors';
import { useNavigate, useLocation } from 'react-router-dom';

const useInitLogin = () => {
    const [isLogined, setIsLogined] = useState(false);
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState("");
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(()=>{
        if(pathname.startsWith("/login/") && pathname !== "/login/") return;
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
    const login = useCallback((accessToken:string)=>{
        setAccessToken(accessToken);
        setIsLogined(true);
        setLoading(false);
        navigate("/mywordbook");
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

    return useMemo(() => ({ isLogined, loading, accessToken,  refresh, login , logout }), [isLogined, loading, accessToken, refresh, login, logout]);
}

export default useInitLogin;
