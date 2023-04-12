import React, {useEffect, useState} from 'react';
import {HOST} from '../utils/host';

/**
 * 
 * @param {*} props 
 * @returns a component to render a food category onto the CustomerOrder screen 
 */
export default function AddMenuItem(props) {
    const item = props.item;

    function addOrder(item) {

        let order = localStorage.getItem('curOrder');
        console.log("order before changes: ", order);
        if (!order) {
            order = {total: [0], items: []};
        }
        else {
            order = JSON.parse(order);
        }
        // add to the order object
        const menu = JSON.parse(localStorage.getItem('menu'));
        //handle meals
        if (item.ids) {
            item.ids.forEach((curID) => {
                console.log("meal id: ", curID);
                menu.forEach((arrItem) => {
                    if (arrItem.id == curID) {
                        order.total[0] += Number(arrItem.cost);
                        order.items.push({"id": arrItem.id, "quantity": 1});
                    }
                });
            });
        }
        //handle all other items
        if (item.id) {
            console.log("clicked itemid: ", item.id);
            menu.forEach((arrItem) => {
                if (arrItem.id == item.id) {
                    order.total[0] += Number(arrItem.cost);
                    order.items.push({"id": arrItem.id, "quantity": 1});
                }
            });
        }
        console.log(order);
        localStorage.setItem('curOrder', JSON.stringify(order));
    }

    function removeOrder(item) {
        let order = localStorage.getItem('curOrder');
        if (!order)
            return;
        else
            order = JSON.parse(order);

        // add to the order object
        const menu = JSON.parse(localStorage.getItem('menu'));
        //handle meals
        if (item.ids) {
            item.ids.forEach((curID) => {
                console.log("meal id: ", curID);
                menu.forEach((arrItem) => {
                    if (arrItem.id == curID) {
                        order.total[0] -= Number(arrItem.cost);
                        order.items.pop({"id": arrItem.id, "quantity": 1});
                    }
                });
            });
        }
        //handle all other items
        if (item.id) {
            console.log("clicked itemid: ", item.id);
            menu.forEach((arrItem) => {
                if (arrItem.id == item.id) {
                    order.total[0] -= Number(arrItem.cost);
                    order.items.pop({"id": arrItem.id, "quantity": 1});
                }
            });
        }
        console.log(order);
        localStorage.setItem('curOrder', JSON.stringify(order));
    }

    return (
        <li role="listitem">
            <button data-cy={"\"" + item.title + "\""} className="menuButton" onClick={() => addOrder(item)}>
                <div className="image">
                    <img alt={item.title} src={item.src} data-cy="ProductImageAvailable" aria-hidden="true" className="menuIMG" />
                </div>
                <div className="name">
                    <h3 className="name">{item.title}</h3>
                </div>
            </button>
        </li>
    );
}
