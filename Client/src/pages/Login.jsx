import React, { useEffect, useState } from 'react';
import EmployeeNav from "../components/EmployeeNav";

import { useNavigate } from 'react-router-dom';
import { endpoints } from "../utils/apiEndpoints";
import { HOST } from "../utils/host";
import logo from '../assets/CFA Banner.svg'

import jwt_decode from "jwt-decode";

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

    // ASYNC: checks if user exists, then updates localstorage
    // * @param: { email, pin }, needs either one
    // * @returns: resolves to true if user found and updated localstorage, false otherwise
    async function OAUTH(params) {
        const url = HOST + endpoints.loginAPI;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
        
        const data = await response.json();

        if (data.isValidUser) {
            localStorage.setItem('name', data.name);
            localStorage.setItem('email', email);
            localStorage.setItem('pin', pin);
            localStorage.setItem('isManager', data.isManager);

            return true;
        } else {
            return false;
        }
    }

    function handleGoogleLogin(response) {
        const decodedResponse = jwt_decode(response.credential);
        
        const name = decodedResponse.name;
        const email = decodedResponse.email;
        
        //login handshake with backend
        const url = HOST + endpoints.loginAPI;
        
        OAUTH({ email })
            .then(isValid => {
                if (isValid) navigate('/employee/order');
                else setErrorMessage("Invalid Google User");
            });
    }

    function handlePINLogin() {
        const employeePin = document.getElementById('pass').value;

        if (!employeePin || employeePin.length < 4)
            return;

        OAUTH({ pin: employeePin })
            .then(isValid => {
                if (isValid) navigate('/employee/order');
                else setErrorMessage("Invalid Google User");
            });
    }

    // set up google oauth button and behavior
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        document.body.appendChild(script);

        google.accounts.id.initialize({
            client_id: '494495949926-om1cjij44iie2585is6tk7n98aurqso6.apps.googleusercontent.com',
            callback: handleGoogleLogin
        });

        google.accounts.id.renderButton(
            document.getElementById('google-signin'),
            {
                theme: 'outline',
                size: 'large'
            }
        );
    });

    if (!employeeTable) {
        return <div>Loading Employee Table ...</div>
    }

    return (
        <>
            <header>
                <h1>Welcome to</h1>
                <img src={logo}></img>
            </header>

            <div className="order-wrapper">
                <a className="order-link" href="/customer/order">Order Now</a>
            </div>

            <div id='google-signin'></div>

            <div className="login-wrapper">
                <div className="login-text">
                    {errorMessage && <p>{errorMessage}</p>}
                    {!errorMessage && <p>Employees Only</p>}
                </div>

                <div>
                    <input type="password" id="pass" name="password" className="sign-in-field" placeholder="Enter PIN Number" />
                    <input type="submit" value="Sign In" onClick={handlePINLogin} className="sign-in-button" />
                </div>
            </div>
        </>
    );
}