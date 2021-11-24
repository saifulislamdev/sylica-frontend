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
import { CartContext } from '../../util/context';
import { colors } from '../../util/constants';
import { FRONT_END_BASE_URL } from '../../util/config';

const OrderSummary = ({ checkout }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { calculateTotalItemsInCart, calculateTotalPriceInCart } =
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

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: FRONT_END_BASE_URL,
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
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Server error',
        status: 'error',
        duration: 9000,
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

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded': {
          toast({
            title: 'Payment succeeded.',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
          break;
        }

        case 'processing': {
          toast({
            title: 'Payment processing.',
            status: 'warning',
            duration: 9000,
            isClosable: true,
          });
          break;
        }
        case 'requires_payment_method': {
          toast({
            title: 'Payment unsuccessful.',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
          break;
        }
        default: {
          toast({
            title: 'Server error',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
          break;
        }
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
              <Button size='md' w='full' bg={colors.primary} color='white'>
                Checkout
              </Button>
            </Link>
          ) : (
            <Button
              disabled={isLoading || !stripe || !elements}
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
