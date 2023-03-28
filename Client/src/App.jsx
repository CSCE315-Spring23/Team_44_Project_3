import React, {useEffect, useState} from 'react'

import { HOST } from './utils/host'

function App() {

	const [orderHistory, setOrderHistory] = useState([])

	useEffect(() => {
		fetch(`${HOST}/api/orderhistory/getOrders`)
			.then(res => res.json())
			.then(data => {
				setOrderHistory(data)
			})
	}, [])

	return (
		<div className="App">
			Hello World!
			<ul>
				{orderHistory.map(order => (
					<li key={order.id}>{order.id}, {order.customer_name}, {order.total_cost}, {order.date}, {order.employee_id}</li>
				))}
			</ul>
		</div>
	)
}

export default App
