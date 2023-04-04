import React, { useState, useEffect } from "react";
import EmployeeNav from "../../components/EmployeeNav";
import style from '../../styles/employee.css?inline';
import OrderItemPane from "../../components/OrderItemPane";
import CheckoutPanel from "../../components/CheckoutPanel";

export default function Order(props) {

    /*
        Format of Cart
        {
            total : [total cost],
            items : {item name : [number, cost per, itemID]}
        } 

    */
    const currCart = localStorage.getItem('cart');
    const [cart, setCart] = useState(currCart ? JSON.parse(currCart) : { total: [0], items: {} });

    const addToCart = (item) => {
        let newCart = { ...cart };
        //create entry in cart if it doesn't exist
        if (!newCart.items[item.name]) {
            newCart.items[item.name] = [0, 0];
        }
        //update cart entry
        newCart.items[item.name][0] += 1;
        newCart.items[item.name][1] = Number(item.cost);
        newCart.items[item.name][2] = item.id;

        newCart.total[0] += Number(item.cost);

        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
        // console.log("add to cart " + item.name);
        // console.log(JSON.stringify(cart));
    }

    const emptyCart = () => {
        setCart({ total: [0], items: {} });
        localStorage.setItem('cart', JSON.stringify({ total: [0], items: {} }));
    }

    const isManager = props.isManager;
    return (
        <div className="empOrderPage">
            <EmployeeNav isManager={isManager}></EmployeeNav>
            <OrderItemPane addToCart={addToCart}></OrderItemPane>
            <CheckoutPanel cart={cart} emptyCart={emptyCart} />
        </div>
    );
}