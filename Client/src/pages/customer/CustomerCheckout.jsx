import React, {useState, useEffect, useContext} from "react";
import {Link, json, useNavigate} from "react-router-dom";
import CustomerOrder from "./CustomerOrder";
import {HOST} from "../../utils/host";
import {endpoints} from "../../utils/apiEndpoints";
import CustomerCheckOutItem from "../../components/CustomerCheckOutItem";

export default function CustomerCheckout(props) {

	const currentOrder = JSON.parse(localStorage.getItem('curOrder'));
    const items = currentOrder.items;
	console.log(items);

	const navigate = useNavigate();

	const [showModal, setShowModal] = useState(false);

	function emptyCurrentOrder() {
		const defaultOrder = {total: [0], items: []};
		localStorage.setItem("curOrder", JSON.stringify(defaultOrder));
		localStorage.setItem("numItems", "0");
	}

	function cancelOrder() {
		emptyCurrentOrder();
		navigate("/customer/order");
	}

	const handlePayment = () => {
		console.log("checkout");
		const cart = JSON.parse(localStorage.getItem('curOrder'));

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

		const defaultOrder = { total: [0], items: [] };
		localStorage.setItem('curOrder', JSON.stringify(defaultOrder));
		localStorage.setItem('numItems', '0');
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
	{/* If items.quantity == 0, we remove the component from localstorage */}

	return (
		<div>
			<div className="backDiv">
				<button title="Back to order list" data-cy="SubNavBack" className="backButton" onClick={backToOrder}>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M14.09 22L5 12l9.09-10" stroke="#DD0031" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
						</path>
					</svg>
					<div aria-hidden="true" className="backText">
						Back
					</div>
				</button>
			</div>
			{items.map((item, index) => (
				<CustomerCheckOutItem
					itemName={items[index][0]}
					count={items[index][1]}
					price={items[index][2]}
					currOrderItem = {item}>
					itemID={items[index][3]}
					excludedItems={items[index][4]}
				</CustomerCheckOutItem>
			))}
			<form>
				<label for="customerName">Please enter your name:</label>
				<input type="text" id="customerName" name="customerName" />
			</form>
			<div id="customerCheckout">
				<button onClick={e => handlePayment()} id="customerCheckoutBtn">Checkout ${orderValue.toFixed(2)}</button>
			</div>
			<button className="cancelButton" onClick={cancelOrder}>Cancel Order</button>
			{showModal && (
				<h3 className="orderPopup">Order Successful</h3>
			)}
		</div>

	)
}