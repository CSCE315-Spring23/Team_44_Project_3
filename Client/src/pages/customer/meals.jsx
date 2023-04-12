import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {Outlet} from 'react-router-dom';
import AddMenuItem from '../../components/AddMenuItem';
import {useNavigate} from 'react-router-dom';

import mealImages from '../../utils/mealImages';

const menu = [
    {title: "Sandwich Meal", src: mealImages.meal0, key: 0, meal: true, ids: [1, 16, 29]},
    {title: "Deluxe Sandwich Meal", src: mealImages.meal1, key: 1, meal: true, ids: [2, 16, 29]},
    {title: "Spicy Chicken Sandwich Meal", src: mealImages.meal2, key: 2, meal: true, ids: [3, 16, 29]},
    {title: "Spicy Deluxe Chicken Sandwich Meal", src: mealImages.meal3, key: 3, meal: true, ids: [4, 16, 29]},
    {title: "Grilled Chicken Sandwich Meal", src: mealImages.meal4, key: 4, meal: true, ids: [9, 16, 29]},
    {title: "Grilled Chicken Club Meal", src: mealImages.meal5, key: 5, meal: true, ids: [10, 16, 29]},
    {title: "Nuggest Meal", src: mealImages.meal6, key: 6, meal: true, ids: [8, 16, 29]},
    {title: "Grilled Nugget Meal", src: mealImages.meal7, key: 7, meal: true, ids: [6, 16, 29]}
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