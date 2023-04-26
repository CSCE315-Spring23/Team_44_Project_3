import React, { useState, useEffect } from "react";

import { HOST } from "../../utils/host";
import { endpoints } from "../../utils/apiEndpoints";
import PageProtector from "../../components/PageProtector";




export default function MenuBoard(props) {

    const [entrees, setEntrees] = useState([]);
    const [salads, setSalads] = useState([]);
    const [sides, setSides] = useState([]);
    const [treats, setTreats] = useState([]);
    const [beverages, setBeverages] = useState([]);
    const [sauces, setSauces] = useState([]);
    const [seasonal, setSeasonal] = useState([]);

    const meal = 4.28;

    useEffect(() => {
        const url = HOST + endpoints.getMenu;
        fetch(url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network Response Not OK");
                }
                return response.json();
            })
            .then(data => {
                console.log("data from MenuBoard: ", data);
                for (let i = 0; i < data.length; i++) {
                    switch (data[i].category) {
                        case "entree":
                            setEntrees(entrees => [...entrees, data[i]]);
                            break;
                        case "salad":
                            setSalads(salads => [...salads, data[i]]);
                            break;
                        case "side":
                            setSides(sides => [...sides, data[i]]);
                            break;
                        case "treat":
                            setTreats(treats => [...treats, data[i]]);
                            break;
                        case "beverage":
                            setBeverages(beverages => [...beverages, data[i]]);
                            break;
                        case "sauce":
                            setSauces(sauces => [...sauces, data[i]]);
                            break;
                        default:
                            setSeasonal(seasonal => [...seasonal, data[i]]);
                            break;
                    }
                }
            })
            .catch(error => {
                console.error("Could not fetch menu items from " + url);
            });
    }, []);

    return (
        <PageProtector>
            <div className="menuBoardPage">
                <div className="menuBoardTitle">
                    <h1>Menu</h1>
                </div>
            </div>
        </PageProtector>
    );
}
