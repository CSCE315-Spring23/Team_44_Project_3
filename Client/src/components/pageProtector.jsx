import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function pageProtector({ children }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        //TODO Check auth state and update is loading
    }, []);

    if (isLoading) {
        return (
            <p>Page Loading Or No Authorization</p>
        );
    }

    return children;
}