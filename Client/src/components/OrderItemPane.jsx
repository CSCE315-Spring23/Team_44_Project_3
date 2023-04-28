import React, {useEffect, useState} from "react";
import {endpoints} from "../utils/apiEndpoints";
import {HOST} from "../utils/host";
import OrderItemButton from "./OrderItemButton";

/**
 * React component that displays a list of menu items as buttons to order from
 * @param {object} props - Component props
 * @param {function} props.addToCart - Function to add an item to the cart
 * @returns {JSX.Element} - JSX element with the list of menu item buttons
 */
function OrderItemPane(props) {
    //set a react state to contain the json of menu items
    const [menuButtons, setMenuButtons] = useState(null);

    const addToCart = props.addToCart;

    /**
     * Effect hook that fetches the menu items from the API
     */
    useEffect(() => {
        setMenuButtons(null);
        const url = HOST + endpoints.getMenu;
        fetch(url, {
            method: "GET"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network Response Not OK");
                }
                return response.json();
            })
            .then(data => {
                //create the map of all the menu buttons to render
                const menBtns = data.map((element) =>
                    <OrderItemButton key={element.id} item={element} addToCart={addToCart} />
                );
                setMenuButtons(menBtns);
            })
            .catch(error => {
                console.error("Could not fetch menu items from " + url);
            });

    }, []);

    return (
        <div className="orderItemPane">
            {menuButtons}
        </div>
    );
}

export default OrderItemPane;