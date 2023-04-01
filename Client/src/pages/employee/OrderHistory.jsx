import React, {useState, useEffect} from "react";

import EmployeeNav from "../../components/EmployeeNav";
import OrderHistoryTable from "../../components/OrderHistoryTable";
import '../../styles/employee.css'

export default function OrderHistory(props) {


    const isManager = props.isManager;
    return (
        <>
            <EmployeeNav isManager={isManager}></EmployeeNav>
            <OrderHistoryTable></OrderHistoryTable>
        </>
    );
}