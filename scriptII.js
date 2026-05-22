"use strict";
let cashInRegister = 100;
let nextOrderId = 1;
let nextPizzaId = 1;
const menu = [
    { id: nextPizzaId++, name: "Margherita", price: 8 },
    { id: nextPizzaId++, name: "Pepperoni", price: 10 },
    { id: nextPizzaId++, name: "Hawaiian", price: 10 },
    { id: nextPizzaId++, name: "Veggie", price: 9 },
];
const orderQueue = [];
function addNewPizza(pizzaObj) {
    menu.push(pizzaObj);
    return pizzaObj;
}
function placeOrder(pizza) {
    const newOrder = { id: nextOrderId++, pizza: pizza, status: "ordered" };
    orderQueue.push(newOrder);
    cashInRegister += pizza.price;
    return newOrder;
}
function addToArray(array, item) {
    array.push(item);
    return array;
}
// example usage:
addToArray(menu, { id: nextPizzaId++, name: "Chicken Bacon Ranch", price: 12 });
addToArray(orderQueue, { id: nextOrderId++, pizza: menu[2], status: "completed" });
function completeOrder(orderId) {
    const order = orderQueue.find(order => order.id === orderId);
    if (!order) {
        console.error(`${orderId} was not found in the orderQueue`);
        return;
    }
    order.status = "completed";
    return order;
}
function getPizzaDetail(identifier) {
    if (typeof identifier === "string") {
        return menu.find(pizza => pizza.name.toLowerCase() === identifier.toLowerCase());
    }
    else if (typeof identifier === "number") {
        return menu.find(pizza => pizza.id === identifier);
    }
    else {
        throw new TypeError("Parameter `identifier` must be either a string or a number");
    }
}
// addNewPizza({ id: nextPizzaId++, name: "Chicken Bacon Ranch", price: 12 })
// addNewPizza({ id: nextPizzaId++, name: "BBQ Chicken", price: 12 })
// addNewPizza({ id: nextPizzaId++, name: "Spicy Sausage", price: 11 })
//# sourceMappingURL=scriptII.js.map