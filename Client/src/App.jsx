import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HOST } from './utils/host';
import Login from './pages/Login.jsx';

function App() {
	return (
		<BrowserRouter basename='/'>
			<Routes>
				<Route path="Login" element={<Login />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App
