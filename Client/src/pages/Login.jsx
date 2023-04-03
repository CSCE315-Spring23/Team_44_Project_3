import React, {useEffect, useState} from 'react';
import chickFilA from '../assets/chickFilA.png';
import '../styles/login.css';

function Login() {

    const handleLoginButtonClick = (event) => {

    }

    return(
        <div>
            <img className='logo' src={chickFilA} />
            <div>
                <button className='orderButton'>Order</button>
                <button className='employeeButton'>Employee Login</button>
            </div>
        </div>
    );
}

export default Login;