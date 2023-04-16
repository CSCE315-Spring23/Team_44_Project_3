import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './pages/Login.jsx';
import CustomerRoutes from './routes/CustomerRoutes';
import EmployeeRoutes from './routes/EmployeeRoutes';


import Test from './pages/Test.jsx';

function App() {
	return (
		<BrowserRouter basename="/">
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/Login" element={<Login />} />
				<Route path="/Test" element={<Test />} />  {/* This is a test page for testing API calls, remove in done*/}
				{/* <Route path="/Order" element={<Order />} /> */}
			</Routes>
			<CustomerRoutes />
			<EmployeeRoutes />
		</BrowserRouter>
	);
}

export default App
