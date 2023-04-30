/**
 * Represents a page that displays the list of available salads.
 * @function
 * @returns {JSX.Element}
 */
import React from 'react';
import {Outlet} from 'react-router-dom';
import AddMenuItem from '../../components/AddMenuItem';
import CustomerNav from '../../components/CustomerNav';

import saladImages from '../../utils/saladImages';

const menu = [
	{name: "Cobb Salad", src: saladImages.salad0, key: 0, id: 12},
	{name: "Market Salad", src: saladImages.salad1, key: 1, id: 14},
	{name: "Spicy Southwest Salad", src: saladImages.salad2, key: 2, id: 13},
];

const menuList = menu.map(item =>
	<AddMenuItem key={item.id} item={item}></AddMenuItem>
);

/**
 * Renders the Salad component.
 * @function
 * @returns {JSX.Element}
 */
function Salad() {
	let numberOfItems = localStorage.getItem("numItems");
	numberOfItems = numberOfItems ? parseInt(numberOfItems) : 0;

	return (
		<>
			<CustomerNav numberOfItems={numberOfItems} title={"Salads"} navPage={"/customer/order"} />
			<ul data-cy="SaladsList" className="menu" role="list">
				{menuList}
			</ul>
			<Outlet />
		</>
	);
}

export default Salad;
