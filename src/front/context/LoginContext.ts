import { createContext } from 'react';

export default createContext({} as {
    isLogined: boolean;
    loading: boolean;
    accessToken: string;
    refresh: <T,U extends any[]> (callback?:(accessToken:string,...args:U)=>Promise<T>, ...args:U)=>Promise<void>;
    login: (accessToken:string)=>void;
    logout: ()=>Promise<void>;
    signUp: (arg: {name: string, password: string})=>Promise<void>;
});
