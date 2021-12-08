import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
    Heading,
    VStack,
    SimpleGrid,
    GridItem,
    Text,
    Button,
    Divider,
    useToast,
} from '@chakra-ui/react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { axiosInstance } from '../../util/config';
import { CartContext } from '../../util/context';
import { colors } from '../../util/constants';

const OrderSummary = ({ checkout }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { calculateTotalItemsInCart, calculateTotalPriceInCart, cart } =
        useContext(CartContext);

    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        // this is the return url after the payment goes through
        const returnURL = window.location.href.replace('/checkout', '/order');

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.href,
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === 'card_error' || error.type === 'validation_error') {
            toast({
                title: 'Invalid card.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Server error',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
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

        if (clientSecret) {
            stripe
                .retrievePaymentIntent(clientSecret)
                .then(({ paymentIntent }) => {
                    switch (paymentIntent.status) {
                        case 'succeeded': {
                            const data = {
                                totalAmount: calculateTotalPriceInCart(),
                                productsPurchased: [
                                    {
                                        productId: '61908195cdec62705404cdd9',
                                        quantity: '3',
                                    },
                                ],
                            };
                            axiosInstance
                                .post('/orders/create-order', data, {
                                    headers: {
                                        'x-auth-token': JSON.parse(
                                            localStorage.getItem('token')
                                        ),
                                    },
                                })
                                .then((res) => console.log(res.data))
                                .catch((err) => console.log(err));
                            toast({
                                title: 'Payment succeeded.',
                                status: 'success',
                                duration: 3000,
                                isClosable: true,
                            });
                            break;
                        }

                        case 'processing': {
                            toast({
                                title: 'Payment processing.',
                                status: 'info',
                                duration: 3000,
                                isClosable: true,
                            });
                            break;
                        }
                        case 'requires_payment_method': {
                            toast({
                                title: 'Payment unsuccessful.',
                                status: 'error',
                                duration: 3000,
                                isClosable: true,
                            });
                            break;
                        }
                        default: {
                            toast({
                                title: 'Server error',
                                status: 'error',
                                duration: 3000,
                                isClosable: true,
                            });
                            break;
                        }
                    }
                });
        }
    }, [stripe]);

    return (
        <VStack
            w='full'
            p={10}
            spacing={10}
            alignItems='flex-start'
            style={{
                border: '1px solid #E2E8F0',
                borderRadius: '25px',
            }}
        >
            <Heading size='xl'>Order Summary</Heading>
            <SimpleGrid columns={2} rowGap={6} columnGap={2} w='full'>
                <GridItem colSpan={1}>
                    <Text>{`Items(${calculateTotalItemsInCart()}):`}</Text>
                </GridItem>
                <GridItem colSpan={1}>
                    <Text>{`$${calculateTotalPriceInCart()}`}</Text>
                </GridItem>
                <GridItem colSpan={1}>
                    <Text>{`Shipping and handling:`}</Text>
                </GridItem>
                <GridItem colSpan={1}>
                    <Text>{`$00.00`}</Text>
                </GridItem>
                <GridItem colSpan={1}>
                    <Text>{`Tax:`}</Text>
                </GridItem>
                <GridItem colSpan={1}>
                    <Text>{`$00.00`}</Text>
                </GridItem>
                <GridItem colSpan={2}>
                    <Divider />
                </GridItem>
                <GridItem colSpan={1}>
                    <Heading size='l'>Order total:</Heading>
                </GridItem>
                <GridItem colSpan={1}>
                    <Heading size='l'>{`$${calculateTotalPriceInCart()}`}</Heading>
                </GridItem>
                <GridItem colSpan={2}>
                    {checkout ? (
                        <Link to='/checkout'>
                            <Button
                                size='md'
                                w='full'
                                bg={colors.primary}
                                color='white'
                                disabled={cart.length === 0}
                            >
                                Checkout
                            </Button>
                        </Link>
                    ) : (
                        <Button
                            disabled={
                                isLoading ||
                                !stripe ||
                                !elements ||
                                cart.length === 0
                            }
                            size='md'
                            w='full'
                            bg={colors.primary}
                            color='white'
                            onClick={handleSubmit}
                        >
                            <span>
                                {isLoading ? (
                                    <div className='spinner' id='spinner'></div>
                                ) : (
                                    'Place Order'
                                )}
                            </span>
                        </Button>
                    )}
                </GridItem>
            </SimpleGrid>
        </VStack>
    );
};

export default OrderSummary;
