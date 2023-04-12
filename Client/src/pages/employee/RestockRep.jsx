import React, { useState, useEffect } from "react";

import EmployeeNav from "../../components/EmployeeNav";
import '../../styles/employee.css'
import DatabaseTablePane from "../../components/DatabaseTablePane";
import { endpoints } from "../../utils/apiEndpoints";
import { HOST } from "../../utils/host";
import { Link } from "react-router-dom";


export default function RestockRep(props){
    const isManager = props.isManager;

    const [restockTable, setRestockTable] = useState([]);

    useEffect(() => {
        const url = HOST + endpoints.getRestock;

        fetch(url, {
            method: 'GET',
        })
            .then(response => {
                if(!response.ok){
                    throw new Error("Newwork Response not OK");
                }
                return response.json();
            })
            .then(data => {
                const table = <DatabaseTablePane data={data}/>
                setRestockTable(table);
            });
    }, []);

    return (
        <div className="empOrderPage">
            <EmployeeNav isManager={isManager}></EmployeeNav>
            <div className="repDiv">
                <div className="repHead">
                    <Link to="/employee/reports" className="backButton">Back</Link>
                    <h2>Restock Report</h2>
                </div>
                <div className="repBody">
                    <div className="restockRepTable">
                        {restockTable}
                    </div>
                </div>
            </div>
        </div>
    );
}