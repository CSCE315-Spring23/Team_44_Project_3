import React, { useEffect, useState } from "react";

import { useNavigate } from 'react-router-dom';
import DatabaseTablePane from "../../components/DatabaseTablePane";
import EmployeeNav from "../../components/EmployeeNav";
import '../../styles/employee.scss';
import { endpoints } from "../../utils/apiEndpoints";
import { HOST } from "../../utils/host";
import PageProtector from "../../components/PageProtector";



export default function RestockRep(props) {
	const isManager = props.isManager;

	const [restockTable, setRestockTable] = useState([]);

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
				const table = <DatabaseTablePane data={data} />
				setRestockTable(table);
			});
	}, []);

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
						<h2>Restock Report</h2>
					</div>
					<div className="repBody">
						<div className="restockRepTable">
							{restockTable}
						</div>
					</div>
				</div>
			</div>
		</PageProtector>
	);
}