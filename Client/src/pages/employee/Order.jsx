import React from "react";
import EmployeeNav from "../../components/EmployeeNav";
import style from '../../styles/employee.css?inline';

export default function Order(props) {
    const isManager = props.isManager;
    return (
        <>
            <EmployeeNav isManager={isManager}></EmployeeNav>
        </>
    );
}