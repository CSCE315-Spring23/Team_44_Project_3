import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {Outlet} from 'react-router-dom';
import AddMenuItem from '../../components/AddMenuItem';

import saladImages from '../../utils/saladImages';

const menu = [
    {title: "Cobb Salad", src: saladImages.salad0, key: 0},
    {title: "Market Salad", src: saladImages.salad1, key: 1},
    {title: "Spicy Southwest Salad", src: saladImages.salad2, key: 2},
];

const menuList = menu.map(item =>
    <AddMenuItem key={item.key} item={item}></AddMenuItem>
);

function Salad() {
    return (
        <>
            <header>
                <h1>Salads</h1>
            </header>
            <ul data-cy="SaladsList" className="menu" role="list">
                {menuList}
            </ul>
            <Outlet />
        </>
    );
}

export default Salad;