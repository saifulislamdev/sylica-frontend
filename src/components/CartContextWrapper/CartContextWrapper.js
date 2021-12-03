import React, { useState } from 'react';

import { CartContext } from '../../util/context';

export const CartContextWrapper = ({ children }) => {
  const [cart, setCart] = useState([
    {
      id: 1,
      title: 'Macbook pro 14 inches',
      imageURL:
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202110?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1632788573000',
      description: 'lorem ipsam',
      unitPrice: 1999.99,
      quantity: 1,
    },
  ]);

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
      setCart(
        cart.map((product) =>
          product.id === id ? { ...product, quantity: newQuantity } : product
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (
    id,
    quantity,
    unitPrice,
    imageURL,
    title,
    description
  ) => {
    try {
      const newProduct = {
        id,
        unitPrice,
        quantity,
        imageURL,
        title,
        description,
      };
      setCart((cart) => [...cart, newProduct]);
    } catch (error) {
      console.log(error);
    }
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
