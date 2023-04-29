/**
 * @desc React component for displaying order history page for employees
 * @param {object} props - The props object containing the isManager value
 * @returns {JSX.Element} - The JSX code for the order history page
 */
import React, {useEffect, useState} from "react";
import DatabaseTablePane from "../../components/DatabaseTablePane";
import EmployeeNav from "../../components/EmployeeNav";
import '../../styles/employee.scss';
import {endpoints} from "../../utils/apiEndpoints";
import {HOST} from "../../utils/host";
import PageProtector from "../../components/PageProtector";

function OrderHistory(props) {
    // State variables for holding the order history table, order history information ID, and order history information
    const [orderHistTable, setOrderHistTable] = useState();
    const [orderHistInfoID, setOrderHistInfoID] = useState();
    const [orderHistInfo, setOrderHistInfo] = useState();

    // Fetches order history data when component is mounted
    useEffect(() => {
        // Resets the order history table
        setOrderHistTable(null);

        // Fetches the order history data from the server
        const url = HOST + endpoints.orderHistory;
        fetch(url, {
            method: "GET"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response not OK");
                }
                // Sets the order history data as a database table pane
                return response.json();
            })
            .then(data => {
                const table = <DatabaseTablePane data={data} handleOnClick={handleOnClick} />;
                setOrderHistTable(table);
            });
    }, []);

    // Handles the click event of an order history row to display the order information
    function handleOnClick(id) {
        // Resets the order history information
        setOrderHistInfo(null);
        // Sets the order history information ID
        setOrderHistInfoID(id);

        // Fetches the order information data from the server
        const url = HOST + endpoints.orderInformation + "?id=" + id;
        fetch(url, {
            method: "GET"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response not OK");
                }
                // Sets the order information data as a database table pane
                return response.json();
            })
            .then(data => {
                const table = <DatabaseTablePane data={data} />;
                setOrderHistInfo(table);
            });
    };

    // Renders the order history page
    return (
        <PageProtector>
            <div className="empOrderPage">
                <EmployeeNav isManager={props.isManager} current={"history"} />
                <div id="orderHistoryTableDiv">
                    <h2>Order History</h2>
                    {orderHistTable}
                </div>
                <div id="orderHistoryInfoDiv">
                    <h3>View Order #{orderHistInfoID}</h3>
                    {orderHistInfo}
                </div>
            </div>
        </PageProtector>
    );
}

export default OrderHistory;
