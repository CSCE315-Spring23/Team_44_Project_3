import React, { useEffect, useState } from "react";
import OrderItemButton from "./OrderItemButton";
import { endpoints } from "../utils/apiEndpoints";
import { HOST } from "../utils/host";

export default function OrderItemPane() {
    //set a react state to contain the json of menu items
    const [menuButtons, setMenuButtons] = useState(null);
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
                    <OrderItemButton key={element.id} itemName={element["name"]} />
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