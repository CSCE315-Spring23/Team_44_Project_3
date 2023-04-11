import React from "react";
import EmployeeNav from "../../components/EmployeeNav";
import { Link } from "react-router-dom";

export default function Reports() {
    return (
        <div className="empOrderPage">
            <EmployeeNav></EmployeeNav>
            <div id="reportsSelection">
                <Link className='reportBtn'>Sales Report</Link>
            </div>
        </div>
    );
}