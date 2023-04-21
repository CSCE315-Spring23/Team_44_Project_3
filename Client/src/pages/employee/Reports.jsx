import React from "react";
import {useNavigate} from "react-router-dom";
import EmployeeNav from "../../components/EmployeeNav";
import '../../styles/employee.scss';

export default function Reports() {
    const navigate = useNavigate();
    function changePage(page) {
        navigate(`/employee/reports/${page}`);
    }

    return (
        <div className="empOrderPage">
            <EmployeeNav current={"reports"} />
            <div id="reportsSelection">
                <button onClick={e => changePage("sales")} className="reportBtn">Sales Report</button>
                <button onClick={e => changePage("excess")} className="reportBtn">Excess Report</button>
                <button onClick={e => changePage("XZ")} className="reportBtn">XZ Report</button>
                <button onClick={e => changePage("restock")} className="reportBtn">Restock Report</button>
                <button onClick={e => changePage("salestogether")} className="reportBtn">Sales Together Report</button>
            </div>
        </div>
    );
}