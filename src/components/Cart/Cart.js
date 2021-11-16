import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Heading,
  Flex,
  SimpleGrid,
  GridItem,
  Box,
  VStack,
  Text,
  Link,
} from '@chakra-ui/react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CartItem from './CartItem';
import { CartContext } from '../../util/context';
import OrderSummary from '../Checkout/OrderSummary';
import { colors } from '../../util/constants';

const stripePromise = loadStripe(
  'pk_test_51IlQGnEwHOsES7xUluOPPi4TS3wGXqraJVNWZvGMNlEY9HAg0ust8ilDKraQEV5T891nLuYgGoUP1FZAZtMRh5Oi00FpRjnaCu' ??
    ''
);

const Cart = () => {
  const { cart, setCart, calculateTotalItemsInCart } = useContext(CartContext);

  return (
    <div data-testid='cart '>
      <Elements stripe={stripePromise}>
        <Flex h='100vh' py={20}>
          <SimpleGrid columns={3} rowGap={6} columnGap={3} w='full'>
            <GridItem colSpan={2}>
              <Box
                w='full'
                h='full'
                p={5}
                spacing={10}
                borderWidth='2px'
                borderRadius='25px'
              >
                <Heading
                  p={4}
                  mb={6}
                >{`Shopping Cart (${calculateTotalItemsInCart()} items)`}</Heading>
                {cart.map((product) => (
                  <CartItem
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    unitPrice={product.unitPrice}
                    itemQuantity={product.quantity}
                    imageURL={product.imageURL}
                  />
                ))}
              </Box>
            </GridItem>
            <GridItem colSpan={1}>
              <VStack>
                <OrderSummary checkout={true} />
                <Text>
                  Or,{' '}
                  <Link
                    as={RouterLink}
                    color={colors.primary}
                    to='/product/product-listing'
                  >
                    continue shopping
                  </Link>
                </Text>
              </VStack>
            </GridItem>
          </SimpleGrid>
        </Flex>
      </Elements>
    </div>
  );
};

export default Cart;
