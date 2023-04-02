import React, { useState, useEffect } from "react";

import '../../styles/employee.css'

import EmployeeNav from "../../components/EmployeeNav";
import DatabaseTablePane from "../../components/DatabaseTablePane";
import Form from "../../components/Form";
import { endpoints } from "../../utils/apiEndpoints";
import { HOST } from "../../utils/host";


export default function Inventory(props) {
    const isManager = props.isManager;

    const [inventoryTable, setInventoryTable] = useState();


    useEffect(() => {
        getInventory();
    }, []);

    const getInventory = async () => {
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
    }

    const updateInventoryFields = [
        { name: "itemID", label: "Item ID", type: "text", placeholder: "Item ID" },
        { name: "newQuantity", label: "New Quantity", type: "text", placeholder: "New Quantity"},
    ];

    const handleUpdateInventory = (formState) => {
        console.log(formState);
    }

    const addInventoryFields = [
        { name: "itemName", label: "Item Name", type: "text", placeholder: "Item Name" },
        { name: "itemQuantity", label: "Item Quantity", type: "text", placeholder: "Item Quantity"},
    ];

    const handleAddInventory = (formState) => {
        console.log(formState);
        const name = formState.itemName;
        const quantity = formState.itemQuantity;
        console.log(name, quantity);
        const url = HOST + endpoints.insertInventoryItem;

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                quantity: quantity
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
    }

    const deleteInventoryFields = [
        { name: "itemID", label: "Item ID", type: "text", placeholder: "Item ID" },
    ];

    const handleDeleteInventory = (formState) => {
        console.log(formState);
    }
    return (
        <div className="empInventoryPage">
            <EmployeeNav isManager={isManager}></EmployeeNav>
            <div id="inventoryDiv">
                <h2>Inventory</h2>
                {inventoryTable}
            </div>
            <div id="inventoryFormsDiv">
                <div id = "updateInventoryFormDiv">
                    <h4>Update Inventory</h4>
                    <Form fields={updateInventoryFields} onSubmit={handleUpdateInventory} />
                </div>
                <hr style={{marginRight: "5px"}}></hr>
                <div id = "addInventoryFormDiv">
                    <h4>Add Inventory</h4>
                    <Form fields={addInventoryFields} onSubmit={handleAddInventory} />
                </div>
                <hr style={{marginRight: "5px"}}></hr>
                <div id = "deleteInventoryFormDiv">
                    <h4>Delete Inventory</h4>
                    <Form fields={deleteInventoryFields} onSubmit={handleDeleteInventory} />
                </div>
            </div>
        </div>
    );
}