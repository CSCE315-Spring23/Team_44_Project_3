import React, { useState, useEffect } from "react";

import EmployeeNav from "../../components/EmployeeNav";
import '../../styles/employee.css'
import DatabaseTablePane from "../../components/DatabaseTablePane";
import { endpoints } from "../../utils/apiEndpoints";
import { HOST } from "../../utils/host";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function ExcessRep(props){
    const isManager = props.isManager;

    const [excessRepTable, setExcessRepTable] = useState([]);

    const [startDate, setStartDate] = useState(null);
    const [selectedStartDate, setSelectedDate] = useState(null);

    const handleStartDateChange = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        setSelectedDate(date);
        setStartDate(`${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`);
    }

    const genReport = async () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();

        const endDate = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

        const url = HOST + endpoints.getExcess + '?startDate=' + startDate + '&endDate=' + endDate;

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
                setExcessRepTable(table);
            }
        );
    }


    return (
        <div className="empOrderPage">
            <EmployeeNav isManager={isManager}></EmployeeNav>
            <div className="repDiv">
                <div className="repHead">
                    <Link to="/employee/reports" className="backButton">Back</Link>
                    <h2>Excess Report</h2>
                    <div className="excessRepDate">
                        <h5>Enter Start Date</h5>
                        <DatePicker
                            selected={selectedStartDate}
                            onChange={handleStartDateChange}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Start Date"
                        />
                        <button className="goButton" onClick={genReport}>Go</button>
                    </div>
                </div>
                <div className="repBody">
                    <div className = "excessRepTable">
                        {excessRepTable}
                    </div>
                </div>
            </div>
        </div>
    );
}