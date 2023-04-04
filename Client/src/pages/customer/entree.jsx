import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {Outlet} from 'react-router-dom';
import AddMenuItem from '../../components/AddMenuItem';
import {useNavigate} from 'react-router-dom';

import entreeImages from '../../utils/entreeImages';

const menu = [
    {title: "Chicken Sandwich", src: entreeImages.entree0, key: 0, id: 1},
    {title: "Chicken Sandwich Deluxe", src: entreeImages.entree1, key: 1, id: 2},
    {title: "Spicy Chicken Sandwich", src: entreeImages.entree2, key: 2, id: 3},
    {title: "Spicy Chicken Sandwich Deluxe", src: entreeImages.entree3, key: 3, id: 4},
    {title: "12 ct. Grilled Nuggets", src: entreeImages.entree4, key: 4, id: 5},
    {title: "8 ct. Grilled Nuggets", src: entreeImages.entree5, key: 5, id: 6},
    {title: "12 ct. Nuggets", src: entreeImages.entree7, key: 6, id: 7},
    {title: "8 ct. Nuggets", src: entreeImages.entree6, key: 7, id: 8},
    {title: "Grilled Chicken Sandwich", src: entreeImages.entree8, key: 8, id: 9},
    {title: "Grilled Chicken Club", src: entreeImages.entree9, key: 9, id: 10},
    {title: "Grilled Chicken Cool Wrap", src: entreeImages.entree10, key: 10, id: 11}
];

const menuList = menu.map(item =>
    <AddMenuItem key={item.key} item={item}></AddMenuItem>
);

function Entree() {

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