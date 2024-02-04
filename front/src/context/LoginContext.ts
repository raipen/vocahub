import { createContext, useState, useCallback, useMemo } from 'react';
import { requestLogin, requestRefresh, requestLogout } from '../utils/apis/auth';

export const LoginContext = createContext({
    isLogined: null as null|boolean,
    accessToken: "",
    refresh: ()=>{},
    login: (arg: {email: string, password: string})=>{},
    logout: ()=>{}
});

export const useInitLoginContext = () => {
    const [isLogined, setIsLogined] = useState(null as null|boolean);
    const [accessToken, setAccessToken] = useState("");
    const refresh = useCallback(()=>requestRefresh({ setIsLogined, setAccessToken })(), []);
    const login = useCallback(({email, password}:{email:string,password:string})=>requestLogin({ setIsLogined, setAccessToken })({email, password}), []);
    const logout = useCallback(()=>requestLogout({ setIsLogined, setAccessToken })(), []);

    return useMemo(() => ({ isLogined, accessToken,  refresh, login , logout }), [isLogined, accessToken, refresh, login, logout]);
}