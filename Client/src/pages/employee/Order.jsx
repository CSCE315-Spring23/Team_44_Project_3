/**
 * Represents the Order page component
 * @param {Object} props - The props object
 * @param {boolean} props.isManager - Flag indicating if the user is a manager
 * @returns {JSX.Element} - The rendered component
 */
import React, {useState} from "react";
import CheckoutPanel from "../../components/CheckoutPanel";
import EmployeeNav from "../../components/EmployeeNav";
import OrderItemPane from "../../components/OrderItemPane";
import PageProtector from "../../components/PageProtector";

/**
 * The format of the Cart object
 * @typedef {Object} Cart
 * @property {number[]} total - An array with the total cost of the cart
 * @property {Object.<string, any[]>} items - An object where the keys are cart IDs and the values are arrays with name, number, cost per item, item ID, and excluded items
 */
function Order(props) {
    const isManager = props.isManager;
    /**
     * Format of Cart
     *  {
     *      total : [total cost],
     *      items : {cartID : [name, number, cost per, itemID, excluded items]},
     *  }
     */

    /**
     * The current cart object
     * @type {Cart}
     */
    const currCart = localStorage.getItem("cart");
    const [cart, setCart] = useState(currCart ? JSON.parse(currCart) : {total: [0], items: {}});

    /**
     * Adds an item to the cart
     * @param {Object} item - The item to be added to the cart
     * @param {Array} excludeItems - An array with the items to be excluded from the item being added
     */
    function addToCart(item, excludeItems) {
        let cartID = Object.keys(cart.items).length > 0 ? parseInt(Object.keys(cart.items)[Object.keys(cart.items).length - 1]) + 1 : 0;
        console.log("add to cart clicked ->", item.name, excludeItems, cartID);
        let newCart = {...cart};
        //create entry in cart if it doesn't exist and excluded items is different
        for (let key in newCart.items) {
            if (newCart.items[key][0] === item.name && JSON.stringify(newCart.items[key][4]) === JSON.stringify(excludeItems)) {
                newCart.items[key][1] += 1;
                newCart.total[0] += Number(item.cost);
                setCart(newCart);
                localStorage.setItem("cart", JSON.stringify(newCart));
                return;
            }
        }
        //update cart entry
        newCart.items[cartID] = [item.name, 1, item.cost, item.id, excludeItems];

        newCart.total[0] += Number(item.cost);

        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    }

    /**
     * Empties the cart
     */
    function emptyCart() {
        setCart({total: [0], items: {}});
        localStorage.setItem("cart", JSON.stringify({total: [0], items: {}}));
    };

    /**
     * Removes an item from the cart
     * @param {string} cartID - The ID of the item to be removed
     */
    function removeFromCart(cartID) {
        console.log("remove from cart clicked ->", cartID);

        let newCart = {...cart};
        newCart.total[0] -= newCart.items[cartID][2];
        if (newCart.items[cartID][1] > 1)
            newCart.items[cartID][1] -= 1;
        else
            delete newCart.items[cartID];

        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    };

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

export default Order;
