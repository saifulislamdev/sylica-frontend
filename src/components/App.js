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
import Cart from "./Cart/Cart";

import "../styles/App.css";

function App() {
  const [cart, setCart] = useState([]);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
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
              <Route path="/cart" exact>
                <Cart />
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
