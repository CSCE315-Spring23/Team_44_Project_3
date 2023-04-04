import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import CategoryItem from '../../components/CategoryItem';

import images from '../../utils/imageImport';

const categories = [
	{ title: "Meals", src: images.meals, key: 0 },
	{ title: "Entrées", src: images.entree, key: 1 },
	{ title: "Beverages", src: images.beverages, key: 2 },
	{ title: "Salads", src: images.salads, key: 3 },
	{ title: "Treats", src: images.treats, key: 4 },
	{ title: "Sauces", src: images.sauces, key: 5 }
];


// create list of category elements to be ordered
const categoryList = categories.map(item =>
	<CategoryItem key={item.key} item={item}></CategoryItem>
);

function CustomerOrder() {
	useEffect(() => {
		const url = HOST + endpoints.getMenu;
		fetch(url, {
			method: "GET"
		})
			.then(response => {
				if (!response.ok) {
					throw new Error("Network Response Not OK");
				}
				return response.json();
			})
			.then(data => {
				localStorage.setItem('menu', JSON.stringify(data));
			})
			.catch(error => {
				console.error("Could not fetch menu items from " + url);
			});

	}, []);


	return (
		<>
			<header>
				<h1>Place an order</h1>
			</header>
			<ul data-cy="MenuCategoryList" className="menu" role="list">
				{categoryList}
			</ul>
			<Outlet />
		</>
	);
}

export default CustomerOrder;