/**
 * Represents a menu item in the Beverages page.
 * @typedef {Object} MenuItem
 * @property {string} name - The name of the item.
 * @property {string} src - The source of the item image.
 * @property {number} key - The unique key of the item.
 * @property {number} id - The unique identifier of the item.
 */

/**
 * Represents the Beverages page component.
 * @function
 * @returns {JSX.Element} - The Beverages page UI.
 */
import React from 'react';
import {Outlet} from 'react-router-dom';
import AddMenuItem from '../../components/AddMenuItem';
import CustomerNav from '../../components/CustomerNav';
import beveragesImages from '../../utils/beverageImages';

/**
 * An array of menu items.
 * @type {Array.<MenuItem>}
 */
const menu = [
	{name: "Bottled Watter", src: beveragesImages.beverage0, key: 0, id: 20},
	{name: "M. Unsweetened Iced Tea", src: beveragesImages.beverage1, key: 1, id: 21},
	{name: "L. Unsweetened Iced Tea", src: beveragesImages.beverage2, key: 2, id: 22},
	{name: "M. Sweet Iced Tea", src: beveragesImages.beverage3, key: 3, id: 23},
	{name: "L. Sweet Iced Tea", src: beveragesImages.beverage4, key: 4, id: 24},
	{name: "M. Lemonade", src: beveragesImages.beverage5, key: 5, id: 25},
	{name: "L. Lemonade", src: beveragesImages.beverage6, key: 6, id: 26},
	{name: "M. Sunjoy", src: beveragesImages.beverage7, key: 7, id: 27},
	{name: "L. Sunjoy", src: beveragesImages.beverage8, key: 8, id: 28},
	{name: "M. Soft Drink", src: beveragesImages.beverage9, key: 9, id: 29},
	{name: "L. Soft Drink", src: beveragesImages.beverage10, key: 10, id: 30},
	{name: "Original Cold Brew Iced Coffee", src: beveragesImages.beverage11, key: 11, id: 31},
	{name: "Vanilla Cold Brew Iced Coffee", src: beveragesImages.beverage12, key: 12, id: 32},
];

/**
 * An array of menu items with their corresponding `AddMenuItem` component.
 * @type {Array.<JSX.Element>}
 */
const menuList = menu.map(item =>
	<AddMenuItem key={item.id} item={item}></AddMenuItem>
);

/**
 * The Beverages page component.
 * @returns {JSX.Element} - The Beverages page UI.
 */
function Beverages() {
	let numberOfItems = localStorage.getItem("numItems");
	numberOfItems = numberOfItems ? parseInt(numberOfItems) : 0;

	return (
		<>
			<CustomerNav numberOfItems={numberOfItems} title={"Beverages"} navPage={"/customer/order"} />
			<ul data-cy="BeverageList" className="menu" role="list">
				{menuList}
			</ul>
			<Outlet />
		</>
	);
}

export default Beverages;