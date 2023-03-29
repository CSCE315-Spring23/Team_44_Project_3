import React, {useEffect, useState} from 'react';
import style from "../styles/index.css";
import icon from "../assets/logo.svg"
import breakfast from "../assets/breakfast_display.png";
import meal from "../assets/meal_display.png";
import entree from "../assets/entree_display.png";
import sides from "../assets/sides_display.png";
import beverage from "../assets/beverages_display.png";
import salad from "../assets/salad_display.png";
import treats from "../assets/treats_display.png";
import kid_menu from "../assets/kids_meal_display.png";
import sauce from "../assets/sauce_display.png";

function Order() {
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
				<ul role="list">
					<li role="listitem">
						<button data-cy="MOBILE_BREAKFAST" class="breakfast">
							<div class="image">
								<img alt="Breakfast" src={breakfast} data-cy="ProductImageAvailable" aria-hidden="true" class="menuImg" />
							</div>
							<div class="name">
								<h3 class="name">Breakfast</h3>
							</div>
						</button>
					</li>
					<li role="listitem">
						<button data-cy="MOBILE_MEALS" class="meals">
							<div class="image">
								<img alt="Meals" src={meal} data-cy="ProductImageAvailable" aria-hidden="true" class="menuImg" />
							</div>
							<div class="name">
								<h3 class="name">Meals</h3>
							</div>
						</button>
					</li>
					<li role="listitem">
						<button data-cy="MOBILE_ENTREE" class="entree">
							<div class="image">
								<img alt="Entrées" src={entree} data-cy="ProductImageAvailable" aria-hidden="true" class="menuImg" />
							</div>
							<div class="name">
								<h3 class="name">Entrées</h3>
							</div>
						</button>
					</li>
					<li role="listitem">
						<button data-cy="MOBILE_SIDES" class="sides">
							<div class="image">
								<img alt="Meals" src={sides} data-cy="ProductImageAvailable" aria-hidden="true" class="menuImg" />
							</div>
							<div class="name">
								<h3 class="name">Sides</h3>
							</div>
						</button>
					</li>
					<li role="listitem">
						<button data-cy="MOBILE_BEVERAGES" class="beverage">
							<div class="image">
								<img alt="Beverages" src={beverage} data-cy="ProductImageAvailable" aria-hidden="true" class="menuImg" />
							</div>
							<div class="name">
								<h3 class="name">Beverages</h3>
							</div>
						</button>
					</li>
					<li role="listitem">
						<button data-cy="MOBILE_SALADS" class="salad">
							<div class="image">
								<img alt="Salad" src={salad} data-cy="ProductImageAvailable" aria-hidden="true" class="menuImg" />
							</div>
							<div class="name">
								<h3 class="name">Salads</h3>
							</div>
						</button>
					</li>
					<li role="listitem">
						<button data-cy="MOBILE_TREATS" class="treats">
							<div class="image">
								<img alt="Treats" src={treats} data-cy="ProductImageAvailable" aria-hidden="true" class="menuImg" />
							</div>
							<div class="name">
								<h3 class="name">Treats</h3>
							</div>
						</button>
					</li>
					<li role="listitem">
						<button data-cy="MOBILE_KID_MENU" class="kid_menu">
							<div class="image">
								<img alt="Kid's Menu" src={kid_menu} data-cy="ProductImageAvailable" aria-hidden="true" class="menuImg" />
							</div>
							<div class="name">
								<h3 class="name">Kid's Menu</h3>
							</div>
						</button>
					</li>
					<li role="listitem">
						<button data-cy="MOBILE_SAUCE" class="sauce">
							<div class="image">
								<img alt="sauce" src={sauce} data-cy="ProductImageAvailable" aria-hidden="true" class="menuImg" />
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

export default Order;