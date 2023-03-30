import React, { useEffect, useState } from 'react';
import images from '../utils/imageImport';


export default function CategoryItem(props) {
    const item = props.item;
    return (

        <li role="listitem">
            <button data-cy={"\"" + item.title + "\""} className="menuButton">
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
