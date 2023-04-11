import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function EmployeeNav(props) {

    const [isManager, setIsManager] = useState();

    useEffect(() => {
        const managerBool = localStorage.getItem('isManager') !== 'false';
        console.log(localStorage.getItem('isManager'), " ", managerBool);
        setIsManager(managerBool);
    },[]);

    const navigate = useNavigate();
    const handleLogout = () => {

        navigate('/Login');
    }

    if (isManager) {
        return (
            <nav className='empNav'>
                <Link className='empNavButton' to='/employee/order'>Order</Link>
                <Link className='empNavButton' to='/employee/orderHistory'>Order History</Link>
                <Link className='empNavButton' to='/employee/inventory'>Inventory</Link>
                <Link className='empNavButton' to='/employee/menu'>Menu</Link>
                <Link className='empNavButton' to='/employee/reports'>Reports</Link>
                <Link className='empNavButton' to='/employee/menuBoard'>Menu Board</Link>
                <button onClick={e => handleLogout()} className='empNavLogout'>Logout</button>
            </nav>
        );
    }
    else{
        return (
            <nav className='empNav'>
                <Link className='empNavButton' to='/employee/order'>Order</Link>
                <Link className='empNavButton' to='/employee/orderHistory'>Order History</Link>
                <button onClick={e => handleLogout()} className='empNavLogout'>Logout</button>
            </nav>
        );
    }
}