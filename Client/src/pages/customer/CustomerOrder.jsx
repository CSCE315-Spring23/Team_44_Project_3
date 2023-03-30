import React, {useEffect, useState} from 'react';
import style from "../../styles/index.css";
import icon from "../../assets/logo.svg"

const categories = [
	{title: "Meals", src: "/assets/categories/meals.png", key: 1},
	{title: "Entrées", src: "/assets/categories/entree.png", key: 2},
	{title: "Beverages", src: "/assets/categories/beverages.png", key: 3},
	{title: "Salads", src: "/assets/categories/salads.png", key: 4},
	{title: "Treats", src: "/assets/categories/treats.png", key: 5},
	{title: "Sauces", src: "/assets/categories/sauces.png", key: 6}
];

const categoryList = categories.map(item =>
	<li role="listitem">
		<button data-cy={"\"" + item.title + "\""} class="menuButton">
			<div class="image">
				<img alt={item.title} src={item.src} data-cy="ProductImageAvailable" aria-hidden="true" class="menuIMG" />
			</div>
			<div class="name">
				<h3 class="name">{item.title}</h3>
			</div>
		</button>
	</li>
);

function CustomerOrder() {
	return (
		<html>
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Chick-fil-A</title>
				<link rel="icon" href={icon} />
				<link rel="stylesheet" href={style} />
			</head>

			<header>
				<h1>Place an order</h1>
			</header>

			<body>
				<ul data-cy="MenyCategoryList" class="menu" role="list">
					{categoryList}
					{/*
					<li role="listitem">
						<button data-cy="MOBILE_MEALS" class="menuButton">
							<div class="image">
								<img alt="Meals" src={meal} data-cy="ProductImageAvailable" aria-hidden="true" class="menuIMG" />
							</div>
							<div class="name">
								<h3 class="name">Meals</h3>
							</div>
						</button>
					</li>
					<li role="listitem">
						<button data-cy="MOBILE_ENTREE" class="menuButton">
							<div class="image">
								<img alt="Entrées" src={entree} data-cy="ProductImageAvailable" aria-hidden="true" class="menuIMG" />
							</div>
							<div class="name">
								<h3 class="name">Entrées</h3>
							</div>
						</button>
					</li>
					<li role="listitem">
						<button data-cy="MOBILE_BEVERAGES" class="menuButton">
							<div class="image">
								<img alt="Beverages" src={beverage} data-cy="ProductImageAvailable" aria-hidden="true" class="menuIMG" />
							</div>
							<div class="name">
								<h3 class="name">Beverages</h3>
							</div>
						</button>
					</li>
					<li role="listitem">
						<button data-cy="MOBILE_SALADS" class="menuButton">
							<div class="image">
								<img alt="Salad" src={salad} data-cy="ProductImageAvailable" aria-hidden="true" class="menuIMG" />
							</div>
							<div class="name">
								<h3 class="name">Salads</h3>
							</div>
						</button>
					</li>
					<li role="listitem">
						<button data-cy="MOBILE_TREATS" class="menuButton">
							<div class="image">
								<img alt="Treats" src={treats} data-cy="ProductImageAvailable" aria-hidden="true" class="menuIMG" />
							</div>
							<div class="name">
								<h3 class="name">Treats</h3>
							</div>
						</button>
					</li>
					<li role="listitem">
						<button data-cy="MOBILE_SAUCE" class="menuButton">
							<div class="image">
								<img alt="sauce" src={sauce} data-cy="ProductImageAvailable" aria-hidden="true" class="menuIMG" />
							</div>
							<div class="name">
								<h3 class="name">Sauce</h3>
							</div>
						</button>
					</li>
					*/}

				</ul>
			</body>
		</html>
	);
}

export default CustomerOrder;