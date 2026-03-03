"use client";

import React, { useState } from "react";
import { CartContext, CartItem } from "../context/CartContext";

export default function Providers({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cartOpen, setCartOpen] = useState(false);

    function addToCart(item: CartItem) {
        setCartItems(prev => [...prev, item]);
        setCartOpen(true);
    }

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, cartOpen, setCartOpen, addToCart }}>
            {children}
        </CartContext.Provider>
    );
}
