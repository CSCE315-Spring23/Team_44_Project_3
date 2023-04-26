import React, { useState, useEffect } from "react";

import { HOST } from "../../utils/host";
import { endpoints } from "../../utils/apiEndpoints";
import PageProtector from "../../components/PageProtector";

import images from "../../utils/menuboardImages";




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

                <div className="menuBoard">
                    <div className="menuBoardEntrees">
                        <div className="menuBoardCate">
                            <h2>Entrees</h2>
                        </div>
                        <div className="menuBoardList">
                            {entrees.map((item, index) => (
                                <div className="menuBoardItem" key={index}>
                                    <h4>{index + 1}. {item.name}</h4>
                                    <h4>Entree: ${item.cost}</h4>
                                    <h4>Meal: ${(parseFloat(item.cost) + meal).toFixed(2)}</h4>
                                    {item.id === 2 ? <img src={images.sand}/> : item.id === 4 ? <img src={images.spicysSand}/> :
                                        item.id === 8 ? <img src={images.nuggs}/> : item.id === 10 ? <img src={images.grilledsand}/> : null}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="menuBoardSS">
                        <div className="menuBoardSalads">
                            <div className="menuBoardCate">
                                <h2>Salads</h2>
                            </div>
                            <div className="menuBoardList">
                                {salads.map((item, index) => (
                                    <div className="menuBoardItem" key={index}>
                                        <h4>{index + 1}. {item.name}: ${item.cost}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="menuBoardSides">
                            <div className="menuBoardCate">
                                <h2>Sides</h2>
                            </div>
                            <div className="menuBoardList">
                                {sides.map((item, index) => (
                                    <div className="menuBoardItem" key={index}>
                                        <h4>{index + 1}. {item.name}: ${item.cost}</h4>
                                        {item.id === 16 ? <img src={images.waffleFry}/> : null}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="menuBoardTreats">
                        <div className="menuBoardCate">
                            <h2>Treats</h2>
                            <img src={images.desserts}/>
                        </div>
                        <div className="menuBoardList">
                            {treats.map((item, index) => (
                                <div className="menuBoardItem" key={index}>
                                    <h4>{index + 1}. {item.name}: ${item.cost}</h4>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="menuBoardBeverages">
                        <div className="menuBoardCate">
                            <h2>Beverages</h2>
                            <img src={images.bev}/>
                        </div>
                        <div className="menuBoardList">
                            {beverages.map((item, index) => (
                                <div className="menuBoardItem" key={index}>
                                    <h4>{index + 1}. {item.name}: ${item.cost}</h4>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="menuBoardSauces">
                        <div className="menuBoardCate">
                            <h2>Sauces</h2>
                        </div>
                        <div className="menuBoardList">
                            {sauces.map((item, index) => (
                                <div className="menuBoardItem" key={index}>
                                    <h5>{index + 1}. {item.name}</h5>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="menuBoardSeasonal">
                        <div className="menuBoardCate">
                            <h2>Seasonal</h2>
                        </div>
                        <div className="menuBoardList">
                            {seasonal.map((item, index) => (
                                <div className="menuBoardItem" key={index}>
                                    <h4>{index + 1}. {item.name}: ${item.cost}</h4>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </div>
        </PageProtector >
    );
}
