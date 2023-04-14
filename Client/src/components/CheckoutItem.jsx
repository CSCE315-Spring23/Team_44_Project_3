import React from "react";

export default function CheckoutItem(props){

    const handleClick = () => {
        props.onClick(props.cartID);
    }

    return(
        <div className="checkoutItem">
            <p className="checkoutItemLeft">
                {props.itemName}: x{props.count}
                <ul>
                    {props.excluded && props.excluded.map((item, index) => {
                        return <li key={index}>no {item.name}</li>
                    })}
                </ul>
            </p>
            <div className="checkoutItemRight">
                <p>${props.price}</p>
                <button className="checkoutItemButton" onClick={handleClick}>-</button>
            </div>
        </div>
    );
}