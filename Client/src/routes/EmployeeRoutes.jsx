import React from "react";
import {Outlet, Route, Routes} from "react-router-dom";

import ExcessRep from "../pages/employee/ExcessRep";
import Inventory from "../pages/employee/Inventory";
import Menu from "../pages/employee/Menu";
import Order from "../pages/employee/Order";
import OrderHistory from "../pages/employee/OrderHistory";
import Reports from "../pages/employee/Reports";
import RestockRep from "../pages/employee/RestockRep";
import SalesRep from "../pages/employee/SalesRep";
import SalesTogetherRep from "../pages/employee/SalesTogetherRep";
import XZRep from "../pages/employee/XZRep";
import MenuBoard from "../pages/employee/MenuBoard";

/**
 * Defines the routes for the employee section of the app.
 * @returns {JSX.Element} The routes for the employee section of the app.
 */
function EmployeeRoutes() {
    return (
        <Routes className='empRoutes'>
            <Route path="/employee">
                {/* Define the employee order section of the app. */}
                <Route path='order' element={<Order />} />
                <Route path='orderHistory' element={<OrderHistory />} />
                <Route path='inventory' element={<Inventory />} />
                <Route path='menu' element={<Menu />} />
                {/* Define the employee reports section of the app. */}
                <Route path='reports' element={<Outlet />} >
                    <Route path="" element={<Reports />}></Route>
                    <Route path="sales" element={<SalesRep />}></Route>
                    <Route path="restock" element={<RestockRep />}></Route>
                    <Route path="excess" element={<ExcessRep />}></Route>
                    <Route path="XZ" element={<XZRep />}></Route>
                    <Route path="salestogether" element={<SalesTogetherRep />}></Route>
                </Route>
                <Route path="menuboard" element={<MenuBoard />} />
            </Route>
        </Routes >
    );
}

export default EmployeeRoutes;
