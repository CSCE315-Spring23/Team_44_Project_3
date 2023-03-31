import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HOST } from './utils/host';
import Login from './pages/Login.jsx';
import Order from './pages/employee/Order';
import EmployeeRoutes from './routes/EmployeeRoutes';
import CustomerRoutes from './routes/CustomerRoutes';

function App() {
	return (
		<BrowserRouter basename="/">
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/Login" element={<Login />} />
			</Routes>
			<CustomerRoutes />
			<EmployeeRoutes />
		</BrowserRouter>
	);
}

export default App
