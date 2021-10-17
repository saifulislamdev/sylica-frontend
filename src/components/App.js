import '../styles/App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Container } from '@chakra-ui/react';
import SignUp from './SignUp/SignUp';
import LogIn from './LogIn/LogIn';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
	return (
		<ChakraProvider>
			<Container maxWidth='container.xl' p={0}>
				<Router>
					<Switch>
						<Route path='/auth/signup' exact>
							<SignUp />
						</Route>
						<Route path='/auth/signin' exact>
							<LogIn />
						</Route>
					</Switch>
				</Router>
			</Container>
		</ChakraProvider>
	);
}

export default App;
