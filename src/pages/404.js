import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Container,
    Link as ChakraLink,
    Text,
} from '@chakra-ui/react';
import { colors } from '../util/constants';

export default function NotFound() {
    const links = [
        ['Home', '/'],
        ['Products', '/products'],
        ['Cart', '/cart'],
        ['Checkout', '/checkout'],
        ['Sign in', '/auth/signin'],
        ['Sign up', '/auth/signup'],
    ];

    return (
        <Container maxW='container.xl'>
            <Text color={colors.primary} fontSize='8xl' fontWeight='bold'>
                Oops!
            </Text>
            <Text fontSize='3xl'>
                We can't seem to find the page you're looking for.
            </Text>
            <Text my='16px'>Error code: 404</Text>
            <Text mt='16px'>Here are some helpful links instead:</Text>
            {links.map((link) => {
                return (
                    <Box>
                        <ChakraLink as={RouterLink} color='blue' to={link[1]}>
                            {link[0]}
                        </ChakraLink>
                    </Box>
                );
            })}
        </Container>
    );
}
