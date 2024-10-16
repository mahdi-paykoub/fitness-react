import {createContext, useContext} from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    token:null,
    userInfo:null,
    login:()=>{},
    logout:()=>{},
})
