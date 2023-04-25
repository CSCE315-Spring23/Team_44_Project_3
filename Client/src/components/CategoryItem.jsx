import React from 'react';

/**
 * 
 * @param {*} props 
 * @returns a component to render a food category onto the CustomerOrder screen 
 */
export default function CategoryItem(props) {
    const item = props.item;

    return (
        <li role="listitem">
            <a href={`/customer/order/${item.title.toLowerCase()}`} className="menuLink">
                <button data-cy={`\"${item.name}\"`} className="menuButton">
                    <div className="image">
                        <img alt={item.title} src={item.src} data-cy="ProductImageAvailable" aria-hidden="true" className="menuIMG" />
                    </div>
                    <div className="name">
                        <h3 className="name">{item.title}</h3>
                    </div>
                </button>
            </a>
        </li>
    );
}
