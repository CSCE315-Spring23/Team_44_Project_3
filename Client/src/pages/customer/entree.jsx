import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {Outlet} from 'react-router-dom';
import AddMenuItem from '../../components/AddMenuItem';

import entreeImages from '../../utils/entreeImages';

const menu = [
    {title: "Chicken Sandwich", src: entreeImages.entree0, key: 0},
    {title: "Chicken Sandwich Deluxe", src: entreeImages.entree1, key: 1},
    {title: "Spicy Chicken Sandwich", src: entreeImages.entree2, key: 2},
    {title: "Spicy Chicken Sandwich Deluxe", src: entreeImages.entree3, key: 3},
    {title: "12 ct. Grilled Nuggets", src: entreeImages.entree4, key: 4},
    {title: "8 ct. Grilled Nuggets", src: entreeImages.entree5, key: 5},
    {title: "12 ct. Nuggets", src: entreeImages.entree7, key: 6},
    {title: "8 ct. Nuggets", src: entreeImages.entree6, key: 7},
    {title: "Grilled Chicken Sandwich", src: entreeImages.entree8, key: 8},
    {title: "Grilled Chicken Club", src: entreeImages.entree9, key: 9},
    {title: "Grilled Chicken Cool Wrap", src: entreeImages.entree10, key: 10}
];

const menuList = menu.map(item =>
    <AddMenuItem key={item.key} item={item}></AddMenuItem>
);

function Entree() {
    return (
        <>
            <header>
                <h1>Entrée</h1>
            </header>
            <ul data-cy="EntreeList" className="menu" role="list">
                {menuList}
            </ul>
            <Outlet />
        </>
    );
}

export default Entree;