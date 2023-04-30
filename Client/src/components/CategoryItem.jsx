import React from 'react';

/**
 * A React component that renders a food category onto the CustomerOrder screen.
 * @param {Object} props - The props object containing the item property.
 * @param {Object} props.item - The food category item to be rendered.
 * @param {string} props.item.name - The name of the food category.
 * @param {string} props.item.title - The title of the food category.
 * @param {string} props.item.src - The URL of the image for the food category.
 * @returns {JSX.Element} A component to render a food category onto the CustomerOrder screen.
 */
function CategoryItem(props) {
	const item = props.item;

	return (
		<li role="listitem">
			<a href={`/customer/order/${ item.title.toLowerCase() }`} className="menuLink">
				<button data-cy={`\"${ item.name }\"`} className="menuButton">
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

export default CategoryItem;
