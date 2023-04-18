import React, {useEffect, useState} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import CategoryItem from '../../components/CategoryItem';
import Weather from '../../components/Weather';
import {endpoints} from '../../utils/apiEndpoints';
import {HOST} from '../../utils/host';

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

	function checkoutPage() {
        navigate("/customer/order/checkout");
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

	const navigate = useNavigate();

	function navigateOrderPage() {
		navigate('/Login')
	};

	return (
		<>
			<nav className="desktop-navigation">
				<div className="backDiv">
					<button title="Back to login" data-cy="SubNavBack" className="backButton" onClick={navigateOrderPage}>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M14.09 22L5 12l9.09-10" stroke="#DD0031" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
							</path>
						</svg>
						<div aria-hidden="true" className="backText">
							Back
						</div>
					</button>
				</div>

				<div className="title">Place an Order</div>

				<div className="order">
					<button className="viewOrderBtn" onClick={checkoutPage}>
						<div className="bagIcon">
							<span className="itemCount">0</span>
							<svg width="30" height="31" viewBox="0 0 30 31" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="sc-NfXLL kkFxpj">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M21.065 28.216l2.717-25.681h.713l2.428 25.68h-5.858zM5.227 2.535h3.085c.162 1.01.612 1.94 1.3 2.649.898.925 2.125 1.413 3.546 1.413 1.42 0 2.644-.488 3.542-1.412.69-.709 1.14-1.638 1.304-2.65h3.507l-2.718 25.68H3.144l2.083-25.68zM26.65 1.333a1.12 1.12 0 00-1.126-1h-8.59c-.31 0-.607.125-.82.345a1.083 1.083 0 00-.308.816c.046.835-.233 1.648-.748 2.177-.467.482-1.107.725-1.9.725-.797 0-1.437-.244-1.905-.725-.513-.529-.791-1.342-.744-2.176a1.086 1.086 0 00-.307-.817 1.146 1.146 0 00-.821-.345h-5.2c-.59 0-1.08.442-1.127 1.015L.795 29.23c-.024.306.083.608.297.834.214.224.515.353.83.353h26.24c.318 0 .62-.13.835-.359.213-.229.319-.535.29-.843L26.651 1.333z">
								</path>
							</svg>
						</div>
						My Order
					</button>
				</div>
			</nav>
			<ul data-cy="MenuCategoryList" className="menu" role="list">
				{categoryList}
			</ul>

			<Weather />
			
			<Outlet />
		</>
	);
}

export default CustomerOrder;