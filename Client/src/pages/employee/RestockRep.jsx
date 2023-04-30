import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import DatabaseTablePane from "../../components/DatabaseTablePane";
import EmployeeNav from "../../components/EmployeeNav";
import '../../styles/employee.scss';
import {endpoints} from "../../utils/apiEndpoints";
import {HOST} from "../../utils/host";
import PageProtector from "../../components/PageProtector";

/**
 * @desc React functional component that renders the restock report page for employees.
 * @param {Object} props - Component props
 * @param {Boolean} props.isManager - A boolean value indicating if the user is a manager
 * @return {JSX.Element} JSX element representing the restock report page
 */
function RestockRep(props) {
	const isManager = props.isManager;

	// State variable to hold the restock data
	const [restockTable, setRestockTable] = useState([]);

	// Fetch restock data from server when component mounts
	useEffect(() => {
		const url = HOST + endpoints.getRestock;

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
				const table = <DatabaseTablePane data={data} />;
				setRestockTable(table);
			});
	}, []);

	const navigate = useNavigate();

	// Function to navigate to the order page
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
							{/* Button to navigate back to the menu category list */}
							<button title="Back to menu category list" data-cy="SubNavBack" className="backButton" onClick={navigateOrderPage}>
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M14.09 22L5 12l9.09-10" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
									</path>
								</svg>
								<div aria-hidden="true" className="backText">
									Back
								</div>
							</button>
						</div>
						<h2>Restock Report</h2>
					</div>
					<div className="repBody">
						<div className="restockRepTable">
							{/* Render restock data in a DatabaseTablePane component */}
							{restockTable}
						</div>
					</div>
				</div>
			</div>
		</PageProtector>
	);
}

export default RestockRep;
