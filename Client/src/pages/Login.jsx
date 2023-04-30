import React, {useEffect, useState} from "react";

import {useNavigate} from 'react-router-dom';
import {endpoints} from "../utils/apiEndpoints";
import {HOST} from "../utils/host";
import logo from '../assets/CFA Banner.svg';
import backdrop from '../assets/nuggetsmealheader.jpg';
import '../styles/login.scss';

import jwt_decode from "jwt-decode";

/**
 * Handles OAuth login.
 * @function
 * @async
 * @param {Object} params - Login parameters.
 * @param {string} params.email - Email address.
 * @param {string} params.pin - PIN number.
 * @returns {Promise<boolean>} - Promise that resolves to `true` if user is valid, `false` otherwise.
 */
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
	});

	const data = await response.json();
	if (data.isValidUser) {
		localStorage.setItem("employeeId", data.id);
		localStorage.setItem("name", data.name);
		localStorage.setItem("email", email);
		localStorage.setItem("pin", pin);
		localStorage.setItem("isManager", data.isManager);

		return true;
	} else
		return false;
}

/**
 * React functional component for employee login page.
 * @function
 * @param {Object} props - React props.
 * @returns {JSX.Element} - Rendered component.
 */
function Login(props) {
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState("");

	/**
	 * Handles Google OAuth login.
	 * @function
	 * @param {Object} response - Login response.
	 * @param {string} response.credential - Login credential.
	 */
	function handleGoogleLogin(response) {
		const decodedResponse = jwt_decode(response.credential);
		const email = decodedResponse.email;

		OAUTH({email})
			.then(isValid => {
				if (isValid) navigate("/employee/order");
				else setErrorMessage("Invalid Google User");
			});
	}

	/**
	 * Handles PIN login.
	 * @function
	 */
	function handlePINLogin() {
		const employeePin = document.getElementById("pass").value;

		if (!employeePin || employeePin.length < 4)
			return;

		OAUTH({pin: employeePin})
			.then(isValid => {
				if (isValid) navigate("/employee/order");
				else setErrorMessage("Invalid PIN");
			});
	}

	/**
	 * Adds Google OAuth script and initializes login button.
	 * @function
	 * @name useEffect
	 * @memberof Login
	 */
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

	/**
	 * Navigates to the customer order page.
	 */
	function navigatePage() {
		localStorage.removeItem("curOrder");
		localStorage.removeItem("numItems");
		navigate("/customer/order");
	}

	return (
		<>
			<img src={backdrop} alt="backdrop" className='backdrop' />
			<div className="card">
				<header>
					<img src={logo}></img>
				</header>

				<div className="order-wrapper">
					<a className="order-link" onClick={navigatePage}>Order Now</a>
				</div>

				<div className="login-wrapper">
					<div className="login-text">
						{errorMessage ? <p>{errorMessage}</p> : <p>Employees Only</p>}
					</div>

					<div id="google-signin"></div>

					<div>
						<input type="password" id="pass" name="password" className="sign-in-field" placeholder="Enter PIN Number" onKeyDown={(e) => {if (e.key == 'Enter') handlePINLogin();}} />
						<input type="submit" value="Sign In" onClick={handlePINLogin} className="sign-in-button" />
					</div>
				</div>

			</div>
		</>
	);
}

export default Login;
