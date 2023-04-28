import React from "react";
import {Outlet, Route, Routes} from "react-router-dom";
import CustomerOrder from '../pages/customer/CustomerOrder';
import Beverage from "../pages/customer/beverages";
import Entree from "../pages/customer/entree";
import Meal from "../pages/customer/meals";
import Salad from "../pages/customer/salads";
import Sauces from "../pages/customer/sauces";
import Sides from "../pages/customer/sides";
import Treats from "../pages/customer/treats";
import Seasonal from "../pages/customer/seasonal";
import CustomerCheckout from "../pages/customer/CustomerCheckout";

export default function CustomerRoutes() {
    return (
        <Routes>
            <Route path="/customer" element={<Outlet />} >
                <Route path="order" element={<CustomerOrder />} />
                <Route path="order/beverages" element={<Beverage />} />
                <Route path="order/entrées" element={<Entree />} />
                <Route path="order/meals" element={<Meal />} />
                <Route path="order/treats" element={<Treats />} />
                <Route path="order/salads" element={<Salad />} />
                <Route path="order/sauces" element={<Sauces />} />
                <Route path="order/sides" element={<Sides />} />
                <Route path="order/seasonal" element={<Seasonal />} />
                <Route path="order/checkout" element={<CustomerCheckout />} />
            </Route>
        </Routes>
    );
}