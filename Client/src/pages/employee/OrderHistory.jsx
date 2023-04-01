import React, { useEffect, useState } from "react";
import EmployeeNav from "../../components/EmployeeNav";
import '../../styles/employee.css'
import DatabaseTablePane from "../../components/DatabaseTablePane";
import { endpoints } from "../../utils/apiEndpoints";
import { HOST } from "../../utils/host";

export default function OrderHistory(props) {
    const isManager = props.isManager;

    const [orderHistTable, setOrderHistTable] = useState();

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
                const table = <DatabaseTablePane data={data} />;
                setOrderHistTable(table);
            });
    }, []);

    return (
        <div className="empOrderPage">
            <EmployeeNav isManager={isManager}></EmployeeNav>
            <div id="orderHistoryDiv">
                {orderHistTable}
            </div>
        </div>
    );
}