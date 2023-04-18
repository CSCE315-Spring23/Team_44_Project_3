import React, { useState } from "react";

export default function PopUpRow(props) {

    const [checked, setChecked] = useState(true);

    const inventoryitem = props.inventoryitem;

    const handleCheckboxChange = () => {
        props.handleExcludeClick(inventoryitem);
        setChecked(!checked);
    }

    return (
        <div className="PopUpRow">
            <div className="PopUpRowLeft">
                {inventoryitem.name}
            </div>
            <div className="PopUpRowRight">
                <input style={{ marginLeft: '.25em' }} type="checkbox" checked={checked} onChange={handleCheckboxChange} />
            </div>
        </div>
    );
}