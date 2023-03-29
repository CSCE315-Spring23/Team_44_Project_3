import React, {useEffect, useState} from 'react'

import { HOST } from './utils/host'

function App() {

	const [orderHistory, setOrderHistory] = useState([])
	const [orderInformation, setOrderInformation] = useState([])

	useEffect(() => {
		fetch(`${HOST}/api/orderhistory/getOrders`)
			.then(res => res.json())
			.then(data => {
				setOrderHistory(data)
			})
			.then(() => {

				for(let i = 0; i < orderHistory.length; i++){
					fetch(`${HOST}/api/orderhistory/getOrderItems/${orderHistory[i].id}`)
						.then(res => res.json())
						.then(data => {
							console.log(data)
							setOrderInformation(data)
						})
				}
			})
	}, [])

	useEffect(() => {


	}, [])

	return (
		<div className="App">
			Hello World!
			<ul>
				{orderHistory.map(order => (
					<li key={order.id}>{order.id}, {order.customer_name}, {order.total_cost}, {order.date}, {order.employee_id}</li>
				))}
			</ul>
			<ul>
				{orderInformation.map(item => (
					<li key = {item.name}>{item.name}, {item.cost}, {item.totalsold}</li>
				))}
			</ul>
		</div>
	)
}

export default App
