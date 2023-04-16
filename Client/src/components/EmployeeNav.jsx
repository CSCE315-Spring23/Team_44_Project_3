import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function EmployeeNav(props) {

    const [isManager, setIsManager] = useState();

    useEffect(() => {
        const managerBool = localStorage.getItem("isManager") !== "false";
        console.log(localStorage.getItem("isManager"), " ", managerBool);
        setIsManager(managerBool);
    }, []);

    const navigate = useNavigate();
    function logout() {
        navigate("/Login");
    }

    function changePage(page) {
        navigate(`/employee/${page}`);
    }

    if (isManager) {
        return (
            <nav className="empNav">
                <button onClick={e => changePage("order")} className="empNavButton">Order</button>
                <button onClick={e => changePage("orderHistory")} className="empNavButton">Order History</button>
                <button onClick={e => changePage("inventory")} className="empNavButton">Inventory</button>
                <button onClick={e => changePage("menu")} className="empNavButton">Menu</button>
                <button onClick={e => changePage("reports")} className="empNavButton">Reports</button>
                <button onClick={e => changePage("menuBoard")} className="empNavButton">Menu Board</button>
                <button onClick={logout} className="empNavLogout">Logout</button>
            </nav >
        );
    }
    else {
        return (
            <nav className="empNav">
                <button onClick={e => changePage("order")} className="empNavButton">Order</button>
                <button onClick={e => changePage("orderHistory")} className="empNavButton">Order History</button>
                <button onClick={logout} className="empNavLogout">Logout</button>
            </nav>
        );
    }
}