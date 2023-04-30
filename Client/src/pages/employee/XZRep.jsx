import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import DatabaseTablePane from "../../components/DatabaseTablePane";
import EmployeeNav from "../../components/EmployeeNav";
import '../../styles/employee.scss';
import {endpoints} from "../../utils/apiEndpoints";
import {HOST} from "../../utils/host";
import PageProtector from "../../components/PageProtector";

/**
 * A component for displaying and managing XZ Reports.
 * @param {Object} props - The component props.
 * @param {boolean} props.isManager - A boolean indicating if the logged-in user is a manager.
 * @returns {JSX.Element} - The XZRep component.
 */
function XZRep(props) {
	const isManager = props.isManager;
	const navigate = useNavigate();

	const [zReport, setZReport] = useState([]);
	const [reportType, setReportType] = useState("");
	const [totalSales, setTotalSales] = useState("");
	const [employee, setEmployee] = useState("");
	const [dateCreated, setDateCreated] = useState("");
	const [orderID, setOrderID] = useState("");

	useEffect(() => {
		loadZReports();
	}, []);

	/**
	 * Load Z Reports from the server and update the state.
	 * @returns {void}
	 */
	async function loadZReports() {
		const url = HOST + endpoints.getZReports;

		fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(response => response.json())
			.then(data => {
				const table = <DatabaseTablePane data={data} handleOnClick={viewZReportInfo} />;
				setZReport(table);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}

	/**
	 * View the details of a specific Z Report.
	 * @param {number} id - The ID of the Z Report to view.
	 * @returns {void}
	 */
	async function viewZReportInfo(id) {
		const url = HOST + endpoints.getZReportInfo + "?id=" + id;

		fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				//convert data to string
				const dataString = JSON.stringify(data);
				setReportType("Z Report");
				setTotalSales(data.totalsales);
				setEmployee(data.employee);
				setDateCreated(data.datecreated);
				setOrderID(data.orderid);
			}
			);
	};

	/**
	 * Create a new Z Report and update the state.
	 * @returns {void}
	 */
	function createZReport() {
		console.log("create Z report");
		const EMP_ID = localStorage.getItem("employeeId");

		const url = HOST + endpoints.createZReport;

		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({employeeid: EMP_ID})
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				setReportType("Z Report");
				loadZReports();
				setTotalSales(data.totalSales);
				setEmployee(data.employeeName);
				setDateCreated(data.date);
				setOrderID(data.orderID);
			}
			);
	};

	/**
	 * View the details of the logged-in user's X Report.
	 * @returns {void}
	 */
	async function viewXReport() {
		const EMP_ID = localStorage.getItem("employeeId");
		const url = HOST + endpoints.getXReport + "?employeeid=" + EMP_ID;
		console.log(url);
		fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				setReportType("X Report");
				setTotalSales(data.totalSales);
				setEmployee(data.employeeName);
				setDateCreated(data.date);
				setOrderID(data.orderID);
			}
			);
	};

	/**
	 * Navigate back to the reports window
	 * @returns {void}
	 */
	function navigateOrderPage() {
		navigate("/employee/reports");
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
									<path d="M14.09 22L5 12l9.09-10" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
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
								<p>Date Created: {dateCreated.split("T")[0]}</p>
								<p>Since Order ID: {orderID}</p>
								<p>Total Sales since last Z Report: ${totalSales}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</PageProtector>
	);
}

export default XZRep;