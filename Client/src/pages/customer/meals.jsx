import React from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import AddMenuItem from '../../components/AddMenuItem';
import CustomerNav from '../../components/CustomerNav';

import mealImages from '../../utils/mealImages';

const menu = [
    {name: "Sandwich Meal", src: mealImages.meal0, key: 0, meal: true, ids: [1, 16, 29]},
    {name: "Deluxe Sandwich Meal", src: mealImages.meal1, key: 1, meal: true, ids: [2, 16, 29]},
    {name: "Spicy Chicken Sandwich Meal", src: mealImages.meal2, key: 2, meal: true, ids: [3, 16, 29]},
    {name: "Spicy Deluxe Chicken Sandwich Meal", src: mealImages.meal3, key: 3, meal: true, ids: [4, 16, 29]},
    {name: "Grilled Chicken Sandwich Meal", src: mealImages.meal4, key: 4, meal: true, ids: [9, 16, 29]},
    {name: "Grilled Chicken Club Meal", src: mealImages.meal5, key: 5, meal: true, ids: [10, 16, 29]},
    {name: "Nuggest Meal", src: mealImages.meal6, key: 6, meal: true, ids: [8, 16, 29]},
    {name: "Grilled Nugget Meal", src: mealImages.meal7, key: 7, meal: true, ids: [6, 16, 29]}
];

const menuList = menu.map(item =>
    <AddMenuItem key={item.id} item={item}></AddMenuItem>
);

function Meals() {
    let numberOfItems = localStorage.getItem("numItems");
    numberOfItems = numberOfItems ? parseInt(numberOfItems) : 0;

    return (
        <>
            <CustomerNav numberOfItems={numberOfItems} title={"Meals"} navPage={"/customer/order"} />
            <ul data-cy="MealList" className="menu" role="list">
                {menuList}
            </ul>
            <Outlet />
        </>
    );
}

export default Meals;