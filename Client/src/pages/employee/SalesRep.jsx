import React, { useState, useEffect } from "react";

import EmployeeNav from "../../components/EmployeeNav";
import '../../styles/employee.css'
import DatabaseTablePane from "../../components/DatabaseTablePane";
import { endpoints } from "../../utils/apiEndpoints";
import { HOST } from "../../utils/host";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";


export default function SalesRep(props){
    const isManager = props.isManager;

    const [salesTable, setSalesTable] = useState([]);
    const [inventoryTable, setInventoryTable] = useState([]);


    const [selectedStartDate, setSelectedDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    const handleStartDateChange = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        setSelectedDate(date);
        setStartDate(`${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`);
    }
    const handleEndDateChange = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        setSelectedEndDate(date);
        setEndDate(`${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`);
    }

    const genReport = async () => {
        console.log(startDate);
        console.log(endDate);

        const url = HOST + endpoints.getSales + '?startDate=' + startDate + '&endDate=' + endDate;
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
                console.log(data);
                const table = <DatabaseTablePane data={data}/>
                setSalesTable(table);
            });


        const url2 = HOST + endpoints.getInventorySales + '?startDate=' + startDate + '&endDate=' + endDate;
        fetch(url2,{
            method: 'GET',
        })
            .then(response => {
                if(!response.ok){
                    throw new Error("Network Resposnse not ok");
                }
                return response.json()
            })
            .then(data => {
                const table = <DatabaseTablePane data={data}/>
                setInventoryTable(table);
            });
    }

    return (
        <div className="empOrderPage">
            <EmployeeNav isManager={isManager}></EmployeeNav>
            <div className="salesRepTable">
                <h2>Sales Report</h2>
                <div className="datePicker">
                    <h5>Enter Start Date: </h5>
                    <DatePicker
                        selected={selectedStartDate}
                        onChange={handleStartDateChange}
                        dateFormat="yyyy-MM-dd"
                    />
                    <h5>Enter End Date:</h5>
                    <DatePicker
                        selected={selectedEndDate}
                        dateFormat="yyyy-MM-dd"
                        onChange={handleEndDateChange}
                    />
                    <button onClick={genReport}>Go</button>
                </div>
                <div id = "salesMenuItemTable">
                    <h4>Menu</h4>
                    {salesTable}
                </div>
                <div id = "salesInvItemTable">
                    <h4>Inventory</h4>
                    {inventoryTable}
                </div>
            </div>
        </div>
    );
}