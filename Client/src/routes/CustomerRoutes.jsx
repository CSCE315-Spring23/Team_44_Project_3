import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import Sauces from "../pages/customer/sauces";
import CustomerOrder from '../pages/customer/CustomerOrder';

export default function CustomerRoutes() {
    return (
        <Routes>
            <Route path="/CustomerOrder" element={<Outlet />} >
                <Route path='' element={<CustomerOrder/>}/>
                <Route path="sauces" element={<Sauces />} />
            </Route>
        </Routes>
    );
}