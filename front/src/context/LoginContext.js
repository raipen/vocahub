import { createContext, useState, useCallback, useMemo } from 'react';

export const LoginContext = createContext(null);

export const useLoginValue = () => {
    const [isLogined, setIsLogined] = useState(null);
    const [accessToken, setAccessToken] = useState("");

    const refresh = useCallback(async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLogined(true);
        setAccessToken("access_token");
    }, []);

    return useMemo(() => ({ isLogined, setIsLogined, accessToken, setAccessToken, refresh }), [isLogined, accessToken, refresh]);
}