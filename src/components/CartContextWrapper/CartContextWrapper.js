import React, { useState, useEffect } from 'react';

import { CartContext } from '../../util/context';

export const CartContextWrapper = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => {
        if (window.localStorage.getItem('cart')) {
            setCart(JSON.parse(window.localStorage.getItem('cart')));
        }
        if (window.localStorage.getItem('token')) {
            setToken(JSON.parse(window.localStorage.getItem('token')));
        }
    }, []);

    const calculateTotalItemsInCart = () => {
        return cart.reduce(
            (accum, product) => accum + parseInt(product.quantity),
            0
        );
    };

    const calculateTotalPriceInCart = () => {
        return cart
            .reduce(
                (accum, product) =>
                    accum +
                    parseInt(product.quantity) * parseFloat(product.unitPrice),
                0
            )
            .toFixed(2);
    };

    const handleAddQuantity = (id, newQuantity) => {
        try {
            let newCart = [...cart];
            newCart.forEach((product) => {
                if (product.id === id) {
                    product.quantity = newQuantity;
                }
            });
            window.localStorage.setItem('cart', JSON.stringify(newCart));
            setCart(newCart);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddToCart = ({
        id,
        quantity,
        unitPrice,
        imageURL,
        title,
        description,
    }) => {
        const newProduct = {
            id,
            unitPrice,
            quantity,
            imageURL,
            title,
            description,
        };
        window.localStorage.setItem(
            'cart',
            JSON.stringify([...cart, newProduct])
        );
        setCart([...cart, newProduct]);
    };

    const handleRemoveItemFromCart = (id) => {
        const newCart = cart.filter((product) => product.id !== id);
        window.localStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                token,
                setCart,
                setToken,
                calculateTotalItemsInCart,
                handleAddQuantity,
                handleAddToCart,
                handleRemoveItemFromCart,
                calculateTotalPriceInCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
