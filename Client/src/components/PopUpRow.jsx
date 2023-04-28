/**
 * A component that displays a row for a specific inventory item
 * @param {Object} props - The props object
 * @param {Object} props.inventoryitem - The inventory item to display in the row
 * @param {Function} props.handleExcludeClick - A callback function to call when the user clicks the exclude checkbox
 * @returns {JSX.Element} A React component that displays a row for a specific inventory item
 */
import React, {useState} from "react";
import "../styles/employee.scss";

function PopUpRow(props) {
    const [checked, setChecked] = useState(true);
    const inventoryitem = props.inventoryitem;

    /**
     * Handles the checkbox change event
     * @function
     * @returns {void}
     */
    function handleCheckboxChange() {
        props.handleExcludeClick(inventoryitem);
        setChecked(!checked);
    };

    return (
        <div className="PopUpRow">
            <label className="PopUpRowLeft">{inventoryitem.name}</label>
            <label className="checkmark-container">
                <input className={`PopUpRowRight ${ checked ? "checked" : "not-checked" }`} type="checkbox" checked={checked} onChange={handleCheckboxChange} />
                <span className="checkmark"></span>
            </label>
        </div>
    );
}

export default PopUpRow;