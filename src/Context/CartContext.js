import { createContext } from "react";

export const CartContext = createContext({
    cartItem: null,
    cartType: null,
    addToCart:()=>{},
    removeFromCart:()=>{},
})
