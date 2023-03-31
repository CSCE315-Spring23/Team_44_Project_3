import React, {useEffect, useState} from 'react';

/**
 * 
 * @param {*} props 
 * @returns a component to render a food category onto the CustomerOrder screen 
 */
export default function AddMenuItem(props) {
    const item = props.item;

    function addOrder(item) {
        console.log(item.title);
        console.log(item.src);
        console.log(item.key);
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
