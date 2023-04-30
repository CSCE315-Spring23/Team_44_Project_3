import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './pages/Login.jsx';
import CustomerRoutes from './routes/CustomerRoutes';
import EmployeeRoutes from './routes/EmployeeRoutes';

import { Helmet } from 'react-helmet';

function App() {
	return (
		<BrowserRouter basename="/">
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/Login" element={<Login />} />
			</Routes>
			<CustomerRoutes></CustomerRoutes>
			<EmployeeRoutes></EmployeeRoutes>
		</BrowserRouter>
	);
}

export default App
