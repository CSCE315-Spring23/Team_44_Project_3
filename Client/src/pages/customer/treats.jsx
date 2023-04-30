/**
 * Imports React, Outlet, and useNavigate from react-router-dom and other components and utilities.
 */
import React from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import AddMenuItem from '../../components/AddMenuItem';
import CustomerNav from '../../components/CustomerNav';
import treatImages from '../../utils/treatImages';

/**
 * The menu list with an array of menu items containing the item name, image source, key, and id.
 */
const menu = [
	{name: "Chocolate Fudge Brownie", src: treatImages.treat0, key: 0, id: 40},
	{name: "Cookies & Cream Milkshake", src: treatImages.treat1, key: 1, id: 33},
	{name: "Chocolate Milkshake", src: treatImages.treat2, key: 2, id: 34},
	{name: "Chocolate Chunk Cookie", src: treatImages.treat3, key: 3, id: 41},
	{name: "Frosted Coffee", src: treatImages.treat4, key: 4, id: 38},
	{name: "Frosted Lemonade", src: treatImages.treat5, key: 5, id: 37},
	{name: "Icedream® Cone", src: treatImages.treat6, key: 6, id: 39},
	{name: "Strawberry Milkshake", src: treatImages.treat7, key: 7, id: 35},
	{name: "Vanilla Milkshake", src: treatImages.treat8, key: 8, id: 36},
];

/**
 * The list of menu items with an AddMenuItem component for each item.
 */
const menuList = menu.map(item =>
	<AddMenuItem key={item.id} item={item}></AddMenuItem>
);

/**
 * The Treats page that renders the list of menu items and a navigation bar.
 * @returns {JSX.Element} The Treats page with a list of menu items and a navigation bar.
 */
function Treats() {
	let numberOfItems = localStorage.getItem("numItems");
	numberOfItems = numberOfItems ? parseInt(numberOfItems) : 0;

	return (
		<>
			{/* Renders the navigation bar with the number of items and page title */}
			<CustomerNav numberOfItems={numberOfItems} title={"Treats"} navPage={"/customer/order"} />
			{/* Renders the list of menu items */}
			<ul data-cy="TreatsList" className="menu" role="list">
				{menuList}
			</ul>
			{/* Renders any child components of the Treats component */}
			<Outlet />
		</>
	);
}

export default Treats;
