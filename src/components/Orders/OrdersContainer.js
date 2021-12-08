import React, { useEffect, useState, useContext } from 'react';
import {
    Flex,
    SimpleGrid,
    GridItem,
    Box,
    Heading,
    Text,
    Divider,
} from '@chakra-ui/react';
import { axiosInstance } from '../../util/config';
import OrderItem from './OrderItem';
import { colors } from '../../util/constants';
import { CartContext } from '../../util/context';

const OrdersContainer = () => {
    const [ordersList, setOrdersList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    let { token } = useContext(CartContext);
    if (!token) {
        token = JSON.parse(window.localStorage.getItem('token'));
    }
    useEffect(() => {
        axiosInstance
            .get('/orders/recent-order', {
                headers: {
                    'x-auth-token': token,
                },
            })
            .then((res) => {
                const { orders } = res.data;
                setOrdersList(orders);
                setIsLoading(false);
            })
            .catch((err) => {
                setErrorMessage(err.response.data.msg);
            });
    }, []);

    return (
        <Flex h='100vh' py={20}>
            <SimpleGrid columns={3} rowGap={6} columnGap={3} w='full'>
                <GridItem colSpan={3}>
                    <Box
                        w='full'
                        h='full'
                        p={3}
                        spacing={10}
                        borderWidth='1px'
                        borderRadius='16px'
                    >
                        <Heading p={4} mb={6}>
                            Your Orders
                        </Heading>
                        {isLoading ? (
                            <Text>still loading data</Text>
                        ) : (
                            ordersList.map((order, index) => {
                                return (
                                    <Box
                                        key={index}
                                        p={3}
                                        mb={3}
                                        spacing={10}
                                        borderWidth='1px'
                                        borderRadius='16px'
                                    >
                                        <SimpleGrid columns={3} spacing={10}>
                                            <Box height='80px'>
                                                <Text
                                                    color={colors.neutralGray}
                                                >
                                                    Order placed
                                                </Text>
                                                <Text>
                                                    {new Date(
                                                        order.created_at
                                                    ).toLocaleDateString(
                                                        {},
                                                        {
                                                            timeZone: 'UTC',
                                                            month: 'short',
                                                            day: '2-digit',
                                                            year: 'numeric',
                                                        }
                                                    )}
                                                </Text>
                                            </Box>
                                            <Box height='80px'>
                                                <Text
                                                    color={colors.neutralGray}
                                                >
                                                    Total
                                                </Text>
                                                <Text>{`$${order.totalAmount}`}</Text>
                                            </Box>
                                            <Box height='80px'>
                                                <Text
                                                    color={colors.neutralGray}
                                                >
                                                    Order #
                                                </Text>
                                                <Text>{order._id}</Text>
                                            </Box>
                                        </SimpleGrid>
                                        <Divider />
                                        {order.productsPurchased.map(
                                            (product, index) => {
                                                return (
                                                    <div key={index}>
                                                        <OrderItem
                                                            productId={
                                                                product.productId
                                                            }
                                                        />
                                                    </div>
                                                );
                                            }
                                        )}
                                    </Box>
                                );
                            })
                        )}
                    </Box>
                </GridItem>
            </SimpleGrid>
        </Flex>
    );
};

export default OrdersContainer;
