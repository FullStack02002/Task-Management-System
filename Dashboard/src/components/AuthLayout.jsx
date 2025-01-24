
import React,{ useEffect} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignIn } from "../pages";


const AuthLayout=({children,authentication=true})=>{
    const navigate=useNavigate();
    const authStatus=useSelector((state)=>state.auth.status);

    useEffect(()=>{
        if(!authentication && authStatus!==authentication){
            navigate("/login");        }
    },[authStatus,authentication,navigate])

    if(authentication && authStatus!==authentication){
        return <SignIn/>
    }
    return children;
}


export { AuthLayout};