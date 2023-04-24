import React, { useState, useEffect } from "react";

import { HOST } from "../../utils/host";
import { endpoints } from "../../utils/apiEndpoints";



export default function MenuBoard(props) {

    const [entrees, setEntrees] = useState([]);
    const [salads, setSalads] = useState([]);
    const [sides, setSides] = useState([]);
    const [treats, setTreats] = useState([]);
    const [beverages, setBeverages] = useState([]);
    const [sauces, setSauces] = useState([]);


    return (
        <div className="menuBoardPage">
            <div className="menuBoardTitle">
                <h1>Menu</h1>
            </div>
        </div>
    );
}
