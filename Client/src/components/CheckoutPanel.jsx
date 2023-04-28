import React, {useState} from "react";
import {endpoints} from "../utils/apiEndpoints";
import {HOST} from "../utils/host";
import CheckoutItem from "./CheckoutItem";

/**
 * Represents the checkout panel component. 
 * @param {object} props - The props object containing the cart.
 * @returns {JSX.Element} The checkout panel component.
 */
function CheckoutPanel(props) {
    const name = localStorage.getItem("custName");
    const [custName, setCustName] = useState(name ? name : "");
    const {cart} = props;
    const items = Object.keys(cart.items);
    console.log(cart);

    /**
     * Sends order to server when checkout button is clicked.
     */
    function checkoutBtnClicked() {
        const EMP_ID = localStorage.getItem("employeeId");
        console.log(EMP_ID);
        /*
            convert items to an array of form:
            items: [ {"id": 1, "quantity": 2}, ... ] 
        */
        let itemsArr = [];
        for (let cartID in cart.items) {
            const id = cart.items[cartID][3];
            const count = cart.items[cartID][1];
            const excluded = cart.items[cartID][4];

            let excludedIDs = [];
            for (let i = 0; i < excluded.length; i++) {
                excludedIDs.push(excluded[i].id);
            }

            const curItem = {"id": id, "quantity": count, "excluded": excludedIDs};
            itemsArr.push(curItem);
        }
        //build the order object to be sent in POST
        /* 
            {
                customerName: "John Doe",
                totalCost: "12.34",
                employeeID: 1,
                items: [ {"id": 1, "quantity": 2, "excluded": [15,27...]}, ... ]
            }
        */
        const order = {
            customerName: custName,
            totalCost: cart.total[0].toString(),
            employeeID: EMP_ID,
            items: itemsArr
        };

        // if customer name is empty or items is empty, don"t submit order
        if (order.customerName === "" || order.items.length === 0) {
            console.log("order not submitted: customer name or items empty");
            return;
        }

        const url = HOST + endpoints.postOrder;

        console.log(order);
        fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
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
        localStorage.setItem("custName", "");

    }

    /**
     * Updates customer name in local storage and state.
     * @param {object} comp - The component object.
     */
    function handleNameChanged(comp) {
        localStorage.setItem("custName", comp.target.value);
        setCustName(comp.target.value);
    }

    return (
        <div id="checkoutPanel">
            <div id="checkoutOrderItems">
                {items.map(cartID => (
                    <CheckoutItem
                        itemName={cart.items[cartID][0]}
                        count={cart.items[cartID][1]}
                        price={cart.items[cartID][2]}
                        onClick={props.removeFromCart}
                        cartID={cartID}
                        excluded={cart.items[cartID][4]}>
                    </CheckoutItem>
                ))}
            </div>
            <div id="checkoutButtonDiv">
                <p>Total: ${cart.total[0].toFixed(2)}</p>
                <input type="text" value={custName} onChange={handleNameChanged} placeholder="Customer Name" />
                <button onClick={e => checkoutBtnClicked()} id="checkoutBtn">Checkout</button>
            </div>
        </div>
    );
}

export default CheckoutPanel;
