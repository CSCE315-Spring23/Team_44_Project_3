import React, { useState, useEffect, useContext } from "react";
import { Link, json } from "react-router-dom";
import CheckoutItem from "./CheckoutItem";

export default function CheckoutPanel(props) {
    const { cart } = props;
    const items = Object.keys(cart.items);
    return (
        <div id="checkoutPanel">
            <div id="checkoutOrderItems">
                {items.map(item => (
                    <CheckoutItem itemName={item} count={cart.items[item][0]} price={cart.items[item][1]}></CheckoutItem>
                ))}
            </div>
            <div id="checkoutButtonDiv">
                <Link id='checkoutBtn'>Checkout</Link>
            </div>
        </div>
    );
}