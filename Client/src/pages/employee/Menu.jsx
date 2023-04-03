import React, { useState, useEffect } from "react";

import '../../styles/employee.css'
import EmployeeNav from "../../components/EmployeeNav";
import DatabaseTablePane from "../../components/DatabaseTablePane";
import Form from "../../components/Form";
import { endpoints } from "../../utils/apiEndpoints";
import { HOST } from "../../utils/host";

export default function Menu(props){
    const isManager = props.isManager;

    const [menuTable, setMenuTable] = useState();

    useEffect(() => {
        getMenu();
    }, []);

    const getMenu = async () => {
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
    }

    const updateMenuFields = [
        { name: "itemID", label: "Item ID", type: "text", placeholder: "Item ID" },
        { name: "newName", label: "New Name", type: "text", placeholder: "New Name"},
        { name: "newCost", label: "New Cost", type: "text", placeholder: "New Cost"},
        { name: "newRecipe", label: "New Recipe", type: "text", placeholder: "New Recipe Items IDs"},
        // { name: "newCategory", label: "New Category", type: "text", placeholder: "New Category"}
    ];

    const handleUpdateMenu = (formState) => {
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
    }


    const addMenuItemFields = [
        { name: "name", label: "Name", type: "text", placeholder: "Name" },
        { name: "cost", label: "Cost", type: "text", placeholder: "Cost"},
        { name: "recipe", label: "Recipe", type: "text", placeholder: "Recipe Items IDs"},
        // { name: "category", label: "Category", type: "text", placeholder: "Category"}
    ];

    const handleAddMenuItem = (formState) => {
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
    }

    const deleteMenuItemFields = [
        { name: "itemID", label: "Item ID", type: "text", placeholder: "Item ID" }
    ];

    const handleDeleteMenuItem = (formState) => {
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
    }
    //parse recipe string into json array
    const parseRecipe = (recipe) => {
        const recipeArray = recipe.split(",");
        const recipeJson = [];
        for (let i = 0; i < recipeArray.length; i++) {
            // exclud empty string
            if (recipeArray[i] === "") {
                continue;
            }
            recipeJson.push({id: Number(recipeArray[i])});
        }
        return recipeJson;
    }

    return (
        <div className="empMenuPage">
            <EmployeeNav isManager={isManager} />
            <div id="menuTableDiv">
                <h2>Menu</h2>
                {menuTable}
            </div>
            <div id="menuFormsDiv">
                <div id = "updateMenuFormDiv">
                    <h4>Update Menu Item</h4>
                    <Form fields={updateMenuFields} onSubmit={handleUpdateMenu} />
                </div>
                <hr style={{marginRight: "5px"}}></hr>
                <div id = "addMenuItemFormDiv">
                    <h4>Add Menu Item</h4>
                    <Form fields={addMenuItemFields} onSubmit={handleAddMenuItem} />
                </div>
                <hr style={{marginRight: "5px"}}></hr>
                <div id = "deleteMenuItemFormDiv">
                    <h4>Delete Menu Item</h4>
                    <Form fields={deleteMenuItemFields} onSubmit={handleDeleteMenuItem} />
                </div>
            </div>
        </div>
    );
}