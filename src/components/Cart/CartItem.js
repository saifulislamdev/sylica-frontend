import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Flex,
  Image,
  Heading,
  Spacer,
  Text,
  CloseButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { CartContext } from '../../util/context';

const CartItem = ({
  imageURL,
  altImage,
  unitPrice,
  title,
  description,
  id,
  itemQuantity,
}) => {
  const [quantity, setQuantity] = useState(itemQuantity);
  const [totalprice, setTotalPrice] = useState(0);
  const { handleAddQuantity, handleRemoveItemFromCart } =
    useContext(CartContext);

  const handleQuantityChange = (value) => {
    setQuantity(parseInt(value));
  };

  useEffect(() => {
    setTotalPrice((quantity * parseFloat(unitPrice)).toFixed(2));
    handleAddQuantity(id, quantity);
  }, [quantity]);

  return (
    <Flex
      maxW='full'
      borderWidth='1px'
      borderRadius='16px'
      p={4}
      mb={6}
      align='center'
    >
      <Image
        src={imageURL}
        alt={altImage}
        borderRadius='16px'
        boxSize='150px'
        objectFit='contain'
      />
      <Box p={4}>
        <Heading size='l'>{title}</Heading>
        <Text>{description}</Text>
      </Box>
      <Box p={4}>
        <NumberInput
          defaultValue={0}
          min={1}
          onChange={(value) => handleQuantityChange(value)}
          value={quantity}
          size='sm'
        >
          <NumberInputField maxW={32} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
      <Spacer />
      <Flex p={4} align='center'>
        <Text>{`$${totalprice}`}</Text>
        <CloseButton onClick={() => handleRemoveItemFromCart(id)} m={2} />
      </Flex>
    </Flex>
  );
};

export default CartItem;
