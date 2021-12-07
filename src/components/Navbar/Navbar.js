import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Flex,
    Box,
    Heading,
    Spacer,
    Select,
    IconButton,
    Badge,
    useToast,
} from '@chakra-ui/react';
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { CartContext } from '../../util/context';
import { colors } from '../../util/constants';

export default function Navbar() {
    const history = useHistory();
    const toast = useToast();
    const { calculateTotalItemsInCart, token, setToken, setCart } =
        useContext(CartContext);

    const handleMenuChange = (e) => {
        if (e.target.value === 'logout') {
            window.localStorage.clear();
            setToken('');
            setCart([]);
            toast({
                title: 'Logged out successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            history.push('/auth/signin');
        } else if (e.target.value === 'sell-product') {
            history.push('/sell-products');
        } else if (e.target.value === 'your-orders') {
            history.push('/orders');
        }
    };

    return (
        <Flex
            p='4'
            alignItems='center'
            position='sticky'
            top='0'
            bg='white'
            zIndex='10'
        >
            <Box onClick={() => history.push('/')} cursor='pointer'>
                <Heading>Sylica</Heading>
            </Box>
            <Spacer />
            {token ? (
                <>
                    <Box p='4'>
                        <Select
                            placeholder='Account'
                            onChange={(e) => handleMenuChange(e)}
                        >
                            <option value='your-orders'>Your Orders</option>
                            <option value='sell-product'>Sell Product</option>
                            <option value='logout'>Logout</option>
                        </Select>
                    </Box>
                </>
            ) : (
                ''
            )}

            {!token ? (
                <Box p='4' onClick={() => history.push('/auth/signin')}>
                    <IconButton
                        variant='outline'
                        colorScheme={colors.colorScheme}
                        icon={<AiOutlineUser />}
                    />
                </Box>
            ) : (
                ''
            )}

            <Box p='4' onClick={() => history.push('/cart')}>
                <IconButton
                    variant='outline'
                    colorScheme={colors.colorScheme}
                    icon={<AiOutlineShoppingCart />}
                />
                <Badge
                    variant='outline'
                    bg='white'
                    colorScheme={colors.colorScheme}
                    borderRadius='50%'
                    position='relative'
                    top='-20px'
                    right='10px'
                >
                    {calculateTotalItemsInCart()}
                </Badge>
            </Box>
        </Flex>
    );
}
