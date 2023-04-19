import React from "react";

export default function CustomerCheckOutItem(props) {

    return ( 
        <div>
            <style>
                {`
                    table, td {
                        border:1px dashed black;
                        text-align: center;
                        padding: 10px;

                    }
                `}
            </style> 
            <table>
                <tr>
                    <td>{props.itemName}</td>
                    <td>{props.count}</td>
                    <td>{props.price}</td>
                    <br />
                </tr>
            </table> 
        </div> 
    );
}