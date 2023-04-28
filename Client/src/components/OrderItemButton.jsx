/**
 * A component that renders a button for a specific order item and displays a popup with additional item details when clicked.
 * @param {Object} props - The props object that contains the item object and addToCart function.
 * @param {Object} props.item - An object that contains information about the item.
 * @param {Function} props.addToCart - A function that adds the item to the cart.
 * @returns {JSX.Element} - A button element for the item that displays a popup when clicked.
 */
import React, {useState} from "react";
import PopUp from "./PopUp";

function OrderItemButton(props) {
    const item = props.item;
    const itemName = item.name;
    const addToCart = props.addToCart;

    const [popUp, setPopUp] = useState(false);

    /**
     * A function that sets the popup state to true.
     */
    function openPopUp() {
        setPopUp(true);
    }

    return (
        <div>
            <button onClick={openPopUp} className="orderItemBtn">
                {itemName ? itemName : "No Item"}
            </button>
            {popUp && <PopUp item={item} setPopUp={setPopUp} addToCart={addToCart} />}
        </div>
    );
}

export default OrderItemButton;