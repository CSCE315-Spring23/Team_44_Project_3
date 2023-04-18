import React from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import AddMenuItem from '../../components/AddMenuItem';

import beveragesImages from '../../utils/beverageImages';

const menu = [
    {name: "Bottled Watter", src: beveragesImages.beverage0, key: 0, id: 20},
    {name: "M. Unsweetened Iced Tea", src: beveragesImages.beverage1, key: 1, id: 21},
    {name: "L. Unsweetened Iced Tea", src: beveragesImages.beverage2, key: 2, id: 22},
    {name: "M. Sweet Iced Tea", src: beveragesImages.beverage3, key: 3, id: 23},
    {name: "L. Sweet Iced Tea", src: beveragesImages.beverage4, key: 4, id: 24},
    {name: "M. Lemonade", src: beveragesImages.beverage5, key: 5, id: 25},
    {name: "L. Lemonade", src: beveragesImages.beverage6, key: 6, id: 26},
    {name: "M. Sunjoy", src: beveragesImages.beverage7, key: 7, id: 27},
    {name: "L. Sunjoy", src: beveragesImages.beverage8, key: 8, id: 28},
    {name: "M. Soft Drink", src: beveragesImages.beverage9, key: 9, id: 29},
    {name: "L. Soft Drink", src: beveragesImages.beverage10, key: 10, id: 30},
    {name: "Original Cold Brew Iced Coffee", src: beveragesImages.beverage11, key: 11, id: 31},
    {name: "Vanilla Cold Brew Iced Coffee", src: beveragesImages.beverage12, key: 12, id: 32},
];

const menuList = menu.map(item =>
    <AddMenuItem key={item.id} item={item}></AddMenuItem>
);

function Beverages() {

	const numberOfItems = parseInt(localStorage.getItem('numItems'), 10);

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
                            <span className="itemCount">{numberOfItems}</span>
                            <svg width="30" height="31" viewBox="0 0 30 31" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="sc-NfXLL kkFxpj">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M21.065 28.216l2.717-25.681h.713l2.428 25.68h-5.858zM5.227 2.535h3.085c.162 1.01.612 1.94 1.3 2.649.898.925 2.125 1.413 3.546 1.413 1.42 0 2.644-.488 3.542-1.412.69-.709 1.14-1.638 1.304-2.65h3.507l-2.718 25.68H3.144l2.083-25.68zM26.65 1.333a1.12 1.12 0 00-1.126-1h-8.59c-.31 0-.607.125-.82.345a1.083 1.083 0 00-.308.816c.046.835-.233 1.648-.748 2.177-.467.482-1.107.725-1.9.725-.797 0-1.437-.244-1.905-.725-.513-.529-.791-1.342-.744-2.176a1.086 1.086 0 00-.307-.817 1.146 1.146 0 00-.821-.345h-5.2c-.59 0-1.08.442-1.127 1.015L.795 29.23c-.024.306.083.608.297.834.214.224.515.353.83.353h26.24c.318 0 .62-.13.835-.359.213-.229.319-.535.29-.843L26.651 1.333z">
                                </path>
                            </svg>
                        </div>
                        My Order
                    </button>
                </div>
            </nav>
            <ul data-cy="BeverageList" className="menu" role="list">
                {menuList}
            </ul>
            <Outlet />
        </>
    );
}

export default Beverages;