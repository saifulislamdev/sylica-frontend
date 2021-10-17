import React, { useState } from 'react';
import SVG from '../../assets/login.svg';
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
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';

export default function SignUp() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [error, setError] = useState(false); // if any input validation error occur

	// input validation schema
	const signupSchema = Yup.object().shape({
		firstName: Yup.string().max(50).required(),
		lastName: Yup.string().max(50).required(),
		email: Yup.string().email().required(),
		password: Yup.string().min(8).max(50).required(),
		repeatPassword: Yup.string()
			.oneOf([Yup.ref('password'), null])
			.required(),
	});

	const handleClick = async (e) => {
		e.preventDefault();
		setError(false); // resetting the error messgae
		const isValid = await signupSchema.isValid({
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password,
			repeatPassword: repeatPassword,
		});

		if (isValid) {
			const URI = 'http://localhost:5000/api/auth/signup'; // URI is subject to change
			axios
				.post(URI, {
					firstName: firstName,
					lastName: lastName,
					email: email,
					password: password,
				})
				.then((response) => console.log(response.data))
				.catch((err) => console.log(err));
		} else {
			setError(true); // indicates one or more field doesnt meet requirement
		}
	};

	return (
		<Flex h='100vh' py={20}>
			<VStack
				w='full'
				h='full'
				p={10}
				spacing={10}
				alignItems='flex-start'
				bg='gray.50'
			>
				<Heading size='2xl'>
					"Lorem ipsum dolor sit amet, consectetur. Lorem ipsum lorem ipsum"
				</Heading>
				<Image src={SVG} alt='log-in-svg' boxSize='sm' />
			</VStack>
			<VStack w='full' h='full' p={10} spacing={10} alignItems='flex-start'>
				<Heading size='2xl'>Create an account</Heading>
				<form style={{ width: '100%' }} onSubmit={handleClick}>
					<SimpleGrid columns={2} rowGap={6} columnGap={3} w='full'>
						<GridItem colSpan={1}>
							<FormControl isRequired>
								<FormLabel htmlFor='first-name'>First Name</FormLabel>
								<Input
									id='first-name'
									placeholder='First Name'
									type='text'
									onChange={(e) => setFirstName(e.target.value)}
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
									onChange={(e) => setLastName(e.target.value)}
								></Input>
							</FormControl>
						</GridItem>
						<GridItem colSpan={2}>
							<FormControl isRequired>
								<FormLabel htmlFor='email'>Email</FormLabel>
								<Input
									id='email'
									placeholder='Email'
									type='email'
									onChange={(e) => setEmail(e.target.value)}
								></Input>
							</FormControl>
						</GridItem>
						<GridItem colSpan={2}>
							<FormControl isRequired>
								<FormLabel htmlFor='password'>Password</FormLabel>
								<Input
									id='password'
									placeholder='Password'
									type='password'
									onChange={(e) => setPassword(e.target.value)}
								></Input>
								<Text color='#718096'>
									Password must be at least 8 characters long
								</Text>
							</FormControl>
						</GridItem>
						<GridItem colSpan={2}>
							<FormControl isRequired>
								<FormLabel htmlFor='repeat-password'>Repeat Password</FormLabel>
								<Input
									id='repeat-password'
									placeholder='Repeat Password'
									type='password'
									onChange={(e) => setRepeatPassword(e.target.value)}
								></Input>
							</FormControl>
						</GridItem>
						<GridItem colSpan={2}>
							<Button
								type='submit'
								size='lg'
								w='full'
								bg='#718096'
								color='white'
							>
								Create Account
							</Button>
						</GridItem>
						<GridItem colSpan={2}>
							<Text>
								Already a member?{' '}
								<Link to='/auth/signin' style={{ textDecoration: 'underline' }}>
									Sign In
								</Link>
							</Text>
							{error ? (
								<Text style={{ color: 'red' }}>One or more invalid input</Text>
							) : null}
						</GridItem>
					</SimpleGrid>
				</form>
			</VStack>
		</Flex>
	);
}
