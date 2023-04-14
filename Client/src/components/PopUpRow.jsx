import React, { useState, useEffect } from "react";

export default function PopUpRow(props){

    const [checked, setChecked] = useState(true);

    const inventoryitem = props.inventoryitem;

    const handleCheckboxChange = () => {
        props.handleExcludeClick(inventoryitem);
        setChecked(!checked);
    }

    return(
        <div className="PopUpRow">
            {inventoryitem.name}
            <input type="checkbox" checked={checked} onChange={handleCheckboxChange}/>
        </div>
    );
}