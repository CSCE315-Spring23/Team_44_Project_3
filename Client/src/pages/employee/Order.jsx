import React, { useState, useEffect } from "react";
import EmployeeNav from "../../components/EmployeeNav";
import style from '../../styles/employee.css?inline';
import OrderItemPane from "../../components/OrderItemPane";
import CheckoutPanel from "../../components/CheckoutPanel";

export default function Order(props) {
    const [cart, setCart] = useState({ total: 0, items: {} });

    const addToCart = (item) => {
        let newCart = { ...cart };
        //create entry in cart if it doesn't exist
        if (!newCart.items[item.name]) {
            newCart.items[item.name] = [0, 0];
        }
        //update cart entry
        newCart.items[item.name][0] += 1;
        newCart.items[item.name][1] += Number(item.cost);

        newCart.total += item.cost;

        setCart(newCart);
        // console.log("add to cart " + item.name);
        // console.log(JSON.stringify(cart));
    }

    const isManager = props.isManager;
    return (
        <div className="empOrderPage">
            <EmployeeNav isManager={isManager}></EmployeeNav>
            <OrderItemPane addToCart={addToCart}></OrderItemPane>
            <CheckoutPanel cart={cart} />
        </div>
    );
}