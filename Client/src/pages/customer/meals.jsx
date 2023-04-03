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
            <button onClick={navigateOrderPage}>Go Back</button>
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