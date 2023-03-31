import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import { Outlet } from 'react-router-dom';
import CategoryItem from '../../components/CategoryItem';

import sauceImages from '../../utils/sauceImages';

const menu = [
    {title: "Avacado Lime Ranch Dressing", src: sauceImages.avacadoLimeRanchDressing, key: 1},
    {title: "Barbeque Sauce", src: sauceImages.bbqSauce, key: 2},
    {title: "Chick-fil-A Sauce", src: sauceImages.CFASauce, key: 3},
    {title: "Honey Mustard", src: sauceImages.honeyMustard, key: 4},
    {title: "Light Balsamic Vinegar", src: sauceImages.lightBalsamicVin, key: 5},
    {title: "Light Italian Dressing", src: sauceImages.lightItalianDressing, key: 6},
    {title: "Polynesian Sauce", src: sauceImages.polynesian, key: 7},
    {title: "Ranch", src: sauceImages.ranch, key: 8},
    {title: "Ranch Dressing", src: sauceImages.ranchDressing, key: 9},
    {title: "Sweat, Sour, and Siracha Sauce", src: sauceImages.SSSrirachaSauce, key: 10},
    {title: "Zesty Apple Dressing", src: sauceImages.zestyAppleDressing, key: 11},
    {title: "Zesty Buffalo Sauce", src: sauceImages.ZestyBuff, key: 12}
];

const menuList = menu.map(item =>
    <CategoryItem key={item.key} item={item}></CategoryItem>
);

function Sauces() {
    return (
        <>
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