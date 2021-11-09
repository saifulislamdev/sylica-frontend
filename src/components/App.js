import { ChakraProvider } from '@chakra-ui/react';
import { Container } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Checkout from './Checkout/Checkout';
import LogIn from './LogIn/LogIn';
import Navbar from './Navbar/Navbar';
import SignUp from './SignUp/SignUp';
import ProductDetail from './Product/ProductDetail';
import ProductDetailImages from './Product/ProductDetailImages';
import Specifications from './Product/Specifications';

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
                        {/* TODO: remove later (temporary) */}
                        <Route path='/product/product-details' exact>
                            <ProductDetail
                                productTitle='Product Title'
                                productDescription='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                                price='0.00'
                                maxQuantity='20'
                            />
                        </Route>
                        <Route path='/product/product-specifications' exact>
                            <Specifications
                                specifications={[
                                    { Text: [{ a: 'b' }] },
                                    { Text: [{ cd: 'ef' }, { gh: 'ij' }] },
                                    { Text: [{ klm: 'nop' }, { qrs: 'tuv' }] },
                                    {
                                        Text: [
                                            { w: 'x' },
                                            { y: 'z' },
                                            { z: 'z' },
                                        ],
                                    },
                                ]}
                            />
                        </Route>
                        <Route path='/product/product-detail-images' exact>
                            <ProductDetailImages
                                images={[
                                    {
                                        name: 'Macbook Air',
                                        src: 'https://helios-i.mashable.com/imagery/reviews/03y8gbj1mqCuexgXxFJ5vyX/hero-image.fill.size_1248x702.v1623391330.jpg',
                                    },
                                    {
                                        name: 'Another Cool Macbook Air',
                                        src: 'https://m.media-amazon.com/images/I/71vFKBpKakL._AC_SL1500_.jpg',
                                    },
                                    {
                                        name: 'M1 Macbook Air',
                                        src: 'https://images.macrumors.com/t/KQrinkLLQlIz7W4LsVDGL2JzK64=/1600x0/article-new/2013/09/m1-macbook-air-design.jpg',
                                    },
                                    {
                                        name: 'Space Gray Macbook Air',
                                        src: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/refurb-macbook-air-space-gray-202002_AV2?wid=1000&hei=1000&fmt=jpeg&qlt=95&.v=1592436917000',
                                    },
                                    {
                                        name: 'Another M1 Macbook Air',
                                        src: 'https://photos5.appleinsider.com/gallery/39133-74930-M1-MacBook-Air-Thumbnail-xl.jpg',
                                    },
                                    {
                                        name: '2022 Macbook Air',
                                        src: 'https://telecomtalk.info/wp-content/uploads/2021/10/macbook-air-2022-might-not-be-much.jpeg',
                                    },
                                ]}
                            ></ProductDetailImages>
                        </Route>
                        {/* temporary */}
                    </Switch>
                </Router>
            </Container>
        </ChakraProvider>
    );
}

export default App;
