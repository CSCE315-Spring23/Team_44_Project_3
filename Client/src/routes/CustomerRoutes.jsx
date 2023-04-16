import React from "react";
import {Outlet, Route, Routes} from "react-router-dom";
import CustomerOrder from '../pages/customer/CustomerOrder';
import Beverage from "../pages/customer/beverages";
import Entree from "../pages/customer/entree";
import Meal from "../pages/customer/meals";
import Salad from "../pages/customer/salads";
import Sauces from "../pages/customer/sauces";
import Treats from "../pages/customer/treats";

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
            </Route>
        </Routes>
    );
}