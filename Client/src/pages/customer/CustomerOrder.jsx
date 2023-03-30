import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';

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
	<li key={item.key} role="listitem">
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
		</>
	);
}

export default CustomerOrder;