import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

export default function CheckoutPanel(props) {
    return (
        <div id="checkoutPanel">
            <div id="checkoutOrderItems"></div>
            <div id="checkoutButtonDiv">
                <Link  id='checkoutBtn'>Checkout</Link>
            </div>
        </div>
    );
}