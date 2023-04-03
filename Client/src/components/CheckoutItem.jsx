import React from "react";

export default function CheckoutItem(props){
    return(
        <div className="checkoutItem">
            <p className="checkoutItem">{props.itemName}</p>
            <p className="checkoutItem">{props.price} X{props.count}</p>
        </div>
    );
}