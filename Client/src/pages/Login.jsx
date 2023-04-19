import React, {useEffect, useState} from "react";

<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import { endpoints } from "../utils/apiEndpoints";
import { HOST } from "../utils/host";
import logo from '../assets/CFA Banner.svg'
import backdrop from '../assets/nuggetsmealheader.jpg'
import '../styles/login.css'
=======
import {useNavigate} from "react-router-dom";
import logo from "../assets/CFA Banner.svg";
import {endpoints} from "../utils/apiEndpoints";
import {HOST} from "../utils/host";
>>>>>>> 0f4e411fb36936b63baa0d41655aca6dd8204fe7

import jwt_decode from "jwt-decode";

export default function Login(props) {

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    // ASYNC: checks if user exists, then updates localstorage
    // * @param: { email, pin }, needs either one
    // * @returns: resolves to true if user found and updated localstorage, false otherwise
    async function OAUTH(params) {
        const url = HOST + endpoints.loginAPI;
        const {email = "", pin = ""} = params;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })

        const data = await response.json();

        if (data.isValidUser) {
            localStorage.setItem("employeeId", data.id);
            localStorage.setItem("name", data.name);
            localStorage.setItem("email", email);
            localStorage.setItem("pin", pin);
            localStorage.setItem("isManager", data.isManager);

            return true;
        } else {
            return false;
        }
    }

    function handleGoogleLogin(response) {
        const decodedResponse = jwt_decode(response.credential);
        const email = decodedResponse.email;

        // if oauth successful, log them in
        OAUTH({email})
            .then(isValid => {
                if (isValid) navigate("/employee/order");
                else setErrorMessage("Invalid Google User");
            });
    }

    function handlePINLogin() {
        const employeePin = document.getElementById("pass").value;

        if (!employeePin || employeePin.length < 4)
            return;

        // if pin is valid, log them in
        OAUTH({pin: employeePin})
            .then(isValid => {
                if (isValid) navigate("/employee/order");
                else setErrorMessage("Invalid PIN");
            });
    }

    // set up google oauth button and behavior
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        document.body.appendChild(script);

        google.accounts.id.initialize({
            client_id: "494495949926-om1cjij44iie2585is6tk7n98aurqso6.apps.googleusercontent.com",
            callback: handleGoogleLogin
        });

        google.accounts.id.renderButton(
            document.getElementById("google-signin"),
            {
                theme: "outline",
                size: "large"
            }
        );
    });

    return (
        <>
            <img src={backdrop} alt="backdrop" className='backdrop' />
            <div className="card">
            
                <header>
                    <img src={logo}></img>
                </header>

                <div className="order-wrapper">
                    <a className="order-link" href="/customer/order">Order Now</a>
                </div>

                <div id='google-signin'></div>

                <div className="login-wrapper">
                    <div className="login-text">
                        {errorMessage ? <p>{errorMessage}</p> : <p>Employees Only</p>}
                    </div>

                    <div>
                        <input type="password" id="pass" name="password" className="sign-in-field" placeholder="Enter PIN Number" onKeyDown={(e) => { if (e.key == 'Enter') handlePINLogin(); }} />
                        <input type="submit" value="Sign In" onClick={handlePINLogin} className="sign-in-button" />
                    </div>
                </div>

            </div>

        </>
    );
}