import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {Outlet} from 'react-router-dom';
import AddMenuItem from '../../components/AddMenuItem';
import {useNavigate} from 'react-router-dom';

import beveragesImages from '../../utils/beverageImages';

const menu = [
    {title: "Bottled Watter", src: beveragesImages.beverage0, key: 0, id: 20},
    {title: "M. Unsweetened Iced Tea", src: beveragesImages.beverage1, key: 1, id: 21},
    {title: "L. Unsweetened Iced Tea", src: beveragesImages.beverage2, key: 2, id: 22},
    {title: "M. Sweet Iced Tea", src: beveragesImages.beverage3, key: 3, id: 23},
    {title: "L. Sweet Iced Tea", src: beveragesImages.beverage4, key: 4, id: 24},
    {title: "M. Lemonade", src: beveragesImages.beverage5, key: 5, id: 25},
    {title: "L. Lemonade", src: beveragesImages.beverage6, key: 6, id: 26},
    {title: "M. Sunjoy", src: beveragesImages.beverage7, key: 7, id: 27},
    {title: "L. Sunjoy", src: beveragesImages.beverage8, key: 8, id: 28},
    {title: "M. Soft Drink", src: beveragesImages.beverage9, key: 9, id: 29},
    {title: "L. Soft Drink", src: beveragesImages.beverage10, key: 10, id: 30},
    {title: "Original Cold Brew Iced Coffee", src: beveragesImages.beverage11, key: 11, id: 31},
    {title: "Vanilla Cold Brew Iced Coffee", src: beveragesImages.beverage12, key: 12, id: 32},
];

const menuList = menu.map(item =>
    <AddMenuItem key={item.key} item={item}></AddMenuItem>
);

function Beverages() {

    const navigate = useNavigate();

    function navigateOrderPage() {
        navigate('/customer/order')
    }

    return (
        <>
            <header>
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

                <h1>Beverages</h1>
            </header>
            <ul data-cy="BeverageList" className="menu" role="list">
                {menuList}
            </ul>
            <Outlet />
        </>
    );
}

export default Beverages;