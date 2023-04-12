import React, { useState, useEffect, useContext } from "react";
import { Link, json } from "react-router-dom";
import CheckoutItem from "./CheckoutItem";
import { HOST } from "../utils/host";
import { endpoints } from "../utils/apiEndpoints";

export default function CheckoutPanel(props) {
    const name = localStorage.getItem('custName');
    const [custName, setCustName] = useState(name ? name : "");
    const { cart } = props;
    const items = Object.keys(cart.items);

    //sends order to server when checkout button clicked
    const checkoutBtnClicked = () => {
        const EMP_ID = localStorage.getItem('empID');
        console.log(EMP_ID);
        /*
            convert items to an array of form:
            items: [ {"id": 1, "quantity": 2}, ... ] 
        */
        let itemsArr = [];
        for (let itemName in cart.items) {
            const id = cart.items[itemName][2];
            const count = cart.items[itemName][0];
            const curItem = { "id": id, "quantity": count };
            itemsArr.push(curItem);
        }
        //build the order object to be sent in POST
        /* 
            {
                customerName: "John Doe",
                totalCost: "12.34",
                employeeID: 1,
                items: [ {"id": 1, "quantity": 2}, ... ]
            }
        */
        const order = {
            customerName: custName,
            totalCost: cart.total[0].toString(),
            employeeID: EMP_ID,
            items: itemsArr
        };

        const url = HOST + endpoints.postOrder;

        console.log(order);
        fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order)
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                console.log(data);
            });
        props.emptyCart();

        console.log("order Submitted");
        setCustName("");
        localStorage.setItem('custName', "");

    }


    //change customer name
    const handleNameChanged = (comp) => {
        localStorage.setItem('custName', comp.target.value);
        setCustName(comp.target.value);
    }

    return (
        <div id="checkoutPanel">
            <div id="checkoutOrderItems">
                {items.map(item => (
                    <CheckoutItem itemName={item} count={cart.items[item][0]} price={cart.items[item][1]} onClick={props.removeFromCart}></CheckoutItem>
                ))}
            </div>
            <div id="checkoutButtonDiv">
                <p>Total: ${cart.total[0].toFixed(2)}</p>
                <input type="text" value={custName} onChange={handleNameChanged} placeholder="Customer Name" />
                <button onClick={e => checkoutBtnClicked()} id='checkoutBtn'>Checkout</button>
            </div>
        </div>
    );
}