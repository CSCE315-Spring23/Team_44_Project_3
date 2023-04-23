import React, {useEffect, useState} from "react";

import {endpoints} from "../utils/apiEndpoints";
import {HOST} from "../utils/host";
import PopUpRow from "./PopUpRow";

import "../styles/employee.scss";

export default function PopUp(props) {
    const item = props.item
    const [recipeItems, setRecipeItems] = useState(null);
    const [excludeItems, setExcludeItems] = useState([]);
    const [notes, setNotes] = useState("");

    useEffect(() => {
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
                    console.log(data)
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
        }

        const multiItem = async () => {
            const url = HOST + endpoints.getRecipe + "?id=" + item.ids[0];
            singleItem(url);
        }

        if (item.ids) {
            multiItem();
        }
        else {
            const url = HOST + endpoints.getRecipe + "?id=" + item.id;
            singleItem(url);
        }

    }, []);

    const handleSubmitClick = () => {
        console.log(notes)
        // add notes to excludeItems
        console.log(excludeItems);
        if (notes !== "")
            excludeItems.push(notes);
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
                <button className="PopUpButton addToCart" onClick={handleSubmitClick}>Add to Cart</button>
            </div>
        </div>
    );
}