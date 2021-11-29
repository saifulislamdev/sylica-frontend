import { ChakraProvider } from '@chakra-ui/react';
import { Redirect } from 'react-router';
import { Container } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { CartContextWrapper } from './CartContextWrapper/CartContextWrapper';
import Cart from './Cart/Cart';
import Checkout from './Checkout/Checkout';
import LogIn from './LogIn/LogIn';
import Navbar from './Navbar/Navbar';
import Product from '../pages/Product';
import Products from '../pages/Products';
import ProductListingForm from './CreateProductListingForm/ProductListingForm';
import SignUp from './SignUp/SignUp';
import NotFound from '../pages/404';

import '../styles/App.css';
import ProductListing from './Product/ProductListing';

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
							<Route path='/products' exact>
								<Products />
							</Route>
							<Route path='/products/:id' exact>
								<Product />
							</Route>
							<Route path='/create-listing' exact>
								<ProductListingForm />
							</Route>
							<Route path='/404' exact>
								<NotFound />
							</Route>
							<Redirect from='*' to='/404' exact />
						</Switch>
					</Router>
				</Container>
			</ChakraProvider>
		</CartContextWrapper>
	);
}

export default App;
