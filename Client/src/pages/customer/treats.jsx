import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {Outlet} from 'react-router-dom';
import AddMenuItem from '../../components/AddMenuItem';

import treatImages from '../../utils/treatImages';

const menu = [
    {title: "Chocolate Fudge Brownie", src: treatImages.treat0, key: 0},
    {title: "Cookies & Cream Milkshake", src: treatImages.treat1, key: 1},
    {title: "Chocolate Milkshake", src: treatImages.treat2, key: 2},
    {title: "Chocolate Chunk Cookie", src: treatImages.treat3, key: 3},
    {title: "Frosted Coffee", src: treatImages.treat4, key: 4},
    {title: "Frosted Lemonade", src: treatImages.treat5, key: 5},
    {title: "Icedream® Cone", src: treatImages.treat6, key: 6},
    {title: "Strawberry Milkshake", src: treatImages.treat7, key: 7},
    {title: "Vanilla Milkshake", src: treatImages.treat8, key: 8},
];

const menuList = menu.map(item =>
    <AddMenuItem key={item.key} item={item}></AddMenuItem>
);

function Treats() {
    return (
        <>
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