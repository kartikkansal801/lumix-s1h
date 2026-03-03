"use client";

import { createContext, Dispatch, SetStateAction } from "react";

export interface CartItem {
    name: string;
    variant: string;
    price: string;
    priceNum: number;
    image: string;
}

interface CartContextType {
    cartItems: CartItem[];
    setCartItems: Dispatch<SetStateAction<CartItem[]>>;
    cartOpen: boolean;
    setCartOpen: Dispatch<SetStateAction<boolean>>;
    addToCart: (item: CartItem) => void;
}

export const CartContext = createContext<CartContextType>({
    cartItems: [],
    setCartItems: () => { },
    cartOpen: false,
    setCartOpen: () => { },
    addToCart: () => { },
});
