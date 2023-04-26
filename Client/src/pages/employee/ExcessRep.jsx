/** React component for generating excess report
 * @module ExcessRep
 * @param {object} props - Component props
 * @param {boolean} props.isManager - Determines if the user is a manager or not
 * @return {JSX.Element} - Returns JSX code for Excess Report component
*/

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import DatabaseTablePane from "../../components/DatabaseTablePane";
import EmployeeNav from "../../components/EmployeeNav";
import '../../styles/employee.scss';
import { endpoints } from "../../utils/apiEndpoints";
import { HOST } from "../../utils/host";
import PageProtector from "../../components/PageProtector";


/** 
 * Excess Report component
 * @function
 * @returns {JSX.Element}
*/
export default function ExcessRep(props) {

    /**
     * Determines if the user is a manager or not
     * @type {boolean}
    */
    const isManager = props.isManager;

    /**
     * State hook to store excess report table data
     * @type {Array}
    */
    const [excessRepTable, setExcessRepTable] = useState([]);

    /**
     * State hook to store start date of excess report
     * @type {Date|null}
    */
    const [startDate, setStartDate] = useState(null);

    /**
     * State hook to store selected start date of excess report
     * @type {Date|null}
    */
    const [selectedStartDate, setSelectedDate] = useState(null);

    /**
     * Event handler for changing start date of excess report
     * @function
     * @param {Date} date - Selected date for excess report start date
     * @returns {void}
    */
    const handleStartDateChange = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        setSelectedDate(date);
        setStartDate(`${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`);
    }

    /**
     * @function async
     * Fetch the table from server and set the table state
     */
    const genReport = async () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();

        const endDate = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
        const url = `${HOST}${endpoints.getExcess}?startDate=${startDate}&endDate=${endDate}`;

        fetch(url, {
            method: 'GET',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network Response not OK");
                }
                return response.json();
            })
            .then(data => {
                const table = <DatabaseTablePane data={data} />
                setExcessRepTable(table);
            }
            );
    }

    /**
     * Navigate hook to go to the default reports page
     */
    const navigate = useNavigate();
    function navigateOrderPage() {
        navigate("/employee/reports")
    }

    return (
        <PageProtector>
            <div className="empOrderPage">
                <EmployeeNav isManager={isManager}></EmployeeNav>
                <div className="repDiv">
                    <div className="repHead">
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
                        <div className="excessRepTable">
                            {excessRepTable}
                        </div>
                    </div>
                </div>
            </div>
        </PageProtector>
    );
}