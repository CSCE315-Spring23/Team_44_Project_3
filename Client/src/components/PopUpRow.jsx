import React, {useState} from "react";
import "../styles/employee.scss";

export default function PopUpRow(props) {

    const [checked, setChecked] = useState(true);

    const inventoryitem = props.inventoryitem;

    const handleCheckboxChange = () => {
        props.handleExcludeClick(inventoryitem);
        setChecked(!checked);
    }

    return (
        <div className="PopUpRow">
            <label className="PopUpRowLeft">{inventoryitem.name}</label>
            <label className="checkmark-container">
                <input className={`PopUpRowRight ${checked ? "checked" : "not-checked"}`} type="checkbox" checked={checked} onChange={handleCheckboxChange} />
                <span className="checkmark"></span>
            </label>
        </div>
    );
}