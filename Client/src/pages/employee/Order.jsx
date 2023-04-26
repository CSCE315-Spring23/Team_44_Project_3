import React, { useState } from "react";
import CheckoutPanel from "../../components/CheckoutPanel";
import EmployeeNav from "../../components/EmployeeNav";
import OrderItemPane from "../../components/OrderItemPane";
import PageProtector from "../../components/PageProtector";

export default function Order(props) {

    /*
        Format of Cart
        {
            total : [total cost],
            items : {cartID : [name, number, cost per, itemID, excluded items]},
        } 

    */
    const currCart = localStorage.getItem('cart');
    const [cart, setCart] = useState(currCart ? JSON.parse(currCart) : { total: [0], items: {} });

    const addToCart = (item, excludeItems) => {
        const cartID = Object.keys(cart.items).length;
        console.log("add to cart clicked ->", item.name, excludeItems, cartID)
        let newCart = { ...cart };
        //create entry in cart if it doesn't exist and excluded items is different
        for (let key in newCart.items) {
            if (newCart.items[key][0] === item.name && JSON.stringify(newCart.items[key][4]) === JSON.stringify(excludeItems)) {
                newCart.items[key][1] += 1;
                newCart.total[0] += Number(item.cost);
                setCart(newCart);
                localStorage.setItem('cart', JSON.stringify(newCart));
                return;
            }
        }
        //update cart entry
        newCart.items[cartID] = [item.name, 1, item.cost, item.id, excludeItems];

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

    const removeFromCart = (cartID) => {
        console.log("remove from cart clicked ->", cartID)

        let newCart = { ...cart };
        newCart.total[0] -= newCart.items[cartID][2];
        if (newCart.items[cartID][1] > 1) {
            newCart.items[cartID][1] -= 1;
        }
        else {
            delete newCart.items[cartID];
        }
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    }

    const isManager = props.isManager;
    return (
        <PageProtector>
            <div className="empOrderPage">
                <EmployeeNav isManager={isManager} current={"order"} />
                <OrderItemPane addToCart={addToCart}></OrderItemPane>
                <CheckoutPanel cart={cart} emptyCart={emptyCart} removeFromCart={removeFromCart} />
            </div >
        </PageProtector>
    );
}