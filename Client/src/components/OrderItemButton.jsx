import React from "react";

export default function OrderItemButton(props){
    const itemName = props.itemName;
    return(
        <button className="orderItemBtn">
            {itemName ? itemName : "No Item"}
        </button>
    );
}