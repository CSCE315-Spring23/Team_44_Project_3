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
            <button onClick={navigateOrderPage}>Go Back</button>
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