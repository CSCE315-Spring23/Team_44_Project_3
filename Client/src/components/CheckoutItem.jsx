import React from "react";

export default function CheckoutItem(props){
    return(
        <div className="checkoutItem">
            <p>{props.itemName}</p>
            <p>{props.price} X{props.count}</p>
        </div>
    );
}