import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PageProtector({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const nav = useNavigate();
    console.log("pageProtector");
    useEffect(() => {
        //TODO Check auth state and update is loading
        if(localStorage.getItem("employeeId") != null){
            console.log("not loading");
            setIsLoading(false);
        }
        else{
            console.log("loading");
            nav("/");
            setIsLoading(true);
        }
    },[]);

    if (isLoading) {
        return (
            <p>Page Loading Or No Authorization</p>
        );
    }

    return children;
}