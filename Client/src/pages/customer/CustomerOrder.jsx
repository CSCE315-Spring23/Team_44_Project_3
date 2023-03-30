import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import CategoryItem from '../../components/CategoryItem';

import style from "../../styles/index.css";
import icon from "../../assets/logo.svg"
import images from '../../utils/imageImport';

const categories = [
	{title: "Meals", src: images.meals, key: 1},
	{title: "Entrées", src: images.entree, key: 2},
	{title: "Beverages", src: images.beverages, key: 3},
	{title: "Salads", src: images.salads, key: 4},
	{title: "Treats", src: images.treats, key: 5},
	{title: "Sauces", src: images.sauces, key: 6}
];

const categoryList = categories.map(item =>
	<CategoryItem key={item.key} item={item}></CategoryItem>
);

function CustomerOrder() {
	return (
		<>
			<Helmet>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Chick-fil-A</title>
				<link rel="icon" href={icon} />
				<link rel="stylesheet" href={style} />
			</Helmet>

			<header>
				<h1>Place an order</h1>
			</header>
				<ul data-cy="MenyCategoryList" className="menu" role="list">
					{categoryList}

				</ul>
		</>
	);
}

export default CustomerOrder;