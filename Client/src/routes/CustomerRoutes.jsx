import React from "react";
import {Route, Routes, Outlet} from "react-router-dom";
import CustomerOrder from '../pages/customer/CustomerOrder';
import Beverage from "../pages/customer/beverages"
import Entree from "../pages/customer/entree";
import Sauces from "../pages/customer/sauces";
import Treats from "../pages/customer/treats";

export default function CustomerRoutes() {
    return (
        <Routes>
            <Route path="/customer" element={<Outlet />} >
                <Route path="order" element={<CustomerOrder />} />
                <Route path="order/beverages" element={<Beverage />} />
                <Route path="order/entrées" element={<Entree />} />
                <Route path="order/sauces" element={<Sauces />} />
                <Route path="order/treats" element={<Treats />} />
            </Route>
        </Routes>
    );
}