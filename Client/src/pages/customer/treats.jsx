import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {Outlet} from 'react-router-dom';
import AddMenuItem from '../../components/AddMenuItem';
import {useNavigate} from 'react-router-dom';

import treatImages from '../../utils/treatImages';

const menu = [
    {title: "Chocolate Fudge Brownie", src: treatImages.treat0, key: 0, id: 40},
    {title: "Cookies & Cream Milkshake", src: treatImages.treat1, key: 1, id: 33},
    {title: "Chocolate Milkshake", src: treatImages.treat2, key: 2, id: 34},
    {title: "Chocolate Chunk Cookie", src: treatImages.treat3, key: 3, id: 41},
    {title: "Frosted Coffee", src: treatImages.treat4, key: 4, id: 38},
    {title: "Frosted Lemonade", src: treatImages.treat5, key: 5, id: 37},
    {title: "Icedream® Cone", src: treatImages.treat6, key: 6, id: 39},
    {title: "Strawberry Milkshake", src: treatImages.treat7, key: 7, id: 35},
    {title: "Vanilla Milkshake", src: treatImages.treat8, key: 8, id: 36},
];

const menuList = menu.map(item =>
    <AddMenuItem key={item.key} item={item}></AddMenuItem>
);

function Treats() {

    const navigate = useNavigate();

    function navigateOrderPage() {
        navigate('/customer/order')
    }

    return (
        <>
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
            <header>
                <h1>Treats</h1>
            </header>
            <ul data-cy="TreatsList" className="menu" role="list">
                {menuList}
            </ul>
            <Outlet />
        </>
    );
}

export default Treats;