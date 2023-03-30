import React, {useEffect, useState} from 'react';
import style from "../../styles/index.css";
import icon from "../../assets/logo.svg"
import meal from "../../assets/categories/meals.png";
import entree from "../../assets/categories/entree.png";
import beverage from "../../assets/categories/beverages.png";
import salad from "../../assets/categories/salads.png";
import treats from "../../assets/categories/treats.png";
import sauce from "../../assets/categories/sauces.png";

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
				</ul>
			</body>
		</html>
	);
}

export default CustomerOrder;