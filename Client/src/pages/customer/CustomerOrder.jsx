import CategoryItem from '../../components/CategoryItem';
import React, {useEffect, useState} from 'react';
import {Outlet} from 'react-router-dom';
import {HOST} from '../../utils/host';
import {endpoints} from '../../utils/apiEndpoints';
import Weather from '../../components/Weather';

import images from '../../utils/imageImport';

const categories = [
	{title: "Meals", src: images.meals, key: 0},
	{title: "Entrées", src: images.entree, key: 1},
	{title: "Beverages", src: images.beverages, key: 2},
	{title: "Salads", src: images.salads, key: 3},
	{title: "Treats", src: images.treats, key: 4},
	{title: "Sauces", src: images.sauces, key: 5}
];


// create list of category elements to be ordered
const categoryList = categories.map(item =>
	<CategoryItem key={item.key} item={item}></CategoryItem>
);


function CustomerOrder() {
	const handleCheckout = () => {
		console.log("checkout");
		const orderLocal = JSON.parse(localStorage.getItem('curOrder'));
		const order = {
			customerName: "custName",
			totalCost: orderLocal.total[0],
			employeeID: 0,
			items: orderLocal.items
		};

		const url = HOST + endpoints.postOrder;

		console.log(order);
		if (order.items === undefined || order.items.length === 0) {
			alert("Please add items to your order before checking out.");
			return;
		}
		fetch(url, {
			method: "POST",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(order)
		})
			.then(response => {
				return response.text();
			})
			.then(data => {
				console.log(data);
			});
		const defaultOrder = {total: [0], items: []};
		localStorage.setItem('curOrder', JSON.stringify(defaultOrder));
		setOrderTotal(0);

	}
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
				localStorage.setItem('menu', JSON.stringify(data));
			})
			.catch(error => {
				console.error("Could not fetch menu items from " + url);
			});

		//update total
		const curOrder = JSON.parse(localStorage.getItem('curOrder'));
		if (curOrder && curOrder.total) {
			setOrderTotal(curOrder.total[0]);
		}

	}, []);


	return (
		<>
			<header>
				<h1>Place an order</h1>
			</header>
			<ul data-cy="MenuCategoryList" className="menu" role="list">
				{categoryList}
			</ul>

			<Weather />

			<div id='customerCheckout'>
				<button onClick={e => handleCheckout()} id='customerCheckoutBtn'>Checkout ${orderTotal.toFixed(2)}</button>
			</div>
			<Outlet />
		</>
	);
}

export default CustomerOrder;