import React from "react";

export default function CheckoutItem(props){
    return(
        <div className="checkoutItem">
            <p className="checkoutItemLeft">{props.itemName}: x{props.count}</p>
            <p className="checkoutItemRight">${props.price}</p>
        </div>
    );
}