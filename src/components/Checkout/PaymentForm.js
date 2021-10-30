import {
	Box,
	Input,
	InputGroup,
	Stack,
	InputLeftElement,
	Button,
	useToast,
	useToken,
	Alert,
	AlertIcon,
	ScaleFade,
	Center,
	Spinner,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';

const PROXY = process.env.REACT_APP_PROXY;

const PaymentForm = () => {
	// Simple cardError state to show error from stripe card element
	const [cardError, setCardError] = useState('');
	const [clientSecret, setClientSecret] = useState('');

	// Init stripe and do some magic here
	const stripe = useStripe();
	const elements = useElements();

	const createPaymentIntent = async () => {
		const res = await axios.post(
			PROXY + '/api/payment/create-payment-intent',
			{
				amount: 1000,
			}
		);
		const { clientSecret: clientSecretRes } = await res.data;
		setClientSecret(clientSecretRes);
		console.log(clientSecretRes);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!stripe || !elements || cardError || !clientSecret) {
			console.log('Error');
			return;
		}

		try {
			const { error, paymentMethod } = await stripe.createPaymentMethod({
				type: 'card',
				card: elements.getElement(CardElement),
			});
			if (error) {
				throw error;
			}
			console.log('successful payment', paymentMethod);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		createPaymentIntent();
	}, []);

	return (
		<form onSubmit={handleSubmit}>
			<CardElement />
			<Button type='submit' disabled={!stripe || !elements}>
				Pay
			</Button>
		</form>
	);
};

export default PaymentForm;
