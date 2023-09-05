import React, { createContext, useState, useEffect } from "react";
import { useCookies } from 'react-cookie';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cookies, setCookie, removeCookie] = useCookies(['isAuth']);
    const [isAuth, setIsAuth] = useState(cookies.isAuth || false);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        setCookie('isAuth', isAuth, { path: '/' });
    }, [isAuth, setCookie]);

    return (
        <CartContext.Provider value={{ setIsAuth, isAuth, recipes, setRecipes }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;
