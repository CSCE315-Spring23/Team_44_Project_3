import React, { useEffect, useState } from 'react';
import EmployeeNav from "../components/EmployeeNav";

import { useNavigate } from 'react-router-dom';
import { endpoints } from "../utils/apiEndpoints";
import { HOST } from "../utils/host";
import logo from '../assets/CFA Banner.svg'

import { Helmet } from "react-helmet";

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

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        document.body.appendChild(script);
    });

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

        for (let i = 0; i < employeeTable.length; i++) {
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

    function handleGoogleLogin(response) {
        console.log('hi!');
        console.log("google login: ", response);
    }

    return (
        // TODO: pass props to other pages
        <>
            <header>
                <h1>Welcome to</h1>
                <img src={logo}></img>
            </header>

            <div className="order-wrapper">
                <a className="order-link" href="/customer/order">Order Now</a>
            </div>

            <div id="g_id_onload"
                data-client_id="494495949926-om1cjij44iie2585is6tk7n98aurqso6.apps.googleusercontent.com"
                data-context="signin"
                data-ux_mode="popup"
                // data-login_uri="/api/login" // ! For Server API
                data-callback= {handleGoogleLogin}
                data-auto_prompt="false">
            </div>

            <div class="g_id_signin"
                data-type="standard"
                data-shape="pill"
                data-theme="outline"
                data-text="signin_with"
                data-size="large"
                data-logo_alignment="left">
            </div>

            <div className="login-wrapper">
                <div className="login-text">
                    {errorMessage && <p>{errorMessage}</p>}
                    {!errorMessage && <p>Employees Only</p>}
                </div>

                <div>
                    <input type="password" id="pass" name="password" className="sign-in-field" placeholder="Enter PIN Number" />
                    <input type="submit" value="Sign In" onClick={authLogin} className="sign-in-button" />
                </div>
            </div>

        </>
    );
}