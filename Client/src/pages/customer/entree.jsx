import React from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import AddMenuItem from '../../components/AddMenuItem';

import entreeImages from '../../utils/entreeImages';

const menu = [
    {name: "Chicken Sandwich", src: entreeImages.entree0, key: 0, id: 1},
    {name: "Chicken Sandwich Deluxe", src: entreeImages.entree1, key: 1, id: 2},
    {name: "Spicy Chicken Sandwich", src: entreeImages.entree2, key: 2, id: 3},
    {name: "Spicy Chicken Sandwich Deluxe", src: entreeImages.entree3, key: 3, id: 4},
    {name: "12 ct. Grilled Nuggets", src: entreeImages.entree4, key: 4, id: 5},
    {name: "8 ct. Grilled Nuggets", src: entreeImages.entree5, key: 5, id: 6},
    {name: "12 ct. Nuggets", src: entreeImages.entree7, key: 6, id: 7},
    {name: "8 ct. Nuggets", src: entreeImages.entree6, key: 7, id: 8},
    {name: "Grilled Chicken Sandwich", src: entreeImages.entree8, key: 8, id: 9},
    {name: "Grilled Chicken Club", src: entreeImages.entree9, key: 9, id: 10},
    {name: "Grilled Chicken Cool Wrap", src: entreeImages.entree10, key: 10, id: 11}
];

const menuList = menu.map(item =>
    <AddMenuItem key={item.id} item={item}></AddMenuItem>
);

function Entree() {

    const navigate = useNavigate();

    function navigateOrderPage() {
        navigate('/customer/order')
    }

    return (
        <>
            <nav className="desktop-navigation">
                <div className="backDiv">
                    <button title="Back to menu category list" data-cy="SubNavBack" className="backButton" onClick={navigateOrderPage}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.09 22L5 12l9.09-10" stroke="#DD0031" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                            </path>
                        </svg>
                        <div aria-hidden="true" className="backText">
                            Back
                        </div>
                    </button>
                </div>

                <div className="title">Beverages</div>

                <div className="order">
                    <button className="viewOrderBtn">
                        <div className="bagIcon">
                            <span className="itemCount">0</span>
                            <svg width="30" height="31" viewBox="0 0 30 31" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="sc-NfXLL kkFxpj">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.065 28.216l2.717-25.681h.713l2.428 25.68h-5.858zM5.227 2.535h3.085c.162 1.01.612 1.94 1.3 2.649.898.925 2.125 1.413 3.546 1.413 1.42 0 2.644-.488 3.542-1.412.69-.709 1.14-1.638 1.304-2.65h3.507l-2.718 25.68H3.144l2.083-25.68zM26.65 1.333a1.12 1.12 0 00-1.126-1h-8.59c-.31 0-.607.125-.82.345a1.083 1.083 0 00-.308.816c.046.835-.233 1.648-.748 2.177-.467.482-1.107.725-1.9.725-.797 0-1.437-.244-1.905-.725-.513-.529-.791-1.342-.744-2.176a1.086 1.086 0 00-.307-.817 1.146 1.146 0 00-.821-.345h-5.2c-.59 0-1.08.442-1.127 1.015L.795 29.23c-.024.306.083.608.297.834.214.224.515.353.83.353h26.24c.318 0 .62-.13.835-.359.213-.229.319-.535.29-.843L26.651 1.333z">
                                </path>
                            </svg>
                        </div>
                        My Order
                    </button>
                </div>
            </nav>
            <ul data-cy="EntreeList" className="menu" role="list">
                {menuList}
            </ul>
            <Outlet />
        </>
    );
}

export default Entree;