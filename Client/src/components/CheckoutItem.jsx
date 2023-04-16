import React from "react";

export default function CheckoutItem(props) {

    const handleClick = () => {
        props.onClick(props.cartID);
    }

    return (
        <div className="checkoutItem">
            <div className="checkoutItemInfo">
                <div className="checkoutItemLeft">
                    {props.itemName}: x{props.count}

                </div>
                <div className="checkoutItemRight">
                    <p style={{margin:0}}>${props.price}</p>
                    <button className="checkoutItemButton" onClick={handleClick}>-</button>
                </div>
            </div>
            {props.excluded &&
                <div className="checkoutItemEx">
                    <ul style={{margin:0}}>
                        {props.excluded && props.excluded.map((item, index) => {
                            return <li key={index}>no {item.name}</li>
                        })}
                    </ul>
                </div>}

        </div>
    );
}