import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {Outlet} from 'react-router-dom';
import AddMenuItem from '../../components/AddMenuItem';
import {useNavigate} from 'react-router-dom';

import sauceImages from '../../utils/sauceImages';

const menu = [
    {title: "Avacado Lime Ranch Dressing", src: sauceImages.avacadoLimeRanchDressing, key: 0},
    {title: "Barbeque Sauce", src: sauceImages.bbqSauce, key: 1},
    {title: "Chick-fil-A Sauce", src: sauceImages.CFASauce, key: 2},
    {title: "Honey Mustard", src: sauceImages.honeyMustard, key: 3},
    {title: "Light Balsamic Vinegar", src: sauceImages.lightBalsamicVin, key: 4},
    {title: "Light Italian Dressing", src: sauceImages.lightItalianDressing, key: 5},
    {title: "Polynesian Sauce", src: sauceImages.polynesian, key: 6},
    {title: "Ranch", src: sauceImages.ranch, key: 7},
    {title: "Ranch Dressing", src: sauceImages.ranchDressing, key: 8},
    {title: "Sweat and Spicy Siracha Sauce", src: sauceImages.SSSrirachaSauce, key: 9},
    {title: "Zesty Apple Dressing", src: sauceImages.zestyAppleDressing, key: 10},
    {title: "Zesty Buffalo Sauce", src: sauceImages.ZestyBuff, key: 11}
];

const menuList = menu.map(item =>
    <AddMenuItem key={item.key} item={item}></AddMenuItem>
);

function Sauces() {

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
                <h1>Sauces</h1>
            </header>
            <ul data-cy="SauceList" className="menu" role="list">
                {menuList}
            </ul>
            <Outlet />
        </>
    );
}

export default Sauces;