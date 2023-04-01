import React, { useEffect, useState } from "react";

export default function DatabaseTablePane(props) {
    const headers = Object.keys(props.data[0]);
    console.log(headers);
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
                    <tr key={row.id}>
                        {headers.map((header) => (
                            <td key={header}>{row[header]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}