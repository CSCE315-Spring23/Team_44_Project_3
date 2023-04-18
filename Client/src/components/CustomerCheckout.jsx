import React, {useState, useEffect, useContext} from "react";
import {Link, json, useNavigate} from "react-router-dom";
import CustomerOrder from "../pages/customer/CustomerOrder";
import {HOST} from "../utils/host";
import {endpoints} from "../utils/apiEndpoints";

export default function CustomerCheckout(props) {

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
		const orderLocal = JSON.parse(localStorage.getItem("curOrder"));
		const order = {
			customerName: document.getElementById("customerName").value != "" ?
				document.getElementById("customerName").value : "noName",
			totalCost: orderLocal.total[0],
			employeeID: 0,
			items: orderLocal.items
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
		}, 3000);

		const defaultOrder = {total: [0], items: []};
		localStorage.setItem("curOrder", JSON.stringify(defaultOrder));
		setOrderValue(0);

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

	{/* Work on emptying cart with empty button and  */}
	{/* Display all menu items in current order, their total price, and the quantity */}
	{/* Display total price at the bottom */}
	{/* Create RemoveMenuItem as a child to handle - item on frontend to decrement price and amount upon click */}
	{/* If items.quantity == 0, we remove the component from localstorage */}
	{/* Update handleCheckout in CustomerOrder.jsx */}

	return (
		<div>
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