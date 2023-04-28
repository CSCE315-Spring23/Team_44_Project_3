/**
 * A react component that displays the Sides menu and allows the customer to add items to their order.
 * @function
 * @returns {JSX.Element}
 */
import React from 'react';
import {Outlet} from 'react-router-dom';
import AddMenuItem from '../../components/AddMenuItem';
import CustomerNav from '../../components/CustomerNav';

import sidesImages from '../../utils/sidesImages';

// The menu items
const menu = [
    {name: "L. Waffle Fries", src: sidesImages.side1, key: 0, id: 15},
    {name: "M. Waffle Fries", src: sidesImages.side1, key: 1, id: 15},
    {name: "Chips", src: sidesImages.side0, key: 2, id: 17},
    {name: "Fruit Cup", src: sidesImages.side1, key: 3, id: 18},
    {name: "Side Salad", src: sidesImages.side2, key: 4, id: 19},
];

// Create a list of menu items JSX elements
const menuList = menu.map(item =>
    <AddMenuItem key={item.id} item={item}></AddMenuItem>
);

/**
 * The Sides component.
 * @function
 * @returns {JSX.Element}
 */
function Sides() {
    // Get the number of items in the customer's order from local storage
    let numberOfItems = localStorage.getItem("numItems");
    numberOfItems = numberOfItems ? parseInt(numberOfItems) : 0;

    // Render the customer navigation bar, the sides menu, and the router outlet
    return (
        <>
            <CustomerNav numberOfItems={numberOfItems} title={"Sides"} navPage={"/customer/order"} />
            <ul data-cy="BeverageList" className="menu" role="list">
                {menuList}
            </ul>
            <Outlet />
        </>
    );
}

export default Sides;
