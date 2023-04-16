import React, {useEffect, useState} from "react";

import {endpoints} from "../utils/apiEndpoints";
import {HOST} from "../utils/host";
import PopUpRow from "./PopUpRow";


import "../styles/employee.css";


export default function PopUp(props) {
    const item = props.item
    const [recipeItems, setRecipeItems] = useState(null);
    const [excludeItems, setExcludeItems] = useState([]);

    useEffect(() => {

        const url = HOST + endpoints.getRecipe + "?id=" + item.id;

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

                console.log(data)
                //if the recipe is empty, then just return the item
                if (data.length === 0) {
                    handleSubmitClick();
                    return;
                }
                setRecipeItems(data);
            })
            .catch(error => {
                console.error("Could not fetch recipe items from " + url);
            });

    }, []);

    const handleSubmitClick = () => {
        console.log(excludeItems);
        props.addToCart(item, excludeItems);
        props.setPopUp(false);
    }

    const handleExcludeClick = (item) => {
        // if item not in excludeItems, add it
        if (!excludeItems.includes(item)) {
            setExcludeItems([...excludeItems, item]);
        }
        // if item is in excludeItems, remove it
        else {
            setExcludeItems(excludeItems.filter((element) => element !== item));
        }
    }

    return (
        <div className="PopUp">
            YOU GOT POPPED, {props.item.name}
            {recipeItems && recipeItems.map((element) =>
                <PopUpRow inventoryitem={element} handleExcludeClick={handleExcludeClick} />
            )}
            <button className="PopUpButton" onClick={() => props.setPopUp(false)}>Close</button>
            <button className="PopUpButton" onClick={handleSubmitClick}>Add to Cart</button>
        </div>
    );
}