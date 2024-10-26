import {createContext, useContext} from "react";

export const AuthContext = createContext({
    isLoggedIn: null,
    token:null,
    userInfo:null,
    login:()=>{},
    logout:()=>{},
})
