import React, {useEffect, useState} from 'react';
import EmployeeNav from "../components/EmployeeNav";

import {useNavigate} from 'react-router-dom';
import {endpoints} from "../utils/apiEndpoints";
import {HOST} from "../utils/host";
import logo from '../assets/CFA Banner.svg'

export default function Login(props) {

    const isManager = props.isManager;

    const navigate = useNavigate();
    const [employeeTable, SetEmployeeTable] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetch('/api/employee/getEmployees')
            .then(response => response.json())
            .then(data => SetEmployeeTable(data))
            .catch(error => console.error(error));
    }, [])

    if (!employeeTable) {
        return <div>Loading Employee Table ...</div>
    }

    function authLogin() {
        const employeePin = document.getElementById('pass').value;

        if (!employeePin || employeePin.length < 4) {
            return;
        }

        console.log(employeePin);
        console.log(employeeTable);

        for (let i = 0;i < employeeTable.length;i++) {
            if (employeePin == employeeTable[i].pin) {
                const isManager = employeeTable[i].role === 'manager';
                const empID = String(employeeTable[i].id);
                console.log("login ID ", empID);
                localStorage.setItem('isManager', String(isManager));
                localStorage.setItem('empID', empID);
                navigate('/employee/order');
            } else
                setErrorMessage("Invalid PIN");
        }
    }

    return (
        // TODO: pass props to other pages
        <>
            <header>
                <h1>Welcome to</h1>
                <img src={logo}></img>
            </header>

            <div className="login-wrapper">
                {errorMessage && <p>{errorMessage}</p>}
                <input type="password" id="pass" name="password" className="sign-in-field" placeholder="Enter PIN Number"/>
                <input type="submit" value="Sign In" onClick={authLogin} className="sign-in-button"/>
            </div>

            <a className="order-link" href="/customer/order">Order Now</a>
        </>
    );
}