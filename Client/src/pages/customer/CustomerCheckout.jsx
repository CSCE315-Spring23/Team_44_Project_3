import React, {useState, useEffect, useContext} from "react";
import {Link, json, useNavigate} from "react-router-dom";
import CustomerOrder from "./CustomerOrder";
import {HOST} from "../../utils/host";
import {endpoints} from "../../utils/apiEndpoints";
import CustomerCheckOutItem from "../../components/CustomerCheckOutItem";

import "../../styles/customer.scss";
export default function CustomerCheckout(props) {
	const navigate = useNavigate();

	const currentOrder = JSON.parse(localStorage.getItem("curOrder")) || {total: [0], items: []};
	const items = Object.keys(currentOrder.items);
	const [showModal, setShowModal] = useState(false);
	const [cart, setCart] = useState(currentOrder ? currentOrder : {total: [0], items: []});

	function emptyCurrentOrder() {
		const defaultOrder = {total: [0], items: {}};
		localStorage.setItem("curOrder", JSON.stringify(defaultOrder));
		localStorage.setItem("numItems", "0");
	}

	function cancelOrder() {
		emptyCurrentOrder();
		navigate("/customer/order");
	}

	const handlePayment = () => {
		console.log("checkout");

		let itemsArr = [];
		for (let cartID in cart.items) {
			const id = cart.items[cartID][3];
			const count = cart.items[cartID][1];
			const excluded = cart.items[cartID][4];

			let excludedIDs = [];
			for (let i = 0;i < excluded.length;i++) {
				excludedIDs.push(excluded[i].id);
			}

			const curItem = {"id": id, "quantity": count, "excluded": excludedIDs};
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
			headers: {"Content-Type": "application/json"},
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

		const defaultOrder = {total: [0], items: []};
		setCart(defaultOrder);
		localStorage.setItem("curOrder", JSON.stringify(defaultOrder));
		localStorage.setItem("numItems", "0");
		setOrderValue(0);

	}

	const backToOrder = () => {
		navigate("/customer/order")
	}

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

	{/* Create RemoveMenuItem as a child to handle - item on frontend to decrement price and amount upon click */}
	const removeFromCart = (cartID) => {
		console.log("remove from cart ->", cartID, cart.items[cartID][0]);

		let newCart = {...cart};
		newCart.total[0] -= newCart.items[cartID][2];
		if (newCart.items[cartID][1] > 1) {
			newCart.items[cartID][1] -= 1;
		}
		else {
			delete newCart.items[cartID];
		}

		//check if one of the items in the cart is null, remove it
		for (let item in newCart.items) {
			if (newCart.items[item] === null) {
				delete newCart.items[item];
			}
		}

		setCart(newCart);
		let newTotal = Math.abs(newCart.total[0]);

		setOrderValue(newTotal);
		localStorage.setItem("curOrder", JSON.stringify(newCart));
		localStorage.setItem("numItems", newCart.items ? Object.keys(newCart.items).length : 0);

		const checkOutBtn = document.getElementById("customerCheckoutBtn");
		checkOutBtn.disabled = Object.keys(newCart.item).length == 0;
	}

	return (
		<div>
			<div className="backDiv" style={{width: "6em", margin:".35em 0em 0em .35em"}}>
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
			<div className="customerCheckout">
				<div className="customerCheckoutItems">
					{items.map(cartID => (
						<CustomerCheckOutItem
							itemName={cart.items[cartID][0]}
							count={cart.items[cartID][1]}
							price={cart.items[cartID][2]}
							onClick={props.removeFromCart}
							cartID={cartID}
							excluded={cart.items[cartID][4]}
							removeFromCart={removeFromCart}
						>
						</CustomerCheckOutItem>
					))}
					{props.excluded &&
						<div className="checkoutItemEx">
							<ul style={{margin: 0}}>
								{props.excluded && props.excluded.map((item, index) => {
									if (item.name)
										return <li key={index}>no {item.name}</li>
									if (index === props.excluded.length - 1) {
										return <li key={index}>{item}</li>
									}
								})}
							</ul>
						</div>}
				</div>
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

	)
}