import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

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
        navigate("/Login");
    }

    function changePage(page) {
        navigate(`/employee/${page}`);
    }

    console.log("Current page:\t" + current);

    if (isManager) {
        return (
            <nav className="empNav">
                <button onClick={e => changePage("order")} className={`empNavButton ${current === "order" ? "current" : ""}`}>Order</button>
                <button onClick={e => changePage("orderHistory")} className={`empNavButton ${current === "history" ? "current" : ""}`}>Order History</button>
                <button onClick={e => changePage("inventory")} className={`empNavButton ${current === "inventory" ? "current" : ""}`}>Inventory</button>
                <button onClick={e => changePage("menu")} className={`empNavButton ${current === "menu" ? "current" : ""}`}>Menu</button>
                <button onClick={e => changePage("reports")} className={`empNavButton ${current === "reports" ? "current" : ""}`}>Reports</button>
                <button onClick={e => changePage("menuBoard")} className={`empNavButton ${current === "menuboard" ? "current" : ""}`}>Menu Board</button>
                <button onClick={logout} className="empNavLogout">Logout</button>
            </nav >
        );
    } else {
        return (
            <nav className="empNav">
                <button onClick={e => changePage("order")} className="empNavButton">Order</button>
                <button onClick={e => changePage("orderHistory")} className="empNavButton">Order History</button>
                <button onClick={logout} className="empNavLogout">Logout</button>
            </nav>
        );
    }
}