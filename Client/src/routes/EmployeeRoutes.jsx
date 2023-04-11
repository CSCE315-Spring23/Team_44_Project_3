import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";

import Order from "../pages/employee/Order";
import OrderHistory from "../pages/employee/OrderHistory";
import Inventory from "../pages/employee/Inventory";
import Menu from "../pages/employee/Menu";
import Reports from "../pages/employee/Reports";
import SalesRep from "../pages/employee/SalesRep";
import ExcessRep from "../pages/employee/ExcessRep";
import SalesTogetherRep from "../pages/employee/SalesTogetherRep";
import XZRep from "../pages/employee/XZRep";
import RestockRep from "../pages/employee/RestockRep";

export default function EmployeeRoutes() {
    return (
        <Routes>
            <Route path="/employee">
                <Route path='order' element={<Order />} />
                <Route path='orderHistory' element={<OrderHistory />} />
                <Route path='inventory' element={<Inventory />} />
                <Route path='menu' element={<Menu />} />
                <Route path='reports' element={<Outlet/>} >
                    <Route path="" element={<Reports/>}></Route>
                    <Route path="sales" element={<SalesRep/>}></Route>
                    <Route path="restock" element={<RestockRep/>}></Route>
                    <Route path="excess" element={<ExcessRep/>}></Route>
                    <Route path="XZ" element={<XZRep/>}></Route>
                    <Route path="salestogether" element={<SalesTogetherRep/>}></Route>
                </Route>
            </Route>
        </Routes >
    );
}