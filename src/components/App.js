import '../styles/App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Container } from '@chakra-ui/react';
import SignUp from './SignUp/SignUp';
import LogIn from './LogIn/LogIn';
import Checkout from './Checkout/Checkout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar/Navbar';

const App = () => {
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
					</Switch>
				</Router>
			</Container>
		</ChakraProvider>
	);
};

export default App;
