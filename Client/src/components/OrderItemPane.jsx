import React, { useEffect, useState } from "react";
import OrderItemButton from "./OrderItemButton";
import { endpoints } from "../utils/apiEndpoints";
import { HOST } from "../utils/host";

export default function OrderItemPane(){
    //set a react state to contain the json of menu items
    const [menuItems, setMenuItems] = useState(null);

    //fetch the menu items from the api
    useEffect(() =>{
        setMenuItems(null);
        const url = HOST + endpoints.getMenu;
        fetch(url, {
            method: "GET"
        })
        .then(response => {
            if(!response.ok){
                throw new Error("Network Response Not OK");
            }
            return response.json();
        })
        .then(data => {
            setMenuItems(data);
            console.log(menuItems);
        })
        .catch(error => {
            console.error("Could not fetch menu items from " + url);
        });
        
    },[]);

    return(
        <div className="orderItemPane">
            <OrderItemButton itemName="Button1"></OrderItemButton>
        </div>
    );
}