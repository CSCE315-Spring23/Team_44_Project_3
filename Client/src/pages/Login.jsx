import React, {useEffect, useState} from 'react';
import logo from '../assets/CFA Banner.svg'

function Login() {
    function authLogin() {
        console.log("WOW");
    }

    return (
        <>
            <header>
                <h1>Welcome to</h1>
                <img src={logo}></img>
            </header>
            <div>
                <label for="username">Username:</label><br />
                <input type="text" id="username" name="username" />
            </div>

            <div>
                <label for="pass">Password:</label><br />
                <input type="password" id="pass" name="password"
                    minlength="4" required />
            </div>

            <input type="submit" value="Sign in" onClick={authLogin}></input>
        </>
    );
}

export default Login;