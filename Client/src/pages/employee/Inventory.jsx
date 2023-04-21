import React, {useEffect, useState} from "react";

import '../../styles/employee.scss';

import DatabaseTablePane from "../../components/DatabaseTablePane";
import EmployeeNav from "../../components/EmployeeNav";
import Form from "../../components/Form";
import {endpoints} from "../../utils/apiEndpoints";
import {HOST} from "../../utils/host";


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
        {name: "itemID", label: "Item ID", type: "text", placeholder: "Item ID"},
        {name: "newName", label: "New Name", type: "text", placeholder: "New Name"},
        {name: "newQuantity", label: "New Quantity", type: "text", placeholder: "New Quantity"},
        {name: "newThreshold", label: "New Threshold", type: "text", placeholder: "New Threshold"}
    ];

    const handleUpdateInventory = (formState) => {
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

    }

    const addInventoryFields = [
        {name: "itemName", label: "Item Name", type: "text", placeholder: "Item Name"},
        {name: "itemQuantity", label: "Item Quantity", type: "text", placeholder: "Item Quantity"},
        {name: "itemThreshold", label: "Item Threshold", type: "text", placeholder: "Item Threshold"}
    ];

    const handleAddInventory = (formState) => {
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
    }

    const deleteInventoryFields = [
        {name: "itemID", label: "Item ID", type: "text", placeholder: "Item ID"},
    ];

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
    }
    return (
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
    );
}