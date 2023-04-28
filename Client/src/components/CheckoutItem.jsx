/**
 * A functional component to display an item in the checkout list.
 * @param {Object} props - The component's input props.
 * @param {string} props.itemName - The name of the item to be displayed.
 * @param {number} props.count - The count of the item to be displayed.
 * @param {number} props.price - The price of the item to be displayed.
 * @param {boolean} [props.excluded=false] - Whether the item is excluded from the order.
 * @param {Object[]} props.excluded - An array of objects representing excluded items.
 * @param {string} props.excluded[].name - The name of the excluded item.
 * @param {Function} props.onClick - The function to handle click event on the item.
 * @param {string} props.cartID - The ID of the cart.
 * @returns {JSX.Element} - A component to display an item in the checkout list.
 */
import React from "react";

function CheckoutItem(props) {
    function handleClick() {
        props.onClick(props.cartID);
    }

    return (
        <div className="checkoutItem">
            <div className="checkoutItemInfo">
                <div className="checkoutItemLeft">
                    {props.itemName}: x{props.count}

                </div>
                <div className="checkoutItemRight">
                    <p style={{margin: 0}}>${props.price}</p>
                    <button className="checkoutItemButton" onClick={handleClick}>-</button>
                </div>
            </div>
            {props.excluded &&
                <div className="checkoutItemEx">
                    <ul style={{margin: 0}}>
                        {props.excluded && props.excluded.map((item, index) => {
                            if (item.name)
                                return <li key={index}>no {item.name}</li>;
                            if (index === props.excluded.length - 1) {
                                return <li key={index}>{item}</li>;
                            }
                        })}
                    </ul>
                </div>}
        </div>
    );
}

export default CheckoutItem;
