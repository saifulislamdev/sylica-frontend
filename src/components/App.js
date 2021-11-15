import { ChakraProvider } from '@chakra-ui/react';
import { Container } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Checkout from './Checkout/Checkout';
import LogIn from './LogIn/LogIn';
import Navbar from './Navbar/Navbar';
import Product from '../pages/Product';
import Products from '../pages/Products';
import SignUp from './SignUp/SignUp';

import '../styles/App.css';

function App() {
    return (
        <ChakraProvider>
            <Container maxWidth='container.xl' p={0}>
                <Navbar />
                <Router>
                    <Switch>
                        <Route path='/auth/signup' exact>
                            <SignUp />
                        </Route>
                        <Route path='/auth/signin' exact>
                            <LogIn />
                        </Route>
                        <Route path='/checkout' exact>
                            <Checkout />
                        </Route>
                        <Route path='/products/:id' exact>
                            <Product />
                        </Route>
                        <Route path='/products' exact>
                            <Products />
                        </Route>
                    </Switch>
                </Router>
            </Container>
        </ChakraProvider>
    );
}

export default App;
