import React from "react";
import EmployeeNav from "../../components/EmployeeNav";
import style from '../../styles/employee.css?inline';
import OrderItemPane from "../../components/OrderItemPane";
import CheckoutPanel from "../../components/CheckoutPanel";

export default function Order(props) {
    const isManager = props.isManager;
    return (
        <div className="empOrderPage">
            <EmployeeNav isManager={isManager}></EmployeeNav>
            <OrderItemPane></OrderItemPane>
            <CheckoutPanel/>
        </div>
    );
}