/**
 * Represents a list of Entree menu items.
 * @function
 * @returns {JSX.Element}
 */
import React from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import AddMenuItem from '../../components/AddMenuItem';
import CustomerNav from '../../components/CustomerNav';

import entreeImages from '../../utils/entreeImages';

/**
 * Array containing the Entree menu items.
 * @type {Array.<{name: string, src: string, key: number, id: number}>}
 */
const menu = [
    {name: "Chicken Sandwich", src: entreeImages.entree0, key: 0, id: 1},
    {name: "Chicken Sandwich Deluxe", src: entreeImages.entree1, key: 1, id: 2},
    {name: "Spicy Chicken Sandwich", src: entreeImages.entree2, key: 2, id: 3},
    {name: "Spicy Chicken Sandwich Deluxe", src: entreeImages.entree3, key: 3, id: 4},
    {name: "12 ct. Grilled Nuggets", src: entreeImages.entree4, key: 4, id: 5},
    {name: "8 ct. Grilled Nuggets", src: entreeImages.entree5, key: 5, id: 6},
    {name: "12 ct. Nuggets", src: entreeImages.entree7, key: 6, id: 7},
    {name: "8 ct. Nuggets", src: entreeImages.entree6, key: 7, id: 8},
    {name: "Grilled Chicken Sandwich", src: entreeImages.entree8, key: 8, id: 9},
    {name: "Grilled Chicken Club", src: entreeImages.entree9, key: 9, id: 10},
    {name: "Grilled Chicken Cool Wrap", src: entreeImages.entree10, key: 10, id: 11}
];

/**
 * Array containing the menu items components.
 * @type {Array.<JSX.Element>}
 */
const menuList = menu.map(item =>
    <AddMenuItem key={item.id} item={item}></AddMenuItem>
);

/**
 * The Entree component.
 * @function
 * @returns {JSX.Element}
 */
function Entree() {
    /**
     * Retrieves the number of items stored in local storage.
     * @type {number}
     */
    let numberOfItems = localStorage.getItem("numItems");
    numberOfItems = numberOfItems ? parseInt(numberOfItems) : 0;

    /**
     * Renders the Entree component.
     * @returns {JSX.Element}
     */
    return (
        <>
            <CustomerNav numberOfItems={numberOfItems} title={"Entreé"} navPage={"/customer/order"} />
            <ul data-cy="EntreeList" className="menu" role="list">
                {menuList}
            </ul>
            <Outlet />
        </>
    );
}

export default Entree;
