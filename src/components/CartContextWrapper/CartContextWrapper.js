import React, { useState } from "react";

import { CartContext } from "../../util/context";

export const CartContextWrapper = ({ children }) => {
  const [cart, setCart] = useState([
    {
      id: 1,
      unitPrice: 1200,
      quantity: 1,
      imageURL:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bWFjYm9vayUyMHByb3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
      title: "Macbook Pro",
      description: "Lorem ipsum dolor sit amet",
    },
    {
      id: 2,
      unitPrice: 599.99,
      quantity: 1,
      imageURL:
        "https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/Apple-iPhone-12-mini/PRODUCT-RED/Apple-iPhone-12-mini-PRODUCT-RED-frontimage.png",
      title: "Iphone 11",
      description: "Lorem ipsum dolor sit amet",
    },
    {
      id: "sfsfsf",
      unitPrice: 699.99,
      quantity: 1,
      imageURL:
        "https://90a1c75758623581b3f8-5c119c3de181c9857fcb2784776b17ef.ssl.cf2.rackcdn.com/630282_195107_01_front_thumbnail.jpg",
      title: "Ryzen 9 5950x",
      description: "Lorem ipsum dolor sit amet",
    },
    {
      id: 4,
      unitPrice: 5,
      quantity: 1,
      imageURL: "https://bit.ly/2Z4KKcF",
      title: "Product Title 4",
      description: "Lorem ipsum dolor sit amet",
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
