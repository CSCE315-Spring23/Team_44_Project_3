import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {Outlet} from 'react-router-dom';
import AddMenuItem from '../../components/AddMenuItem';
import {useNavigate} from 'react-router-dom';

import mealImages from '../../utils/mealImages';

const menu = [
    {title: "Sandwich Meal", src: mealImages.meal0, key: 0},
    {title: "Deluxe Sandwich Meal", src: mealImages.meal1, key: 1},
    {title: "Spicy Chicken Sandwich Meal", src: mealImages.meal2, key: 2},
    {title: "Spicy Deluxe Chicken Sandwich Meal", src: mealImages.meal3, key: 3},
    {title: "Grilled Chicken Sandwich Meal", src: mealImages.meal4, key: 4},
    {title: "Grilled Chicken Club Meal", src: mealImages.meal5, key: 5},
    {title: "Nuggest Meal", src: mealImages.meal6, key: 6},
    {title: "Grilled Nugget Meal", src: mealImages.meal7, key: 7}
];

const menuList = menu.map(item =>
    <AddMenuItem key={item.key} item={item}></AddMenuItem>
);

function Meals() {

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
                <h1>Meals</h1>
            </header>
            <ul data-cy="MealList" className="menu" role="list">
                {menuList}
            </ul>
            <Outlet />
        </>
    );
}

export default Meals;