import React from 'react';
import { Link } from 'react-router-dom';

export default function av(props) {

    const isManager = props.isManager;
    if (isManager) {
        return (
            <nav className='empNav'>
                <Link className='empNavButton' to='/employee/order'>Order</Link>
                <Link className='empNavButton' to='/employee/orderHistory'>Order History</Link>
                <Link className='empNavButton' to='/employee/inventory'>Inventory</Link>
                <Link className='empNavButton' to='/employee/menu'>Menu</Link>
                <Link className='empNavButton'>Reports</Link>
                <Link className='empNavButton'>Menu Board</Link>
            </nav>
        );
    }
    else{
        return (
            <nav className='empNav'>
                <Link className='empNavButton' to='/employee/order'>Order</Link>
                <Link className='empNavButton' to='/employee/orderHistory'>Order History</Link>
            </nav>
        );
    }
}