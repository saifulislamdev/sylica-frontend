import React, { useState } from 'react';

import { CartContext } from '../../util/context';

export const CartContextWrapper = ({ children }) => {
  const [cart, setCart] = useState([]);

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
    const newCart = [...cart, newProduct];
    console.log(newCart);
    setCart(newCart);
  };

  const handleRemoveItemFromCart = (id) => {
    const newCart = cart.filter((product) => product.id !== id);
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
