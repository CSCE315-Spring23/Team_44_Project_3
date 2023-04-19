import React from "react";

export default function CustomerCheckOutItem(props) {

    return (
        <div>
            <span>{props.itemName}</span>
            <span> </span>
            <span>{props.count}</span>
            <span> </span>
            <span>{props.price}</span>
            <br />
        </div>
    );
}