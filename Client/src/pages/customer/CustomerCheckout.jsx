import React, { useState, useEffect, useContext } from "react";
import { Link, json, useNavigate } from "react-router-dom";
import CustomerOrder from "./CustomerOrder";
import { HOST } from "../../utils/host";
import { endpoints } from "../../utils/apiEndpoints";
import CustomerCheckOutItem from "../../components/CustomerCheckOutItem";
import SuggestedMenuItem from "../../components/SuggestedMenuItem";


import "../../styles/customer.scss";

import logo from "../../assets/logo.svg";
import treatImages from "../../utils/treatImages";
import beveragesImages from "../../utils/beverageImages";
import sidesImages from "../../utils/sidesImages";
import sauceImages from "../../utils/sauceImages";


const potentialRecs = [
	{ name: "Chick-fil-A Sauce", src: sauceImages.CFASauce, key: 2, id: 46 },
	{ name: "M. Soft Drink", src: beveragesImages.beverage9, key: 9, id: 29 },
	{ name: "M. Lemonade", src: beveragesImages.beverage5, key: 5, id: 25 },
	{ name: "M. Waffle Fries", src: sidesImages.side1, key: 1, id: 15 },
	{ name: "Vanilla Milkshake", src: treatImages.treat8, key: 8, id: 36 },
	{ name: "Icedream® Cone", src: treatImages.treat6, key: 6, id: 39 },
]


export default function CustomerCheckout(props) {
	const navigate = useNavigate();

	const currentOrder = JSON.parse(localStorage.getItem("curOrder")) || { total: [0], items: [] };
	const [showModal, setShowModal] = useState(false);
	const [cart, setCart] = useState(currentOrder ? currentOrder : { total: [0], items: [] });
	const [items, setItems] = useState(Object.keys(cart.items));
	const [recs, setRecs] = useState([]);

	function emptyCurrentOrder() {
		const defaultOrder = { total: [0], items: {} };
		localStorage.setItem("curOrder", JSON.stringify(defaultOrder));
		localStorage.setItem("numItems", "0");
	}

	function cancelOrder() {
		emptyCurrentOrder();
		navigate("/customer/order");
	}

	function handlePayment() {
		console.log("checkout");

		let itemsArr = [];
		for (let cartID in cart.items) {
			const id = cart.items[cartID][3];
			const count = cart.items[cartID][1];
			const excluded = cart.items[cartID][4];

			let excludedIDs = [];
			for (let i = 0; i < excluded.length; i++) {
				excludedIDs.push(excluded[i].id);
			}

			const curItem = { "id": id, "quantity": count, "excluded": excludedIDs };
			itemsArr.push(curItem);
		}

		if (itemsArr.length == 0)
			return;

		const order = {
			customerName: document.getElementById("customerName").value != "" ?
				document.getElementById("customerName").value : "noName",
			totalCost: cart.total[0].toString(),
			employeeID: -1,
			items: itemsArr
		};

		const url = HOST + endpoints.postOrder;

		console.log(order);
		if (order.items === undefined) {
			alert("Please add items to your order before checking out.");
			return;
		}
		fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(order)
		})
			.then(response => {
				return response.text();
			})
			.then(data => {
				console.log(data);
			});

		console.log("Order Posted");

		setShowModal(true);
		setTimeout(() => {
			setShowModal(false);
			navigate("/customer/order");
		}, 3000);

		const defaultOrder = { total: [0], items: [] };
		setCart(defaultOrder);
		setItems([]);
		localStorage.setItem("curOrder", JSON.stringify(defaultOrder));
		localStorage.setItem("numItems", "0");
		setOrderValue(0);

	};

	const backToOrder = () => {
		navigate("/customer/order");
	};

	//get menu and update total
	const [orderValue, setOrderValue] = useState(0);
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
			setOrderValue(curOrder.total[0]);
		}

	}, []);

	{/* Create RemoveMenuItem as a child to handle - item on frontend to decrement price and amount upon click */ }
	const removeFromCart = (cartID) => {
		console.log("remove from cart ->", cartID, cart.items[cartID][0]);

		let newCart = { ...cart };
		newCart.total[0] -= newCart.items[cartID][2];
		if (newCart.items[cartID][1] > 1)
			newCart.items[cartID][1] -= 1;
		else
			delete newCart.items[cartID];

		// check if null
		for (let item in newCart.items) {
			if (item === null || item === undefined) {
				delete newCart.items[item]
			}
		}

		setCart(newCart);
		setItems(newCart.items ? Object.keys(newCart.items) : []);
		let newTotal = Math.abs(newCart.total[0]);

		setOrderValue(newTotal);
		localStorage.setItem("curOrder", JSON.stringify(newCart));
		localStorage.setItem("numItems", newCart.items ? Object.keys(newCart.items).length : 0);

		const checkOutBtn = document.getElementById("customerCheckoutBtn");
		checkOutBtn.disabled = newCart.items === undefined || Object.keys(newCart.items).length === 0;
	}

	useEffect(() => {
		// if cart doesn't contain fries, recommend fries
		let recs = [];

		let fries = false;
		let drink = false;
		let sauce = false;
		let treat = false;

		for (let id in cart.items) {
			if (cart.items[id][3] === 15 || cart.items[id][3] === 16) {
				fries = true;
			}
			if (cart.items[id][3] >= 20 && cart.items[id][3] <= 32) {
				drink = true;
			}
			if (cart.items[id][3] === 46) {
				sauce = true;
			}
			if (cart.items[id][3] >= 33 && cart.items[id][3] <= 41) {
				treat = true;
			}
		}

		if (!fries) {
			recs.push(potentialRecs[3]);
		}
		if (!drink) {
			recs.push(potentialRecs[1]);
			recs.push(potentialRecs[2]);
		}
		if (!sauce) {
			recs.push(potentialRecs[0]);
		}
		if (!treat) {
			recs.push(potentialRecs[4]);
			recs.push(potentialRecs[5]);
		}

		setRecs(recs);

	}, [cart]);

	function addToCartChkout(item, excludeItems) {
		console.log("item: ", item, "excludeItems: ", excludeItems);
		const carts = JSON.parse(localStorage.getItem("curOrder")) || { total: [0], items: {} };
		let cartID = Object.keys(carts.items).length > 0 ? parseInt(Object.keys(carts.items)[Object.keys(carts.items).length - 1]) + 1 : 0;
		console.log(carts, cartID, Object.keys(cart).length)
		let newCart = { ...cart };

		let numberOfItems = localStorage.getItem("numItems");
		numberOfItems = numberOfItems ? parseInt(numberOfItems) : 0;

		const menu = JSON.parse(localStorage.getItem("menu"));

		if (item.ids) {
			for (let i = 0; i < item.ids.length; i++) {
				console.log("item.ids[i]: ", item.ids[i]);
				menu.forEach((arrItem) => {
					if (arrItem.id == item.ids[i]) {
						console.log("arrItem: ", arrItem);

						let found = false;
						for (let key in newCart.items) {
							if (newCart.items[key][0] === arrItem.name && (JSON.stringify(newCart.items[key][4]) === JSON.stringify(excludeItems) || i != 0)) {
								newCart.items[key][1] += 1;
								newCart.total[0] += Number(arrItem.cost);
								found = true;
								break;
							}
						}
						if (!found) {
							newCart.items[cartID] = [arrItem.name, 1, arrItem.cost, arrItem.id, i == 0 ? excludeItems : []];
							newCart.total[0] += Number(arrItem.cost);
							cartID++;
						}
						localStorage.setItem("numItems", JSON.stringify(numberOfItems + 1));
						window.dispatchEvent(new Event('storage'));
						return;
					}
				});
			}
		}

		if (item.id) {
			menu.forEach((arrItem) => {
				if (arrItem.id == item.id) {
					let found = false;
					for (let key in newCart.items) {
						if (newCart.items[key][0] === arrItem.name && JSON.stringify(newCart.items[key][4]) === JSON.stringify(excludeItems)) {
							newCart.items[key][1] += 1;
							newCart.total[0] += Number(arrItem.cost);
							found = true;
							break;
						}
					}
					if (!found) {
						newCart.items[cartID] = [arrItem.name, 1, arrItem.cost, arrItem.id, excludeItems];
						newCart.total[0] += Number(arrItem.cost);
					}
					localStorage.setItem("numItems", JSON.stringify(numberOfItems + 1));
					window.dispatchEvent(new Event('storage'));
					return;
				}
			});
		}
		setCart(newCart);
		setItems(Object.keys(newCart.items));
		let newTotal = Math.abs(newCart.total[0]);

		setOrderValue(newTotal);
		localStorage.setItem("curOrder", JSON.stringify(newCart));
		localStorage.setItem("numItems", newCart.items ? Object.keys(newCart.items).length : 0);

	}

	return (
		<div>
			<div className="customerCheckoutTop">
				<div className="backDiv" style={{ width: "6em", margin: ".35em 0em 0em .35em" }}>
					<button title="Back to order list" data-cy="SubNavBack" className="backButton" onClick={backToOrder}>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M14.09 22L5 12l9.09-10" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
							</path>
						</svg>
						<div aria-hidden="true" className="backText">
							Back
						</div>
					</button>
				</div>
				<div className="customerCheckoutTitle">
					<h1>Cart</h1>
				</div>
				<div className="logo-icon">
					<img src={logo} alt="Chick-fil-A logo" className="logo-icon" />
				</div>
			</div>
			<div className="customerCheckout">
				<div className="customerCheckoutItems">
					{items && items.map(cartID => (
						<CustomerCheckOutItem
							itemName={cart.items[cartID][0]}
							count={cart.items[cartID][1]}
							price={cart.items[cartID][2]}
							cartID={cartID}
							excluded={cart.items[cartID][4]}
							removeFromCart={removeFromCart}
						>
						</CustomerCheckOutItem>
					))}
				</div>
				{recs.length > 0 &&
					<div className="customerCheckoutSuggs">
						<h3>Recommended</h3>
						<div className="customerCheckoutSuggsItems">
							{recs.map(item => (
								<SuggestedMenuItem key={item.id} item={item} addToCart={addToCartChkout} />
							))}
						</div>
					</div>}
				<form className="customerNameForm">
					<label for="customerName">Please enter your name:</label>
					<input type="text" id="customerName" name="customerName" />
				</form>
				<div id="customerCheckoutButtons">
					<button className="cancelButton" onClick={cancelOrder}>Cancel Order</button>
					{showModal && (
						<h3 className="orderPopup">Order Successful</h3>
					)}
					<button onClick={e => handlePayment()} id="customerCheckoutBtn">Checkout ${orderValue.toFixed(2)}</button>
				</div>

			</div>
		</div>

	);
}
