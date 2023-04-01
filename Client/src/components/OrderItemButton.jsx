import React from "react";

export default function OrderItemButton(props){
    const item = props.item;
    const itemName = item.name;
    const addToCart = props.addToCart;

    const handleClick = () =>{
        addToCart(item);
    }

    return(
        <button onClick={handleClick} className="orderItemBtn">
            {itemName ?  itemName : "No Item"}
        </button>
    );
}