import React from "react";
import {Route, Routes, Outlet} from "react-router-dom";
import CustomerOrder from '../pages/customer/CustomerOrder';
import Beverage from "../pages/customer/beverages"
import Entree from "../pages/customer/entree";
import Sauces from "../pages/customer/sauces";

export default function CustomerRoutes() {
    return (
        <Routes>
            <Route path="/CustomerOrder" element={<Outlet />} >
                <Route path='' element={<CustomerOrder />} />
                <Route path="beverages" element={<Beverage />} />
                <Route path="entrées" element={<Entree />} />
                <Route path="sauces" element={<Sauces />} />
            </Route>
        </Routes>
    );
}