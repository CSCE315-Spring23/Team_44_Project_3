import React from 'react';
import { Link } from 'react-router-dom';

export default function EmployeeNav(){
    return(
        <nav className='empNav'>
            <Link className='empNavButton'>Order</Link>
        </nav>
    );
}