import React, { useState, useEffect } from "react";

export default function PopUpRow(props){

    const inventoryitem = props.inventoryitem;

    return(
        <div className="PopUpRow">
            {inventoryitem.name}
        </div>
    );
}