import React, {useEffect, useState} from "react";

import DatabaseTablePane from "../../components/DatabaseTablePane";
import EmployeeNav from "../../components/EmployeeNav";
import '../../styles/employee.css';
import {endpoints} from "../../utils/apiEndpoints";
import {HOST} from "../../utils/host";

export default function OrderHistory(props) {


    const isManager = props.isManager;

    const [orderHistTable, setOrderHistTable] = useState();
    const [orderHistInfoID, setOrderHistInfoID] = useState();
    const [orderHistInfo, setOrderHistInfo] = useState();

    useEffect(() => {
        setOrderHistTable(null);
        const url = HOST + endpoints.orderHistory;
        fetch(url, {
            method: "GET"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response not OK");
                }
                //setOrderHistData(Object.assign({}, response.json()));
                return response.json();
            })
            .then(data => {
                const table = <DatabaseTablePane data={data} handleOnClick={handleOnClick} />;
                setOrderHistTable(table);
            });
    }, []);

    const handleOnClick = (id) => {
        setOrderHistInfo(null);
        setOrderHistInfoID(id)
        const url = HOST + endpoints.orderInformation + "?id=" + id;
        fetch(url, {
            method: "GET"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response not OK");
                }
                return response.json();
            })
            .then(data => {
                const table = <DatabaseTablePane data={data} />;
                setOrderHistInfo(table);
            });
    }

    return (
        <div className="empOrderPage">
            <EmployeeNav isManager={isManager}></EmployeeNav>
            <div id="orderHistoryTableDiv">
                <h2>Order History</h2>
                {orderHistTable}
            </div>
            <div id="orderHistoryInfoDiv">
                <h3>View Order #{orderHistInfoID}</h3>
                {orderHistInfo}
            </div>
        </div>
    );
}