import React, { useState, useEffect } from "react";

import EmployeeNav from "../../components/EmployeeNav";
import '../../styles/employee.css'
import DatabaseTablePane from "../../components/DatabaseTablePane";
import { endpoints } from "../../utils/apiEndpoints";
import { HOST } from "../../utils/host";


export default function Inventory(props) {
    const isManager = props.isManager;

    const [inventoryTable, setInventoryTable] = useState();

    useEffect(() => {
        setInventoryTable(null);
        const url = HOST + endpoints.inventory;

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
                setInventoryTable(table);
            });
    }, []);

    return (
        <div className="empInventoryPage">
            <EmployeeNav isManager={isManager}></EmployeeNav>
            <div id="inventoryDiv">
                <h2>Inventory</h2>
                {inventoryTable}
            </div>
            <div id="inventoryFormsDiv">
            </div>
        </div>
    );
}