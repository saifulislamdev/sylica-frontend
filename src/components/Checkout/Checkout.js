import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import {
	Heading,
	Flex,
	VStack,
	Image,
	SimpleGrid,
	GridItem,
	FormControl,
	FormLabel,
	Input,
	Text,
	Button,
} from '@chakra-ui/react';

const Checkout = () => {
	return (
		<Flex h='100vh' py={4} style={{ border: '1px solid gray.50' }}>
			<VStack>checkout</VStack>
		</Flex>
	);
};

export default Checkout;
