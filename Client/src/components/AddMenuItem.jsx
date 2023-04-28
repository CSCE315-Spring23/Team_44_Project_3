import React, {useEffect, useState} from "react";
import PopUp from "./PopUp";

/**
 * This function component renders a food category onto the CustomerOrder screen
 * @param {any} props - The props for the AddMenuItem component
 * @param {any} props.item - The item object that contains information about the menu item being added
 * @returns {any} A component to render a food category onto the CustomerOrder screen
 */
function AddMenuItem(props) {
    const [itemCost, setItemCost] = useState(0);
    const [popUp, setPopUp] = useState(false);
    const item = props.item;


    /*
        Format of Cart
        {
            total : [total cost],
            items : {cartID : [name, number, cost per, itemID, excluded items]},
        }

    */
    /**
     * This function adds the given menu item to the cart
     * @param {any} item - The item object that contains information about the menu item being added
     * @param {any} excludeItems - An array of items to exclude from the order
     * @returns {any}
     */
    function addToCart(item, excludeItems) {
        console.log("item: ", item, "excludeItems: ", excludeItems);
        const cart = JSON.parse(localStorage.getItem("curOrder")) || {total: [0], items: {}};
		let cartID = Object.keys(cart.items).length > 0 ? parseInt(Object.keys(cart.items)[Object.keys(cart.items).length-1]) + 1 : 0;
        console.log(cartID);
        let newCart = {...cart};

        let numberOfItems = localStorage.getItem("numItems");
        numberOfItems = numberOfItems ? parseInt(numberOfItems) : 0;

        const menu = JSON.parse(localStorage.getItem("menu"));

        if (item.ids) {
            for (let i = 0; i < item.ids.length; i++) {
                console.log("item.ids[i]: ", item.ids[i]);
                menu.forEach((arrItem) => {
                    if (arrItem.id == item.ids[i]) {
                        console.log("arrItem: ", arrItem);

                        let found = false;
                        for (let key in newCart.items) {
                            if (newCart.items[key][0] === arrItem.name && (JSON.stringify(newCart.items[key][4]) === JSON.stringify(excludeItems) || i != 0)) {
                                newCart.items[key][1] += 1;
                                newCart.total[0] += Number(arrItem.cost);
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            newCart.items[cartID] = [arrItem.name, 1, arrItem.cost, arrItem.id, i == 0 ? excludeItems : []];
                            newCart.total[0] += Number(arrItem.cost);
                            cartID++;
                        }
                        localStorage.setItem("numItems", JSON.stringify(numberOfItems + 1));
                        window.dispatchEvent(new Event('storage'));
                        return;
                    }
                });
            }
        }

        if (item.id) {
            menu.forEach((arrItem) => {
                if (arrItem.id == item.id) {
                    let found = false;
                    for (let key in newCart.items) {
                        if (newCart.items[key][0] === arrItem.name && JSON.stringify(newCart.items[key][4]) === JSON.stringify(excludeItems)) {
                            newCart.items[key][1] += 1;
                            newCart.total[0] += Number(arrItem.cost);
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        newCart.items[cartID] = [arrItem.name, 1, arrItem.cost, arrItem.id, excludeItems];
                        newCart.total[0] += Number(arrItem.cost);
                    }
                    localStorage.setItem("numItems", JSON.stringify(numberOfItems + 1));
                    window.dispatchEvent(new Event('storage'));
                    return;
                }
            });
        }
        newCart.total[0] = Number(newCart.total[0].toFixed(2));
        console.log("newCart: ", newCart);
        localStorage.setItem("curOrder", JSON.stringify(newCart));
    }

    /**
     * This function opens the pop-up for adding items to the cart
     * @returns {any}
     */
    function openPopUp() {
        setPopUp(true);
    }

    useEffect(() => {
        const menu = JSON.parse(localStorage.getItem("menu"));
        let cost = 0;
        if (item.ids) {
            item.ids.forEach((curID) => {
                menu.forEach((arrItem) => {
                    if (arrItem.id == curID) {
                        cost += Number(arrItem.cost);
                    }
                });
            });
        }
        if (item.id) {
            menu.forEach((arrItem) => {
                if (arrItem.id == item.id) {
                    cost += Number(arrItem.cost);
                }
            }
            );
        }
        setItemCost(cost);
    }, []);

    return (
        <li role="listitem">
            <button data-cy={`\"${ item.name }\"`} className="menuButton" onClick={openPopUp}>
                <div className="image">
                    <img alt={item.name} src={item.src} data-cy="ProductImageAvailable" aria-hidden="true" className="menuIMG" />
                </div>
                <div className="name">
                    <h3 className="name">{item.name}</h3>
                </div>
                <div className="cost">
                    <h3 className="cost">${itemCost.toFixed(2)}</h3>
                </div>
            </button>
            {popUp && <PopUp item={item} setPopUp={setPopUp} addToCart={addToCart} />}
        </li>
    );
}

export default AddMenuItem;