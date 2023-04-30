/**
 * @module Seasonal
 * @desc The Seasonal page component.
 * @requires React
 * @requires react-router-dom
 * @requires AddMenuItem
 * @requires CustomerNav
 * @requires HOST
 * @requires apiEndpoints
 * @requires logo
 */

import React, {useEffect, useState} from "react";
import {Outlet, useNavigate} from 'react-router-dom';
import AddMenuItem from '../../components/AddMenuItem';
import CustomerNav from '../../components/CustomerNav';
import {HOST} from "../../utils/host";
import {endpoints} from "../../utils/apiEndpoints";
import logo from "../../assets/logo.svg";

/**
 * Seasonal component
 * @returns {JSX.Element} Seasonal page
 */
function Seasonal() {
	// Set initial state for menu
	const [menu, setMenu] = useState([]);

	useEffect(() => {
		// Get menu from API when the component mounts
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
				// Filter data and set menu state with logo when category is null
				for (let i = 0; i < data.length; i++) {
					if (data[i].category === null) {
						data[i].src = logo;
						setMenu(menu => [...menu, data[i]]);
					}
				}
			})
			.catch(error => {
				console.error("Could not fetch menu items from " + url);
			});
	}, []);

	// Get number of items in the cart from localStorage
	let numberOfItems = localStorage.getItem("numItems");
	numberOfItems = numberOfItems ? parseInt(numberOfItems) : 0;

	// Map menu items to AddMenuItem component
	const menuList = menu.map(item =>
		<AddMenuItem key={item.id} item={item}></AddMenuItem>
	);

	// Render the Seasonal page
	return (
		<>
			<CustomerNav numberOfItems={numberOfItems} title={"Seasonal"} navPage={"/customer/order"} />
			<ul data-cy="SeasonalList" className="menu" role="list">
				{menuList}
			</ul>
			<Outlet />
		</>
	);
}

export default Seasonal;
