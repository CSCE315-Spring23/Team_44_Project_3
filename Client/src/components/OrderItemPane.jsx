import React, {useEffect, useState} from "react";
import {endpoints} from "../utils/apiEndpoints";
import {HOST} from "../utils/host";
import OrderItemButton from "./OrderItemButton";

export default function OrderItemPane(props) {
    //set a react state to contain the json of menu items
    const [menuButtons, setMenuButtons] = useState(null);

    const addToCart = props.addToCart;
    //fetch the menu items from the api
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