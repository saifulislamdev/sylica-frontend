import React, { useState, useContext } from 'react';
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
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { axiosInstance } from '../../util/config';
import { CartContext } from '../../util/context';
import { colors } from '../../util/constants';

export default function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false); // if any input validation error occur
    const [errorMessage, setErrorMessage] = useState('');
    const history = useHistory();

    const { setToken } = useContext(CartContext);

    // input validation schema
    const logInSchema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().min(8).required(),
    });

    const handleClick = async (e) => {
        e.preventDefault();
        setError(false); // resetting the error messgae
        setErrorMessage(''); // resetting error message
        const isValid = await logInSchema.isValid({
            email: email,
            password: password,
        });

        if (isValid) {
            axiosInstance
                .post('/auth/signin', {
                    email: email,
                    password: password,
                })
                .then((response) => {
                    window.localStorage.setItem(
                        'token',
                        JSON.stringify(response.data.token)
                    );
                    window.localStorage.setItem(
                        'user',
                        JSON.stringify(response.data.user)
                    );
                    setToken(response.data.token);
                    history.push('/cart');
                })
                .catch((err) => {
                    setErrorMessage(err.response.data.msg); // msg is the field for error message from backend
                    setError(true);
                });
        } else {
            setError(true); // indicates one or more field doesnt meet requirement
            setErrorMessage('One or more input is invalid');
        }
    };

    return (
        <div>
            <Flex h='100vh' py={20}>
                <VStack
                    w='full'
                    h='full'
                    p={10}
                    spacing={10}
                    alignItems='flex-start'
                    bg='gray.50'
                >
                    <Heading size='2xl' lineHeight={1.5}>
                        "Every purchase will be made easy with Sylica"
                    </Heading>
                    <Image src={SVG} alt='log-in-svg' boxSize='sm' />
                </VStack>
                <VStack
                    w='full'
                    h='full'
                    p={10}
                    spacing={10}
                    alignItems='flex-start'
                >
                    <Heading size='2xl'>Sign In</Heading>

                    <form onSubmit={handleClick} style={{ width: '100%' }}>
                        <SimpleGrid
                            columns={2}
                            rowGap={6}
                            columnGap={3}
                            w='full'
                        >
                            <GridItem colSpan={2}>
                                <FormControl isRequired>
                                    <FormLabel htmlFor='email'>Email</FormLabel>
                                    <Input
                                        id='email'
                                        placeholder='Email'
                                        type='email'
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    ></Input>
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <FormControl isRequired>
                                    <FormLabel htmlFor='password'>
                                        Password
                                    </FormLabel>
                                    <Input
                                        id='password'
                                        placeholder='Password'
                                        type='password'
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    ></Input>
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <Button
                                    size='lg'
                                    w='full'
                                    colorScheme={colors.colorScheme}
                                    type='submit'
                                >
                                    Sign In
                                </Button>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <Text>
                                    Not a member?{' '}
                                    <Link
                                        to='/auth/signup'
                                        style={{ textDecoration: 'underline' }}
                                    >
                                        Sign Up
                                    </Link>
                                </Text>
                                {error ? (
                                    <Text style={{ color: 'red' }}>
                                        {errorMessage}
                                    </Text>
                                ) : null}
                            </GridItem>
                        </SimpleGrid>
                    </form>
                </VStack>
            </Flex>
        </div>
    );
}
