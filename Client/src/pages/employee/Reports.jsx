import React from "react";
import EmployeeNav from "../../components/EmployeeNav";
import { Link } from "react-router-dom";
import '../../styles/employee.css'

export default function Reports() {
    return (
        <div className="empOrderPage">
            <EmployeeNav></EmployeeNav>
            <div id="reportsSelection">
                <Link className='reportBtn'>Sales Report</Link>
                <Link className='reportBtn'>Excess Report</Link>
                <Link className='reportBtn'>XZ Report</Link>
                <Link className='reportBtn'>Restock Report</Link>
                <Link className='reportBtn'>Sales Together Report</Link>
            </div>
        </div>
    );
}