import { ChakraProvider } from '@chakra-ui/react';
import { Container } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { CartContextWrapper } from './CartContextWrapper/CartContextWrapper';
import Cart from './Cart/Cart';
import Checkout from './Checkout/Checkout';
import Home from '../pages/Home';
import LogIn from './LogIn/LogIn';
import Navbar from './Navbar/Navbar';
import Product from '../pages/Product';
import Products from '../pages/Products';
import SignUp from './SignUp/SignUp';

import '../styles/App.css';

function App() {
    return (
        <CartContextWrapper>
            <ChakraProvider>
                <Container maxWidth='container.xl' p={0}>
                    <Navbar />
                    <Router>
                        <Switch>
                            <Route path='/auth/signin' exact>
                                <LogIn />
                            </Route>
                            <Route path='/auth/signup' exact>
                                <SignUp />
                            </Route>
                            <Route path='/cart' exact>
                                <Cart />
                            </Route>
                            <Route path='/checkout' exact>
                                <Checkout />
                            </Route>
                            <Route path='/home' exact>
                                <Home />
                            </Route>
                            <Route path='/products' exact>
                                <Products />
                            </Route>
                            <Route path='/products/:id' exact>
                                <Product />
                            </Route>
                        </Switch>
                    </Router>
                </Container>
            </ChakraProvider>
        </CartContextWrapper>
    );
}

export default App;
