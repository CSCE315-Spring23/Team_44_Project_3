import React from "react";
import EmployeeNav from "../../components/EmployeeNav";
import '../../styles/employee.css'

export default function OrderHistory(props) {
    const isManager = props.isManager;
    return (
        <>
            <EmployeeNav isManager={isManager}></EmployeeNav>
        </>
    );
}