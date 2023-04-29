import React from "react";
import {useNavigate} from "react-router-dom";
import EmployeeNav from "../../components/EmployeeNav";
import '../../styles/employee.scss';
import PageProtector from "../../components/PageProtector";

/**
 * Renders a reports page component.
 * @returns {JSX.Element} The reports page component.
 */
function Reports() {
    const navigate = useNavigate();

    /**
     * Navigates to the selected reports page.
     * @param {string} page - The name of the page to navigate to.
     */
    function changePage(page) {
        navigate(`/employee/reports/${ page }`);
    }

    return (
        <PageProtector>
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
        </PageProtector>
    );
}

export default Reports;
