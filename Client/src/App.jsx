import React, {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
	const [count, setCount] = useState(0)
	const [orderItems, setOrderItems] = useState([])


	useEffect(() => {
		fetch('http://localhost:3001/orderhistory/getOrders')
			.then((res) => res.json())
			.then((data) => {
				setOrderItems(data)
			})
	}, [])

	return (
		<div className="App">
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://reactjs.org" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.jsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>

			<ul>
				{orderItems.map((item) => (
					<li key={item.id}>{item.id}, {item.customer_name}, {item.total_cost}, {item.date}, {item.employee_id}</li>
				))}
			</ul>
		</div>
	)
}

export default App
