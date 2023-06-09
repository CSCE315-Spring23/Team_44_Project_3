import React, {useEffect, useState} from "react";

import '../../styles/employee.scss';

import DatabaseTablePane from "../../components/DatabaseTablePane";
import EmployeeNav from "../../components/EmployeeNav";
import Form from "../../components/Form";
import {endpoints} from "../../utils/apiEndpoints";
import {HOST} from "../../utils/host";
import PageProtector from "../../components/PageProtector";

/**
 * The Inventory component displays inventory information and allows employees to add, update and delete items.
 * @param {object} props - The props object.
 * @param {boolean} props.isManager - A boolean indicating whether the user is a manager or not.
 * @returns {JSX.Element} - The Inventory component JSX element.
 */
function Inventory(props) {
	const isManager = props.isManager;
	const [inventoryTable, setInventoryTable] = useState();

	const deleteInventoryFields = [
		{name: "itemID", label: "Item ID", type: "text", placeholder: "Item ID"},
	];

	/**
	 * Fetches inventory data from the server and updates the component state with it.
	 */
	useEffect(() => {
		getInventory();
	}, []);

	/**
	 * Fetches inventory data from the server and updates the component state with it.
	 * @async
	 */
	async function getInventory() {
		const url = HOST + endpoints.inventory;

		fetch(url, {
			method: "GET"
		})
			.then(response => {
				if (!response.ok) {
					throw new Error("Network response not OK");
				}
				return response.json();
			})
			.then(data => {
				const table = <DatabaseTablePane data={data} />;
				setInventoryTable(table);
			});
	};

	/**
	 * The form fields for updating an inventory item.
	 */
	const updateInventoryFields = [
		{name: "itemID", label: "Item ID", type: "text", placeholder: "Item ID"},
		{name: "newName", label: "New Name", type: "text", placeholder: "New Name"},
		{name: "newQuantity", label: "New Quantity", type: "text", placeholder: "New Quantity"},
		{name: "newThreshold", label: "New Threshold", type: "text", placeholder: "New Threshold"}
	];

	/**
	 * Handles updating an inventory item.
	 * @param {object} formState - The current form state.
	 */
	function handleUpdateInventory(formState) {
		const id = formState.itemID;
		const name = formState.newName;
		const quantity = formState.newQuantity;
		const threshold = formState.newThreshold;
		const url = HOST + endpoints.updateInventoryItem;

		fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				id: id,
				name: name,
				quantity: quantity,
				threshold: threshold
			})
		})
			.then(response => {
				if (!response.ok) {
					throw new Error("Network response not OK");
				}
				return response.json();
			})
			.then(data => {
				console.log(data);
				getInventory();
			}
			);

	};

	/**
	 * The form fields for adding an inventory item.
	 */
	const addInventoryFields = [
		{name: "itemName", label: "Item Name", type: "text", placeholder: "Item Name"},
		{name: "itemQuantity", label: "Item Quantity", type: "text", placeholder: "Item Quantity"},
		{name: "itemThreshold", label: "Item Threshold", type: "text", placeholder: "Item Threshold"}
	];

	/**
	 * Handles adding inventory item to the database
	 * @param {object} formState - Object containing the form data for the new inventory item
	 */
	function handleAddInventory(formState) {
		const name = formState.itemName;
		const quantity = formState.itemQuantity;
		const threshold = formState.itemThreshold;
		const url = HOST + endpoints.insertInventoryItem;

		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name: name,
				quantity: quantity,
				threshold: threshold
			})
		})
			.then(response => {
				if (!response.ok) {
					throw new Error("Network response not OK");
				}
				return response.json();
			})
			.then(data => {
				console.log(data);
				getInventory();
			}
			);
	};

	/**
	 * Handles deleting inventory item from the database
	 * @param {object} formState - Object containing the form data for the item to be deleted
	 */
	const handleDeleteInventory = (formState) => {
		const id = formState.itemID;
		const url = HOST + endpoints.deleteInventoryItem;

		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				id: id
			})
		})
			.then(response => {
				if (!response.ok) {
					throw new Error("Network response not OK");
				}
				return response.json();
			})
			.then(data => {
				console.log(data);
				getInventory();
			}
			);
	};

	return (
		<PageProtector>
			<div className="empInventoryPage">
				<EmployeeNav isManager={isManager} current={"inventory"} />
				<div id="inventoryTableDiv">
					<h2>Inventory</h2>
					{inventoryTable}
				</div>
				<div id="inventoryFormsDiv">
					<div id="updateInventoryFormDiv">
						<h4>Update Inventory Item</h4>
						<Form fields={updateInventoryFields} onSubmit={handleUpdateInventory} />
					</div>
					<hr style={{marginRight: "5px"}}></hr>
					<div id="addInventoryFormDiv">
						<h4>Add Inventory Item</h4>
						<Form fields={addInventoryFields} onSubmit={handleAddInventory} />
					</div>
					<hr style={{marginRight: "5px"}}></hr>
					<div id="deleteInventoryFormDiv">
						<h4>Delete Inventory Item</h4>
						<Form fields={deleteInventoryFields} onSubmit={handleDeleteInventory} />
					</div>
				</div>
			</div>
		</PageProtector>
	);
}

export default Inventory;
