type Pizza = {
    id: number;
    name: string;
    price: number;
};
type Order = {
    id: number;
    pizza: Pizza;
    status: "ordered" | "completed";
};
declare let cashInRegister: number;
declare let nextOrderId: number;
declare let nextPizzaId: number;
declare const menu: Pizza[];
declare const orderQueue: Order[];
declare function addNewPizza(pizzaObj: Pizza): Pizza;
declare function placeOrder(pizza: Pizza): Order | undefined;
declare function addToArray<Type>(array: Type[], item: Type): Type[];
declare function completeOrder(orderId: number): Order | undefined;
declare function getPizzaDetail(identifier: string | number): Pizza | undefined;
//# sourceMappingURL=scriptII.d.ts.map