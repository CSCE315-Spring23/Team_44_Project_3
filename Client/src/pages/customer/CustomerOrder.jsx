/**
 * A react component for rendering the customer order page
 * @module CustomerOrder
 */

import React, {useEffect, useState} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import CategoryItem from "../../components/CategoryItem";
import {endpoints} from "../../utils/apiEndpoints";
import {HOST} from "../../utils/host";
import CustomerNav from '../../components/CustomerNav';
import images from "../../utils/imageImport";

/**
 * An array of objects representing different menu categories
 * @constant {Object[]}
 */
const categories = [
	{title: "Meals", src: images.meals, key: 0},
	{title: "Entrées", src: images.entree, key: 1},
	{title: "Beverages", src: images.beverages, key: 2},
	{title: "Salads", src: images.salads, key: 3},
	{title: "Treats", src: images.treats, key: 4},
	{title: "Sauces", src: images.sauces, key: 5},
	{title: "Sides", src: images.sides, key: 6},
];

/**
 * A list of CategoryItem components to be displayed
 * @constant {React.Component[]}
 */
const categoryList = categories.map(item =>
	<CategoryItem key={item.key} item={item}></CategoryItem>
);

/**
 * A react component for rendering the customer order page
 * @returns {JSX.Element} The JSX representation of the component
 */
function CustomerOrder() {
	let numberOfItems = localStorage.getItem("numItems");
	numberOfItems = numberOfItems ? parseInt(numberOfItems) : 0;

	//get menu and update total
	const [orderTotal, setOrderTotal] = useState(0);

	useEffect(() => {
		//get menu
		const url = HOST + endpoints.getMenu;
		fetch(url, {
			method: "GET"
		})
			.then(response => {
				if (!response.ok) {
					throw new Error("Network Response Not OK");
				}
				return response.json();
			})
			.then(data => {
				console.log("data from customerOrder: ", data);
				localStorage.setItem("menu", JSON.stringify(data));
			})
			.catch(error => {
				console.error("Could not fetch menu items from " + url);
			});

		//update total
		const curOrder = JSON.parse(localStorage.getItem("curOrder"));
		if (curOrder && curOrder.total) {
			setOrderTotal(curOrder.total[0]);
		}
	}, []);

	return (
		<>
			<CustomerNav numberOfItems={numberOfItems} title={"Place an Order"} navPage={"/Login"} />
			<ul data-cy="MenuCategoryList" className="menu" role="list">
				{categoryList}
			</ul>

			<Outlet />
		</>
	);
}

export default CustomerOrder;
