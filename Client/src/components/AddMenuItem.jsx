import React, { useEffect, useState } from 'react';
import { HOST } from '../utils/host';

/**
 * 
 * @param {*} props 
 * @returns a component to render a food category onto the CustomerOrder screen 
 */
export default function AddMenuItem(props) {

    /*
        Format of Cart
        {
            total : [total cost],
            items : {itemID : [name, number, cost per, itemID, excluded items]},
        }

    */
    const item = props.item;


    const addToCart = (item, excludeItems) => {
        console.log("item: ", item, "excludeItems: ", excludeItems);
        const cart = JSON.parse(localStorage.getItem('curOrder')) || { total: [0], items: {} };
        let cartID = Object.keys(cart.items).length;
        console.log(cartID)
        let newCart = { ...cart };

        let numberOfItems = localStorage.getItem("numItems");
        numberOfItems = numberOfItems ? parseInt(numberOfItems) : 0;

        const menu = JSON.parse(localStorage.getItem('menu'));

        if(item.ids){
            item.ids.forEach((curID) => {
                menu.forEach((arrItem) => {
                    if(arrItem.id == curID){
                        let found = false;
                        for(let key in newCart.items){
                            if(newCart.items[key][0] === arrItem.name && JSON.stringify(newCart.items[key][4]) === JSON.stringify(excludeItems)){
                                newCart.items[key][1] += 1;
                                newCart.total[0] += Number(arrItem.cost);
                                localStorage.setItem('numItems', JSON.stringify(numberOfItems + 1));
                                found = true;
                                break;
                            }
                        }
                        if(!found){
                            newCart.items[cartID] = [arrItem.name, 1, arrItem.cost, arrItem.id, excludeItems];
                            newCart.total[0] += Number(arrItem.cost);
                            cartID++;
                            localStorage.setItem('numItems', JSON.stringify(numberOfItems + 1));
                        }
                        return;
                    }
                });
            });
        }

        if(item.id){
            menu.forEach((arrItem) => {
                if(arrItem.id == item.id){
                    let found = false;
                    for(let key in newCart.items){
                        if(newCart.items[key][0] === arrItem.name && JSON.stringify(newCart.items[key][4]) === JSON.stringify(excludeItems)){
                            newCart.items[key][1] += 1;
                            newCart.total[0] += Number(arrItem.cost);
                            localStorage.setItem('numItems', JSON.stringify(numberOfItems + 1));
                            found = true;
                            break;
                        }
                    }
                    if(!found){
                        newCart.items[cartID] = [arrItem.name, 1, arrItem.cost, arrItem.id, excludeItems];
                        newCart.total[0] += Number(arrItem.cost);
                        localStorage.setItem('numItems', JSON.stringify(numberOfItems + 1));
                    }
                    return;
                }
            });
        }

        console.log("newCart: ", newCart);
        localStorage.setItem('curOrder', JSON.stringify(newCart));
    }

    return (
        <li role="listitem">
            <button data-cy={"\"" + item.name + "\""} className="menuButton" onClick={() => addToCart(item,[])}>
                <div className="image">
                    <img alt={item.name} src={item.src} data-cy="ProductImageAvailable" aria-hidden="true" className="menuIMG" />
                </div>
                <div className="name">
                    <h3 className="name">{item.name}</h3>
                </div>
            </button>
        </li>
    );
}
