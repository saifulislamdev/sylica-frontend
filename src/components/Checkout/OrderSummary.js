import React, { useState, useEffect } from 'react';
import {
	Heading,
	VStack,
	SimpleGrid,
	GridItem,
	Text,
	Button,
	Divider,
} from '@chakra-ui/react';
import { colors } from '../../util/Constants';

import { useStripe, useElements } from '@stripe/react-stripe-js';

const OrderSummary = () => {
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		setIsLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: 'http://localhost:3000/checkout',
			},
		});

		// This point will only be reached if there is an immediate error when
		// confirming the payment. Otherwise, your customer will be redirected to
		// your `return_url`. For some payment methods like iDEAL, your customer will
		// be redirected to an intermediate site first to authorize the payment, then
		// redirected to the `return_url`.
		if (error.type === 'card_error' || error.type === 'validation_error') {
			setMessage(error.message);
		} else {
			setMessage('An unexpected error occured.');
		}

		setIsLoading(false);
	};

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			'payment_intent_client_secret'
		);

		if (!clientSecret) {
			return;
		}

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			switch (paymentIntent.status) {
				case 'succeeded':
					setMessage('Payment succeeded!');
					break;
				case 'processing':
					setMessage('Your payment is processing.');
					break;
				case 'requires_payment_method':
					setMessage('Your payment was not successful, please try again.');
					break;
				default:
					setMessage('Something went wrong.');
					break;
			}
		});
	}, [stripe]);

	return (
		<VStack
			w='full'
			p={10}
			spacing={10}
			alignItems='flex-start'
			style={{
				border: '2px solid #E2E8F0',
				borderRadius: '25px',
			}}
		>
			<Heading size='xl'>Order Summary</Heading>
			<SimpleGrid columns={2} rowGap={6} columnGap={2} w='full'>
				<GridItem colSpan={1}>
					<Text>{`Items(00):`}</Text>
				</GridItem>
				<GridItem colSpan={1}>
					<Text>{`$ 000.00`}</Text>
				</GridItem>
				<GridItem colSpan={1}>
					<Text>{`Shipping and handling:`}</Text>
				</GridItem>
				<GridItem colSpan={1}>
					<Text>{`$ 00.00`}</Text>
				</GridItem>
				<GridItem colSpan={1}>
					<Text>{`Tax:`}</Text>
				</GridItem>
				<GridItem colSpan={1}>
					<Text>{`$ 00.00`}</Text>
				</GridItem>
				<GridItem colSpan={2}>
					<Divider />
				</GridItem>
				<GridItem colSpan={1}>
					<Heading size='l'>Order total:</Heading>
				</GridItem>
				<GridItem colSpan={1}>
					<Heading size='l'>{`$ 00.00`}</Heading>
				</GridItem>
				<GridItem colSpan={2}>
					<Button
						disabled={isLoading || !stripe || !elements}
						size='md'
						w='full'
						bg={colors.primary}
						color='white'
						onClick={handleSubmit}
					>
						<span id='button-text'>
							{isLoading ? (
								<div className='spinner' id='spinner'></div>
							) : (
								'Place Order'
							)}
						</span>
					</Button>
				</GridItem>
				<GridItem colSpan={2}>
					{message && (
						<div
							style={{
								color: 'rgb(105, 115, 134)',
								fontSize: '16px',
								lineHeight: '20px',
								paddingTop: '12px',
								textAlign: 'center',
							}}
						>
							{message}
						</div>
					)}
				</GridItem>
			</SimpleGrid>
		</VStack>
	);
};

export default OrderSummary;
