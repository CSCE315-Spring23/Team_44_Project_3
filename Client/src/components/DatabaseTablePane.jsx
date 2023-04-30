import React, {useEffect, useState} from "react";

/**
 * React functional component that displays a database table.
 * @param {Object} props - Component props.
 * @param {Array} props.data - An array of objects representing rows in the table.
 * @param {Function} props.handleOnClick - Function to be called when a row in the table is clicked.
 * @returns {JSX.Element} - JSX table element representing the database table.
 */
function DatabaseTablePane(props) {
	const headers = Object.keys(props.data[0]);
	const formattedHeaders = [];
	// format headers
	for (let i = 0; i < headers.length; i++) {
		// remove underscores
		let formattedHeader = headers[i].replace(/_/g, " ");
		// capitalize all words
		formattedHeader = formattedHeader.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
		formattedHeaders.push(formattedHeader);
	}

	/**
	 * Calls the handleOnClick function passed in props if it exists, passing the row id as a parameter.
	 * If handleOnClick is not provided in props, logs an error message to the console.
	 * @param {number} id - The id of the clicked row.
	 * @returns {void}
	 */
	function handleOnClick(id) {
		if (props.handleOnClick)
			props.handleOnClick(id);
		else
			return;
	};

	return (
		<table className="databaseTable">
			<thead>
				<tr>
					{formattedHeaders.map((header) => (
						<th key={header}>{header}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{props.data.map((row, index) => (
					<tr
						key={row.id}
						onClick={() => handleOnClick(row.id)}
						style={{backgroundColor: index % 2 == 0 ? "#c0c0c0" : "#ffffff"}}>
						{headers.map((header) => (
							<td key={header}>{row[header]}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default DatabaseTablePane;
