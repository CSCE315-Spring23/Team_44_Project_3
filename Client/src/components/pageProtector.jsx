import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PageProtector({ children }) {
    const [isLoading, setIsLoading] = useState(true);
    const nav = useNavigate();
    console.log("pageProtector");
    useEffect(() => {
        if(localStorage.getItem("employeeId") != null){
            setIsLoading(false);
        }
        else{
            console.log("pageprotector nav to login");
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