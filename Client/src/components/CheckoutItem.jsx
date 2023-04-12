import React from "react";

export default function CheckoutItem(props){

    const handleClick = () => {
        props.onClick(props.itemName);
    }

    return(
        <div className="checkoutItem">
            <p className="checkoutItemLeft">{props.itemName}: x{props.count}</p>
            <div className="checkoutItemRight">
                <p>${props.price}</p>
                <button className="checkoutItemButton" onClick={handleClick}>-</button>
            </div>
        </div>
    );
}