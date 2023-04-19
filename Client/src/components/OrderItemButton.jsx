import React, {useState} from "react";
import PopUp from "./PopUp";

export default function OrderItemButton(props) {
    const item = props.item;
    const itemName = item.name;
    const addToCart = props.addToCart;

    const [popUp, setPopUp] = useState(false);

    const openPopUp = () => {
        // addToCart(item);
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