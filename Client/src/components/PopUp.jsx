/**
 * React component for a pop-up window.
 * @param {Object} props - The props object.
 * @param {Object} props.item - The item object.
 * @param {Function} props.addToCart - The function to add an item to the cart.
 * @param {Function} props.setPopUp - The function to set the pop-up window's visibility.
 * @returns {JSX.Element} - The JSX element for the pop-up window.
 */
import React, {useEffect, useState} from "react";

import {endpoints} from "../utils/apiEndpoints";
import {HOST} from "../utils/host";
import PopUpRow from "./PopUpRow";

import "../styles/employee.scss";

function PopUp(props) {
    const item = props.item;
    const [recipeItems, setRecipeItems] = useState(null);
    const [excludeItems, setExcludeItems] = useState([]);
    const [notes, setNotes] = useState("");

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        /**
         * Function to fetch data for a single item.
         * @param {string} url - The URL to fetch the data from.
         */
        const singleItem = async (url) => {
            await fetch(url, {
                method: "GET"
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network Response Not OK");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    if (data.length > 0)
                        setRecipeItems(data);
                    else {
                        props.setPopUp(true);
                        return;
                    }
                })
                .catch(error => {
                    console.error("Could not fetch recipe items from " + url);
                });
        };

        /**
        * Function to fetch data for multiple items.
        */
        async function multiItem() {
            const url = HOST + endpoints.getRecipe + "?id=" + item.ids[0];
            singleItem(url);
        }

        if (item.ids) {
            multiItem();
        } else {
            const url = HOST + endpoints.getRecipe + "?id=" + item.id;
            singleItem(url);
        }

    }, []);

    /**
     * Function to handle a click on the "Add to Cart" button.
     */
    function handleSubmitClick() {
        // add notes to excludeItems
        if (notes.length == 0)
            excludeItems.push(notes);
        for (let i = 0; i < quantity; ++i)
            props.addToCart(item, excludeItems);
        props.setPopUp(false);
    };

    /**
     * Function to handle a click on an exclude button.
     * @param {string} item - The item to exclude.
     */
    function handleExcludeClick(item) {
        if (!excludeItems.includes(item))
            setExcludeItems([...excludeItems, item]);
        else
            setExcludeItems(excludeItems.filter((element) => element !== item));
    };

    /**
     * Function to add one to the quantity.
     */
    function addQuantity() {
        setQuantity(quantity + 1);
    };

    /**
     * Function to subtract one from the quantity.
     */
    function subtractQuantity() {
        if (quantity > 1)
            setQuantity(quantity - 1);
    };

    return (
        <div className="PopUp">
            <div className="PopUpTitle">
                Edit {props.item.name}
            </div>
            <div className="PopUpRows">
                {recipeItems && recipeItems.map((element) =>
                    <PopUpRow inventoryitem={element} handleExcludeClick={handleExcludeClick} />
                )}
            </div>
            <div className="PopUpButtons">
                <button className="PopUpButton close" onClick={() => props.setPopUp(false)}>Close</button>
                <input type="text" placeholder="Special Notes" className="PopUpNotes" onChange={(e) => setNotes(e.target.value)} />
                <div className="PopUpQuantity">
                    <button className="PopUpButtonSubtract" onClick={subtractQuantity}>-</button>
                    <div className="PopUpQuantityNumber">Quantity: {quantity}</div>
                    <button className="PopUpButtonAdd" onClick={addQuantity}>+</button>
                </div>
                <button className="PopUpButton addToCart" onClick={handleSubmitClick}>Add to Cart</button>
            </div>
        </div>
    );
}

export default PopUp;
