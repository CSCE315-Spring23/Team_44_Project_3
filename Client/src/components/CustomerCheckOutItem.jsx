import React from "react";
/**
 * A React component that displays a single item in the checkout list for a customer.
 * @param {Object} props - The props object that contains the necessary information to render the component.
 * @param {string} props.itemName - The name of the item to display.
 * @param {number} props.count - The number of items to display.
 * @param {number} props.price - The price of the item to display.
 * @param {string} props.cartID - The unique identifier of the item in the cart.
 * @param {Array<Object>} props.excluded - An array of items that are excluded from the original item.
 * @param {Function} props.removeFromCart - A function to remove the item from the cart when clicked.
 * @returns {JSX.Element} - Returns the JSX element to render the component.
*/

function CustomerCheckOutItem(props) {

    /**
     * A function that is called when the remove button is clicked.
     * It removes the item from the cart by calling the 'removeFromCart' function passed in as a prop.
     */
    function removeFromCart() {
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

export default CustomerCheckOutItem;
