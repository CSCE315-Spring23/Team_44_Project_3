import React from "react";

export default function CustomerCheckOutItem(props) {

    const removeFromCart = () => {
        props.removeFromCart(props.cartID);
    }
    return (
        <div className="checkoutItem">
            <div className="checkoutItemInfo">
                <div className="checkoutItemLeft">
                    {props.itemName}: x{props.count}

                </div>
                <div className="checkoutItemRight">
                    <p style={{margin: 0}}>${props.price}</p>
                    <button className="checkoutItemButton" onClick={removeFromCart}>-</button>
                </div>
            </div>
            {props.excluded &&
                <div className="checkoutItemEx">
                    <ul style={{margin: 0}}>
                        {props.excluded && props.excluded.map((item, index) => {
                            if (item.name)
                                return <li key={index}>no {item.name}</li>
                            if (index === props.excluded.length - 1) {
                                return <li key={index}>{item}</li>
                            }
                        })}
                    </ul>
                </div>}

        </div>
    );
}