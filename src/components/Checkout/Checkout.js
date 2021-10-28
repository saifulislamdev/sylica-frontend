import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import OrderSummary from './OrderSummary';
import {
	Heading,
	Flex,
	VStack,
	SimpleGrid,
	GridItem,
	FormControl,
	FormLabel,
	Input,
	Text,
} from '@chakra-ui/react';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe(
	'pk_test_51IlQGnEwHOsES7xUluOPPi4TS3wGXqraJVNWZvGMNlEY9HAg0ust8ilDKraQEV5T891nLuYgGoUP1FZAZtMRh5Oi00FpRjnaCu' ??
		''
);

const Checkout = () => {
	const [clientSecret, setClientSecret] = useState('');

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		axios
			.post('http://localhost:4242/api/checkout/create-payment-intent', {
				amount: 1000,
			})
			.then((res) => setClientSecret(res.data.clientSecret));
	}, []);

	const appearance = {
		theme: 'stripe',
	};
	const options = {
		clientSecret,
		appearance,
	};

	return (
		<div>
			{clientSecret && (
				<Elements options={options} stripe={stripePromise}>
					<Flex h='100vh' py={20}>
						<SimpleGrid columns={3} rowGap={6} columnGap={3} w='full'>
							<GridItem colSpan={2}>
								<VStack
									w='full'
									h='full'
									p={10}
									spacing={10}
									alignItems='flex-start'
									style={{
										border: '2px solid #E2E8F0',
										borderRadius: '25px',
									}}
								>
									<Heading size='2xl'>Payment Details</Heading>
									<Text>
										Complete your order by providing your payment details
									</Text>
									<div style={{ width: '100%' }}>
										<SimpleGrid columns={2} rowGap={6} columnGap={3} w='full'>
											<GridItem colSpan={2}>
												<Heading size='xl'>Personal Details</Heading>
											</GridItem>
											<GridItem colSpan={1}>
												<FormControl isRequired>
													<FormLabel htmlFor='first-name'>First Name</FormLabel>
													<Input
														id='first-name'
														placeholder='First Name'
														type='text'
														// onChange={(e) => setFirstName(e.target.value)}
													></Input>
												</FormControl>
											</GridItem>
											<GridItem colSpan={1}>
												<FormControl isRequired>
													<FormLabel htmlFor='last-name'>Last Name</FormLabel>
													<Input
														id='last-name'
														placeholder='Last Name'
														type='text'
														// onChange={(e) => setLastName(e.target.value)}
													></Input>
												</FormControl>
											</GridItem>
											<GridItem colSpan={1}>
												<FormControl isRequired>
													<FormLabel htmlFor='email'>Email</FormLabel>
													<Input
														id='email'
														placeholder='Email'
														type='email'
														// onChange={(e) => setEmail(e.target.value)}
													></Input>
												</FormControl>
											</GridItem>
											<GridItem colSpan={1}>
												<FormControl isRequired>
													<FormLabel htmlFor='number'>Phone Number</FormLabel>
													<Input
														id='number'
														placeholder='(987) 654 -3210'
														type='text'
														// onChange={(e) => setEmail(e.target.value)}
													></Input>
												</FormControl>
											</GridItem>
											<GridItem colSpan={2}>
												<Heading size='xl'>Shipping Details</Heading>
											</GridItem>
											<GridItem colSpan={2}>
												<FormControl isRequired>
													<FormLabel htmlFor='street-address'>
														Street address
													</FormLabel>
													<Input
														id='street-address'
														placeholder='Street address'
														type='text'
														// onChange={(e) => setPassword(e.target.value)}
													></Input>
												</FormControl>
											</GridItem>
											<GridItem colSpan={2}>
												<FormControl isRequired>
													<FormLabel htmlFor='building-number'>
														Building, floor, apt, suite
													</FormLabel>
													<Input
														id='building-number'
														placeholder='Building, floor, apt, suite'
														type='text'
														// onChange={(e) => setRepeatPassword(e.target.value)}
													></Input>
												</FormControl>
											</GridItem>
											<GridItem colSpan={2}>
												<SimpleGrid
													columns={3}
													rowGap={6}
													columnGap={3}
													w='full'
												>
													<GridItem colSpan={1}>
														<FormControl isRequired>
															<FormLabel htmlFor='city'>City</FormLabel>
															<Input
																id='city'
																placeholder='City'
																type='text'
																// onChange={(e) => setRepeatPassword(e.target.value)}
															></Input>
														</FormControl>
													</GridItem>
													<GridItem colSpan={1}>
														<FormControl isRequired>
															<FormLabel htmlFor='zipcode'>Zip Code</FormLabel>
															<Input
																id='zipcode'
																placeholder='Zip Code'
																type='text'
																// onChange={(e) => setRepeatPassword(e.target.value)}
															></Input>
														</FormControl>
													</GridItem>
													<GridItem colSpan={1}>
														<FormControl isRequired>
															<FormLabel htmlFor='state'>State</FormLabel>
															<Input
																id='state'
																placeholder='State'
																type='text'
																// onChange={(e) => setRepeatPassword(e.target.value)}
															></Input>
														</FormControl>
													</GridItem>
												</SimpleGrid>
											</GridItem>
											<GridItem colSpan={2}>
												<Heading size='xl'>Payment Details</Heading>
												<Text>Pay with credit card via Stripe</Text>
											</GridItem>
											<GridItem colSpan={2}>
												<PaymentForm />
											</GridItem>
										</SimpleGrid>
									</div>
								</VStack>
							</GridItem>
							<GridItem colSpan={1}>
								<OrderSummary />
							</GridItem>
						</SimpleGrid>
					</Flex>
				</Elements>
			)}
		</div>
	);
};

export default Checkout;
