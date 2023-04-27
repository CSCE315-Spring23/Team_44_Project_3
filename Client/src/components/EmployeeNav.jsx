import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import logo from "../assets/logo.svg";

export default function EmployeeNav(props) {

    const [isManager, setIsManager] = useState();
    const [current, setCurrent] = useState();


    useEffect(() => {
        const managerBool = localStorage.getItem("isManager") !== "false";
        console.log(localStorage.getItem("isManager"), " ", managerBool);
        setIsManager(managerBool);
        setCurrent(props.current);
    }, []);

    const navigate = useNavigate();
    function logout() {
        localStorage.removeItem("empID");
        localStorage.removeItem("pin");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        localStorage.removeItem("employeeId");
        localStorage.removeItem("isManager");
        navigate("/Login");
    }

    function changePage(page) {
        navigate(`/employee/${page}`);
    }

    // set up google oauth button and behavior
    useEffect(() => {
        if (localStorage.getItem("email") === '') {
            return;
        }

        const script = document.createElement('script');
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        document.body.appendChild(script);

        google.accounts.id.initialize({
            client_id: '494495949926-om1cjij44iie2585is6tk7n98aurqso6.apps.googleusercontent.com',
            // callback: handleGoogleLogin
        });

        google.accounts.id.renderButton(
            document.getElementById('google-signin'),
            {
                theme: 'outline',
                size: 'large'
            }
        );
    });

    console.log("Current page:\t" + current);

    if (isManager) {
        return (
            <nav className="empNav">
                <img src={logo} alt="logo" className="empNavLogo"/>
                <button onClick={e => changePage("order")} className={`empNavButton ${current === "order" ? "current" : ""}`}>Order</button>
                <button onClick={e => changePage("orderHistory")} className={`empNavButton ${current === "history" ? "current" : ""}`}>Order History</button>
                <button onClick={e => changePage("inventory")} className={`empNavButton ${current === "inventory" ? "current" : ""}`}>Inventory</button>
                <button onClick={e => changePage("menu")} className={`empNavButton ${current === "menu" ? "current" : ""}`}>Menu</button>
                <button onClick={e => changePage("reports")} className={`empNavButton ${current === "reports" ? "current" : ""}`}>Reports</button>
                <button onClick={e => changePage("menuBoard")} className={`empNavButton ${current === "menuboard" ? "current" : ""}`}>Menu Board</button>
                <button onClick={logout} className="empNavButton">Logout</button>
                {(localStorage.getItem("email") !== '') ? <div id='google-signin'></div> : null}
            </nav>
        );
    } else {
        return (
            <nav className="empNav">
                <button onClick={e => changePage("order")} className="empNavButton">Order</button>
                <button onClick={e => changePage("orderHistory")} className="empNavButton">Order History</button>
                <button onClick={logout} className="empNavLogout">Logout</button>
                {(localStorage.getItem("email") !== '') ? <div id='google-signin'></div> : null}
            </nav>
        );
    }
}