import React, {useState, useEffect} from "react";
import { endpoints } from "../utils/apiEndpoints";
import { HOST } from "../utils/host";

export default function OrderHistoryTable(){

    const [orderHistory, setOrderHistory] = useState(null);
    const [orderInformation, setOrderInformation] = useState(null);

    useEffect(() => {
        setOrderHistory(null);
        const url = HOST + endpoints.getOrderHistory;
        fetch(url, {
            method: "GET"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network Response Not OK");
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setOrderHistory(data);
            })
            .catch(error => {
                console.error("Could not fetch order history from " + url);
            }
        );
    }, []);


    const showMore = (id) => {

        setOrderInformation(null);

        const url = HOST + endpoints.getOrderInformation + "?id=" + id;
        fetch(url, {
            method: "GET"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network Response Not OK");
                }
                return response.json();
            }
        )
            .then(data => {
                console.log(data);
                setOrderInformation(data);
            }
        )
            .catch(error => {
                console.error("Could not fetch order history from " + url);
            }
        );
    }

    return (
        <>
            <div className="orderHistoryTable">
                <p>Order History</p>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer Name</th>
                            <th>Order Date</th>
                            <th>Order Total</th>
                            <th>Employee ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderHistory && orderHistory.map((order) => (
                            <tr key={order.id} onClick = { () => showMore(order.id)}>
                                <td>{order.id}</td>
                                <td>{order.customer_name}</td>
                                <td>{order.total_cost}</td>
                                <td>{order.date}</td>
                                <td>{order.employee_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="orderInformation">
                <p>Order Information</p>
                <table>
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Item Cost</th>
                            <th>Quantity Sold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderInformation && orderInformation.map((order) => (
                            <tr key={order.id}>
                                <td>{order.name}</td>
                                <td>{order.cost}</td>
                                <td>{order.totalsold}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}