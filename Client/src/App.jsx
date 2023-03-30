import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {HOST} from './utils/host';
import Login from './pages/Login.jsx';
import Order from './pages/customer/CustomerOrder.jsx';
import ServerTest from './pages/ServerTest';

function App() {
	return (
		<BrowserRouter basename="/">
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/Login" element={<Login />} />
				<Route path="/CustomerOrder" element={<CustomerOrder />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App
