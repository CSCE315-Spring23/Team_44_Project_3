import React from "react";
import EmployeeNav from "../../components/EmployeeNav";
import { Link } from "react-router-dom";
import '../../styles/employee.css'

export default function Reports() {
    return (
        <div className="empOrderPage">
            <EmployeeNav></EmployeeNav>
            <div id="reportsSelection">
                <Link className='reportBtn' to='sales'>Sales Report</Link>
                <Link className='reportBtn' to='excess'>Excess Report</Link>
                <Link className='reportBtn' to='XZ'>XZ Report</Link>
                <Link className='reportBtn' to='restock'>Restock Report</Link>
                <Link className='reportBtn' to='salestogether'>Sales Together Report</Link>
            </div>
        </div>
    );
}