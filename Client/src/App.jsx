import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HOST } from './utils/host';
import Login from './pages/Login.jsx';
import Order from './pages/Order.jsx';
import ServerTest from './pages/ServerTest';

function App() {
	return (
		<BrowserRouter basename="/">
			<Routes>
			<Route path="/" element={<ServerTest />} />
				<Route path="/Login" element={<Login />} />
				<Route path="/Order" element={<Order />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App
