/**
 * React functional component that displays a menu database table and provides CRUD functionality
 * for menu items.
 * @module Menu
 */
import React, {useEffect, useState} from "react";

import DatabaseTablePane from "../../components/DatabaseTablePane";
import EmployeeNav from "../../components/EmployeeNav";
import Form from "../../components/Form";
import '../../styles/employee.scss';
import {endpoints} from "../../utils/apiEndpoints";
import {HOST} from "../../utils/host";
import PageProtector from "../../components/PageProtector";

/**
 * @typedef {Object} Props
 * @property {boolean} isManager - Indicates if the user is a manager.
 */

/**
 * React functional component that displays a menu database table and provides CRUD functionality
 * for menu items.
 * @param {Props} props - Props for the component.
 * @returns {JSX.Element} The JSX element for the component.
 */
function Menu(props) {
	const isManager = props.isManager;
	const [menuTable, setMenuTable] = useState();

	/**
	 * Fields for deleting a menu item.
	 * @type {Object[]}
	 */
	const deleteMenuItemFields = [
		{name: "itemID", label: "Item ID", type: "text", placeholder: "Item ID"}
	];

	/**
	 * Fields for adding a menu item.
	 * @type {Object[]}
	 */
	const addMenuItemFields = [
		{name: "name", label: "Name", type: "text", placeholder: "Name"},
		{name: "cost", label: "Cost", type: "text", placeholder: "Cost"},
		{name: "recipe", label: "Recipe", type: "text", placeholder: "Recipe Items IDs"},
		// { name: "category", label: "Category", type: "text", placeholder: "Category"}
	];

	/**
	 * Fields for updating a menu item.
	 * @type {Object[]}
	 */
	const updateMenuFields = [
		{name: "itemID", label: "Item ID", type: "text", placeholder: "Item ID"},
		{name: "newName", label: "New Name", type: "text", placeholder: "New Name"},
		{name: "newCost", label: "New Cost", type: "text", placeholder: "New Cost"},
		{name: "newRecipe", label: "New Recipe", type: "text", placeholder: "New Recipe Items IDs"},
		// { name: "newCategory", label: "New Category", type: "text", placeholder: "New Category"}
	];

	/**
	 * Retrieves the menu data from the API and sets the state of the menu table.
	 */
	useEffect(() => {
		getMenu();
	}, []);

	/**
	 * Retrieves the menu data from the API and sets the state of the menu table.
	 */
	async function getMenu() {
		const url = HOST + endpoints.menu;

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
				setMenuTable(table);
			});
	};

	/**
	 * Handles updating a menu item.
	 * @param {Object} formState - The form state containing the updated menu item information.
	 */
	function handleUpdateMenu(formState) {
		const id = formState.itemID;
		const name = formState.newName;
		const cost = formState.newCost;
		const recipe = parseRecipe(formState.newRecipe);
		// const category = formState.newCategory;
		console.log(id, name, cost, recipe);

		const url = HOST + endpoints.updateMenuItem;

		fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				id: id,
				name: name,
				cost: cost,
				recipeItems: recipe,
				// category: category
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
				getMenu();
			}
			);
	};

	/**
	 * Handles adding a new menu item to the database
	 * @param {Object} formState - An object containing the state of the form with the new menu item information
	 * @param {string} formState.name - The name of the new menu item
	 * @param {number} formState.cost - The cost of the new menu item
	 * @param {string} formState.recipe - The recipe for the new menu item
	 */
	function handleAddMenuItem(formState) {
		const name = formState.name;
		const cost = Number(formState.cost);
		const recipe = parseRecipe(formState.recipe);
		// const category = formState.category;
		console.log(name, cost, recipe);
		const url = HOST + endpoints.insertMenuItem;

		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name: name,
				cost: cost,
				recipeItems: recipe,
				// category: category
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
				getMenu();
			}
			);
	};

	/**
	 * Handles deleting a menu item from the database
	 * @param {Object} formState - An object containing the state of the form with the item ID to be deleted
	 * @param {string} formState.itemID - The ID of the item to be deleted
	 */
	function handleDeleteMenuItem(formState) {
		const id = formState.itemID;
		const url = HOST + endpoints.deleteMenuItem;

		fetch(url, {
			method: "DELETE",
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
				getMenu();
			}
			);
	};

	/**
	 * Parses a recipe string into an array of objects containing an ID property.
	 * @param {string} recipe - The recipe string to parse.
	 * @returns {Object[]} An array of objects containing an ID property.
	 */
	function parseRecipe(recipe) {
		const recipeArray = recipe.split(",");
		const recipeJson = [];
		for (let i = 0; i < recipeArray.length; ++i) {
			if (recipeArray[i].length == 0)
				continue;
			recipeJson.push({id: Number(recipeArray[i])});
		}
		return recipeJson;
	};

	return (
		<PageProtector>
			<div className="empMenuPage">
				<EmployeeNav isManager={isManager} current={"menu"} />
				<div id="menuTableDiv">
					<h2>Menu</h2>
					{menuTable}
				</div>
				<div id="menuFormsDiv">
					<div id="updateMenuFormDiv">
						<h4>Update Menu Item</h4>
						<Form fields={updateMenuFields} onSubmit={handleUpdateMenu} />
					</div>
					<hr style={{marginRight: "5px"}}></hr>
					<div id="addMenuItemFormDiv">
						<h4>Add Menu Item</h4>
						<Form fields={addMenuItemFields} onSubmit={handleAddMenuItem} />
					</div>
					<hr style={{marginRight: "5px"}}></hr>
					<div id="deleteMenuItemFormDiv">
						<h4>Delete Menu Item</h4>
						<Form fields={deleteMenuItemFields} onSubmit={handleDeleteMenuItem} />
					</div>
				</div>
			</div>
		</PageProtector>
	);
}

export default Menu;
