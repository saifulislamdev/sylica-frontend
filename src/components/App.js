import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CartContext } from "../util/context";
import Checkout from "./Checkout/Checkout";
import LogIn from "./LogIn/LogIn";
import Navbar from "./Navbar/Navbar";
import SignUp from "./SignUp/SignUp";
import ProductDetail from "./Product/ProductDetail";
import Specifications from "./Product/Specifications";
import "../styles/App.css";

function App() {
  const [cart, setCart] = useState([
    {
      id: 1,
      unitPrice: 1200,
      quantity: 1,
      maxQuantity: 5,
      imageURL:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bWFjYm9vayUyMHByb3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
      title: "Macbook Pro",
      description: "Lorem ipsum dolor sit amet",
    },
    {
      id: 2,
      unitPrice: 599.99,
      quantity: 1,
      maxQuantity: 2,
      imageURL:
        "https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/Apple-iPhone-12-mini/PRODUCT-RED/Apple-iPhone-12-mini-PRODUCT-RED-frontimage.png",
      title: "Iphone 11",
      description: "Lorem ipsum dolor sit amet",
    },
    {
      id: 3,
      unitPrice: 699.99,
      quantity: 1,
      maxQuantity: 5,
      imageURL:
        "https://90a1c75758623581b3f8-5c119c3de181c9857fcb2784776b17ef.ssl.cf2.rackcdn.com/630282_195107_01_front_thumbnail.jpg",
      title: "Ryzen 9 5950x",
      description: "Lorem ipsum dolor sit amet",
    },
    {
      id: 4,
      unitPrice: 5,
      quantity: 1,
      maxQuantity: 1,
      imageURL: "https://bit.ly/2Z4KKcF",
      title: "Product Title 4",
      description: "Lorem ipsum dolor sit amet",
    },
  ]);

  const calculateTotalItemsInCart = () => {
    let totalItem = 0;
    cart.forEach((product) => {
      totalItem = totalItem + product.quantity;
    });
    return totalItem;
  };

  const handleAddQuantity = (id, newQuantity) => {
    let newCart = [...cart];
    newCart.forEach((product) => {
      if (product.id === id) {
        product.quantity = newQuantity;
      }
    });
    setCart(newCart);
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, calculateTotalItemsInCart, handleAddQuantity }}
    >
      <ChakraProvider>
        <Container maxWidth="container.xl" p={0}>
          <Navbar />
          <Router>
            <Switch>
              <Route path="/auth/signup" exact>
                <SignUp />
              </Route>
              <Route path="/auth/signin" exact>
                <LogIn />
              </Route>
              <Route path="/checkout" exact>
                <Checkout />
              </Route>
              {/* TODO: remove later (temporary) */}
              <Route path="/product/product-details" exact>
                <ProductDetail
                  productTitle="Product Title"
                  productDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                  price="0.00"
                  maxQuantity="20"
                />
              </Route>
              <Route path="/product/product-specifications" exact>
                <Specifications
                  specifications={[
                    {
                      heading: "General",
                      rows: [
                        ["a", "b"],
                        ["c", "d"],
                        ["e", "f"],
                      ],
                    },
                    {
                      heading: "CPU",
                      rows: [
                        ["g", "h"],
                        ["i", "j"],
                        ["k", "l"],
                      ],
                    },
                    {
                      heading: "Screen",
                      rows: [
                        ["m", "n"],
                        ["o", "p"],
                        ["q", "r"],
                      ],
                    },
                  ]}
                />
              </Route>
              {/* temporary */}
            </Switch>
          </Router>
        </Container>
      </ChakraProvider>
    </CartContext.Provider>
  );
}

export default App;
