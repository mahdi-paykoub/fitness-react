import { createContext } from "react";

export const CartContext = createContext({
    cartItem: [],
    addToCart:()=>{},
    removeFromCart:()=>{},
})
