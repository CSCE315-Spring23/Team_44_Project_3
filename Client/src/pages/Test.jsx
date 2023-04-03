import React, { useState, useEffect } from 'react';


const Test = () => {

    const add = () => {
        console.log("added new inventory item");

        fetch('http://localhost:3001/api/inventory/insertinventoryitem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                "name": "new item",
                "quantity": 11
            })
        })
    }

    const del = () => {
        console.log("deleted inventory item");

        fetch('http://localhost:3001/api/inventory/deleteinventoryitem', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                "id": 83
                })
        })
    }

    const update = () => {
        console.log("updated inventory item");

        fetch('http://localhost:3001/api/inventory/updateinventoryitem', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                "id": 84,
                "quantity": 100
            })
        })
    }

    return (
        <div>
            <h1>Test</h1>
            <button onClick={add}>add new inventory item</button>
            <button onClick={del}>delete inventory item</button>
            <button onClick={update}>update inventory item</button>
        </div>
    )
}

export default Test;