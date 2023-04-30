import React, { useState } from "react";
import PopUp from "./PopUp";

/**
 * A component that renders a button for a specific order item and displays a popup with additional item details when clicked.
 * @param {Object} props - The props object that contains the item object and addToCart function.
 * @param {Object} props.item - An object that contains information about the item.
 * @param {Function} props.addToCart - A function that adds the item to the cart.
 * @returns {JSX.Element} - A button element for the item that displays a popup when clicked.
 */
function OrderItemButton(props) {
    const item = props.item;
    const itemName = item.name;
    const addToCart = props.addToCart;
    const colors = {
        "entree": "#dd0031",
        "side" : "#EEEE9B",
        "beverage" : "#87CEEB",
        "treat" : "#d7a1f9",
        "salad" : "#98FB98",
        "sauce" : "#FFA500"
    }
    let color = "white";
    if(colors[item["category"]] != null){
        color = colors[item["category"]];
    }
    console.log(color);

    const [popUp, setPopUp] = useState(false);

    /**
     * A function that sets the popup state to true.
     */
    function openPopUp() {
        setPopUp(true);
    }

    return (
        <div>
            <button style={{backgroundColor : color}} onClick={openPopUp} className="orderItemBtn">
                {itemName ? itemName : "No Item"}
            </button>
            {popUp && <PopUp item={item} setPopUp={setPopUp} addToCart={addToCart} />}
        </div>
    );
}

export default OrderItemButton;