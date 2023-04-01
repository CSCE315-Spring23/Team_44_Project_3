import React, { useEffect, useState } from "react";

export default function DatabaseTablePane(props) {
    console.log(props)
    const headers = Object.keys(props.data[0]);
    console.log(headers);

    const handleOnClick = (id) => {
        props.handleOnClick(id);
    }

    return (
        <table className="databaseTable">
            <thead>
                <tr>
                    {headers.map((header) => (
                        <th key={header}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.data.map((row) => (
                    <tr key={row.id} onClick={ () => handleOnClick(row.id)}>
                        {headers.map((header) => (
                            <td key={header}>{row[header]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}