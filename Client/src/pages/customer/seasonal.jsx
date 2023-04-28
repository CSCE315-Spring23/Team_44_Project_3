import React, { useEffect, useState } from "react";

import { Outlet, useNavigate } from 'react-router-dom';
import AddMenuItem from '../../components/AddMenuItem';
import CustomerNav from '../../components/CustomerNav';

import { HOST } from "../../utils/host";
import { endpoints } from "../../utils/apiEndpoints";
import logo from "../../assets/logo.svg";

export default function Seasonal() {

    const [menu, setMenu] = useState([]);

    useEffect(() => {
        const url = HOST + endpoints.getMenu;
        fetch(url, {
            method: "GET"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network Response Not OK");
                }
                return response.json();
            }
            )
            .then(data => {
                for(let i = 0; i < data.length; i++){
                    console.log(data[i], data[i].category);
                    if(data[i].category === null){
                        data[i].src = logo;
                        setMenu(menu => [...menu, data[i]])
                    }
                }
            }
            )
            .catch(error => {
                console.error("Could not fetch menu items from " + url);
            }
            );
    }, []);

    let numberOfItems = localStorage.getItem("numItems");
    numberOfItems = numberOfItems ? parseInt(numberOfItems) : 0;

    const menuList = menu.map(item =>
        <AddMenuItem key={item.id} item={item}></AddMenuItem>
    );

    return (
        <>
            <CustomerNav numberOfItems={numberOfItems} title={"Seasonal"} navPage={"/customer/order"} />
            <ul data-cy="SeasonalList" className="menu" role="list">
                {menuList}
            </ul>
            <Outlet />
        </>
    );
}