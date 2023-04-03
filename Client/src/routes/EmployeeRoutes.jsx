import React from "react";
import { Route, Routes } from "react-router-dom";

import Order from "../pages/employee/Order";
import OrderHistory from "../pages/employee/OrderHistory";
import Inventory from "../pages/employee/Inventory";
import Menu from "../pages/employee/Menu";

export default function EmployeeRoutes() {
    return (
        <Routes>
            <Route path="/employee">
                <Route path='order' element={<Order />} />
                <Route path='orderHistory' element={<OrderHistory />} />
                <Route path = 'inventory' element={<Inventory />} />
                <Route path = 'menu' element={<Menu />} />
            </Route>
        </Routes>
    );
}