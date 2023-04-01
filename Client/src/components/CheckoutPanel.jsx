import React, { useState, useEffect, useContext } from "react";
import { Link, json } from "react-router-dom";

export default function CheckoutPanel(props) {
    const { cart } = props;
    useEffect(() => {
        console.log("cart Update");
    }, [cart]);
    console.log(cart);

    return (
        <div id="checkoutPanel">
            <div id="checkoutOrderItems">
                <p>{JSON.stringify(cart)}</p>
            </div>
            <div id="checkoutButtonDiv">
                <Link id='checkoutBtn'>Checkout</Link>
            </div>
        </div>
    );
}