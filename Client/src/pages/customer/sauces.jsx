import React from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import AddMenuItem from '../../components/AddMenuItem';
import CustomerNav from '../../components/CustomerNav';

import sauceImages from '../../utils/sauceImages';

const menu = [
    {name: "Avacado Lime Ranch Dressing", src: sauceImages.avacadoLimeRanchDressing, key: 0, id: 42},
    {name: "Barbeque Sauce", src: sauceImages.bbqSauce, key: 1, id: 51},
    {name: "Chick-fil-A Sauce", src: sauceImages.CFASauce, key: 2, id: 46},
    {name: "Honey Mustard", src: sauceImages.honeyMustard, key: 3, id: 48},
    {name: "Light Balsamic Vinegar", src: sauceImages.lightBalsamicVin, key: 4, id: 45},
    {name: "Light Italian Dressing", src: sauceImages.lightItalianDressing, key: 5, id: 45},
    {name: "Polynesian Sauce", src: sauceImages.polynesian, key: 6, id: 47},
    {name: "Ranch", src: sauceImages.ranch, key: 7, id: 49},
    {name: "Ranch Dressing", src: sauceImages.ranchDressing, key: 8, id: 44},
    {name: "Sweat and Spicy Siracha Sauce", src: sauceImages.SSSrirachaSauce, key: 9, id: 52},
    {name: "Zesty Apple Dressing", src: sauceImages.zestyAppleDressing, key: 10, id: 43},
    {name: "Zesty Buffalo Sauce", src: sauceImages.ZestyBuff, key: 11, id: 50}
];

const menuList = menu.map(item =>
    <AddMenuItem key={item.id} item={item}></AddMenuItem>
);

function Sauces() {
    let numberOfItems = localStorage.getItem("numItems");
    numberOfItems = numberOfItems ? parseInt(numberOfItems) : 0;

    const navigate = useNavigate();

    function navigateOrderPage() {
        navigate('/customer/order')
    }

    return (
        <>
            <CustomerNav numberOfItems={numberOfItems} title={"Sauces"} navPage={"/customer/order"} />
            <ul data-cy="SauceList" className="menu" role="list">
                {menuList}
            </ul>
            <Outlet />
        </>
    );
}

export default Sauces;