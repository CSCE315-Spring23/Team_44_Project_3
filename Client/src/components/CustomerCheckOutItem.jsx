import React from "react";

export default function CustomerCheckOutItem(props) {

    const removeFromCart = () => {
        props.removeFromCart(props.cartID);
    }
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
                    <td><button onClick={removeFromCart}>-</button></td>
                    <br />
                </tr>
            </table> 
        </div> 
    );
}