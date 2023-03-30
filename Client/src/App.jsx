import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HOST } from './utils/host';
import Login from './pages/Login.jsx';
import CustomerOrder from './pages/customer/CustomerOrder.jsx';
import OrderHistory from './pages/employee/OrderHistory';
import Order from './pages/employee/Order';
import EmployeeRoutes from './routes/EmployeeRoutes';

function App() {
	return (
		<BrowserRouter basename="/">
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/Login" element={<Login />} />
				<Route path="/CustomerOrder" element={<CustomerOrder />} />
			</Routes>
			<EmployeeRoutes />
		</BrowserRouter>
	);
}

export default App
