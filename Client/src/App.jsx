import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HOST } from './utils/host';
import Login from './pages/Login.jsx';

function App() {

	// const [orderHistory, setOrderHistory] = useState([])

	// useEffect(() => {
	// 	fetch(`${HOST}/api/orderhistory/getOrders`)
	// 		.then(res => res.json())
	// 		.then(data => {
	// 			setOrderHistory(data)
	// 		})
	// }, [])

	// return (
	// 	<div className="App">
	// 		Hello World!
	// 		<ul>
	// 			{orderHistory.map(order => (
	// 				<li key={order.id}>{order.id}, {order.customer_name}, {order.total_cost}, {order.date}, {order.employee_id}</li>
	// 			))}
	// 		</ul>
	// 	</div>
	// );
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/Login" element={<Login />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App
