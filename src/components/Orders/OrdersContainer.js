import React, { useEffect, useState } from 'react';
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

const OrdersContainer = () => {
    const [ordersList, setOrdersList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        axiosInstance
            .get('/orders/recent-order', {
                headers: {
                    'x-auth-token':
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE5ZjA3MzY2ZTNhZTcwMDIxMzMwOTUyIn0sImlhdCI6MTYzODgxNzc1MCwiZXhwIjoxNjM4ODIxMzUwfQ.4LWhTigk-EEtcc9dI_FJfxngLCTF2fXSJIUR7kJZyT0',
                },
            })
            .then((res) => {
                const { orders } = res.data;
                setOrdersList(orders);
                setIsLoading(false);
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
                                                <Text color={colors.neutralGray}>
                                                    Order placed
                                                </Text>
                                                {/* order.created_at.getMonth(), order.created_at.getDate(), order.created_at.getFullYear() */}
                                                {/* /{order.created_at.getDate()}/{order.created_at.getFullYear()} */}
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
                                                <Text color={colors.neutralGray}>Total</Text>
                                                <Text>{`$${order.totalAmount}`}</Text>
                                            </Box>
                                            <Box height='80px'>
                                                <Text color={colors.neutralGray}>
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
