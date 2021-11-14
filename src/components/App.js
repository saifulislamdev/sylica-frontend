import { ChakraProvider } from '@chakra-ui/react';
import { Container } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Checkout from './Checkout/Checkout';
import LogIn from './LogIn/LogIn';
import Navbar from './Navbar/Navbar';
import SignUp from './SignUp/SignUp';
import Product from '../pages/Product';
import ProductListing from './Product/ProductListing';

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
                        <Route path='/products/:id' exact>
                            <Product />
                        </Route>
                        <Route path='/checkout' exact>
                            <Checkout />
                        </Route>
                        {/* TODO: remove later (temporary) */}
                        <Route path='/product/product-listing' exact>
                            <ProductListing
                                description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                                imageSrc='https://helios-i.mashable.com/imagery/reviews/03y8gbj1mqCuexgXxFJ5vyX/hero-image.fill.size_1248x702.v1623391330.jpg'
                                price='1'
                                quantity='20'
                                title='Product Title'
                            />
                        </Route>
                        {/* temporary */}
                    </Switch>
                </Router>
            </Container>
        </ChakraProvider>
    );
}

export default App;
