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
			<button data-cy={`\"${ item.name }\"`} className="menuButtonSug" onClick={openPopUp}>
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
			{popUp && <PopUp item={item} setPopUp={setPopUp} addToCart={props.addToCart} />}
		</li>
	);
}

export default AddMenuItem;