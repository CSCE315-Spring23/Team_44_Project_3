import React, { useEffect, useState } from "react";

export default function DatabaseTablePane(props) {
    console.log(props)
    const headers = Object.keys(props.data[0]);
    const formattedHeaders = [];
    // format headers
    for(let i = 0; i < headers.length; i++) {
        // remove underscores
        let formattedHeader = headers[i].replace(/_/g, " ");
        // capitalize all words
        formattedHeader = formattedHeader.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        formattedHeaders.push(formattedHeader);
    }

    console.log(headers);

    const handleOnClick = (id) => {
        if(props.handleOnClick) {
            props.handleOnClick(id);
        } else{
            console.log("No handleOnClick function passed to DatabaseTablePane");
        }
    }

    return (
        <table className="databaseTable">
            <thead>
                <tr>
                    {formattedHeaders.map((header) => (
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