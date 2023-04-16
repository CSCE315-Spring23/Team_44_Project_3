import React, {useEffect, useState} from "react";

import {useNavigate} from 'react-router-dom';
import DatabaseTablePane from "../../components/DatabaseTablePane";
import EmployeeNav from "../../components/EmployeeNav";
import '../../styles/employee.css';
import {endpoints} from "../../utils/apiEndpoints";
import {HOST} from "../../utils/host";

export default function XZRep(props) {
    const isManager = props.isManager;

    const [zReport, setZReport] = useState([]);

    const [reportType, setReportType] = useState("");

    const [totalSales, setTotalSales] = useState(0);
    const [employee, setEmployee] = useState("");
    const [dateCreated, setDateCreated] = useState("");
    const [orderID, setOrderID] = useState(0);

    useEffect(() => {
        loadZReports();
    }, []);

    const loadZReports = async () => {
        const url = HOST + endpoints.getZReports;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                const table = <DatabaseTablePane data={data} handleOnClick={viewZReportInfo} />
                setZReport(table);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const viewZReportInfo = async (id) => {

        const url = HOST + endpoints.getZReportInfo + "?id=" + id;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                //convert data to string
                const dataString = JSON.stringify(data);
                setReportType("Z Report");
                setTotalSales(data.totalsales);
                setEmployee(data.employee);
                setDateCreated(data.datecreated);
                setOrderID(data.orderid);
            }
            );
    }


    const createZReport = () => {
        console.log("create Z report");
        const EMP_ID = localStorage.getItem('empID');

        const url = HOST + endpoints.createZReport;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({employeeid: EMP_ID})
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setReportType("Z Report");
                loadZReports();
                setTotalSales(data.totalsales);
                setEmployee(data.employee);
                setDateCreated(data.datecreated);
                setOrderID(data.orderid);
            }
            );
    }


    const viewXReport = async () => {
        const EMP_ID = localStorage.getItem('empID');

        const url = HOST + endpoints.getXReport + "?employeeid=" + EMP_ID;

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setReportType("X Report");
                setTotalSales(data.totalSales);
                setEmployee(data.employeeName);
                setDateCreated(data.date);
                setOrderID(data.orderID);
            }
            );
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
                    <h2>XZ Reports</h2>
                    <button className="goButton" onClick={createZReport}>Create Z Report</button>
                    <button className="goButton" onClick={viewXReport}>View X Report</button>
                </div>

                <div className="repBody">
                    <div className="repZTable">
                        <h3>Z Reports</h3>
                        {zReport}
                    </div>
                    <div className="repXZInfo">
                        <h3>Info</h3>
                        <div className="repXZInfoBody">
                            <p>Report Type: {reportType}</p>
                            <p>Employee: {employee}</p>
                            <p>Date Created: {dateCreated.split('T')[0]}</p>
                            <p>Order ID: {orderID}</p>
                            <p>Total Sales: {totalSales}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}