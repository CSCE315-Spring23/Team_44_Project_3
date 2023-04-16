import React, {useState} from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useNavigate} from 'react-router-dom';
import DatabaseTablePane from "../../components/DatabaseTablePane";
import EmployeeNav from "../../components/EmployeeNav";
import '../../styles/employee.css';
import {endpoints} from "../../utils/apiEndpoints";
import {HOST} from "../../utils/host";


export default function SalesRep(props) {
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
                if (!response.ok) {
                    throw new Error("Newwork Response not OK");
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                const table = <DatabaseTablePane data={data} />
                setSalesTable(table);
            });


        const url2 = HOST + endpoints.getInventorySales + '?startDate=' + startDate + '&endDate=' + endDate;
        fetch(url2, {
            method: 'GET',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network Resposnse not ok");
                }
                return response.json()
            })
            .then(data => {
                const table = <DatabaseTablePane data={data} />
                setInventoryTable(table);
            });
    }

    const navigate = useNavigate();

    function navigateOrderPage() {
        navigate("/employee/reports")
    }

    return (
        <div className="empOrderPage">
            <EmployeeNav isManager={isManager}></EmployeeNav>
            <div className="repDiv">
                <div className="repHead">
                    <div className="repTitle">
                        <div className="backDiv">
                            <button title="Back to menu category list" data-cy="SubNavBack" className="backButton" onClick={navigateOrderPage}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.09 22L5 12l9.09-10" stroke="#DD0031" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                    </path>
                                </svg>
                                <div aria-hidden="true" className="backText">
                                    Back
                                </div>
                            </button>
                        </div>
                        <h2>Sales Report</h2>
                        <div className="datePicker">
                            <h5>Enter Start Date: </h5>
                            <DatePicker
                                selected={selectedStartDate}
                                onChange={handleStartDateChange}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="Start Date"
                            />
                            <h5>Enter End Date:</h5>
                            <DatePicker
                                selected={selectedEndDate}
                                dateFormat="yyyy-MM-dd"
                                onChange={handleEndDateChange}
                                placeholderText="End Date"
                            />
                            <button className="goButton" onClick={genReport}>Go</button>
                        </div>
                    </div>
                </div>
                <div className="repBody">
                    <div className="salesMenuItemTable">
                        <h4>Menu</h4>
                        {salesTable}
                    </div>
                    <div className="salesInvItemTable">
                        <h4>Inventory</h4>
                        {inventoryTable}
                    </div>
                </div>
            </div>
        </div>
    );
}