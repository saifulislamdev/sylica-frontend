import React, { useState, useEffect } from 'react';

import { CartContext } from '../../util/context';

export const CartContextWrapper = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (window.localStorage.getItem('cart')) {
      setCart(JSON.parse(window.localStorage.getItem('cart')));
    }
  }, []);

  const calculateTotalItemsInCart = () => {
    let totalItem = 0;
    try {
      cart.forEach((product) => {
        totalItem = totalItem + parseInt(product.quantity);
      });
      return totalItem;
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotalPriceInCart = () => {
    let totalPrice = 0;
    try {
      cart.forEach((product) => {
        totalPrice =
          totalPrice + product.quantity * parseFloat(product.unitPrice);
      });
      return totalPrice.toFixed(2);
    } catch (error) {
      console.log(error);
    }
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
    window.localStorage.setItem('cart', JSON.stringify([...cart, newProduct]));
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
        setCart,
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
