import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Button,
    Container,
    Flex,
    FormControl,
    Heading,
    Icon,
    IconButton,
    NumberInput,
    NumberInputField,
    Tag,
    Text,
} from '@chakra-ui/react';
import { BsCartPlus } from 'react-icons/bs';
import {
    MdOutlineArrowBackIosNew,
    MdOutlineArrowForwardIos,
} from 'react-icons/md';

import { colors } from '../../util/constants';
import { CartContext } from '../../util/context';
import { addToCartOrIncrementQuantity, addToCartToast } from '../../util/helpers';

export default function ProductDetail({
    id,
    imageSrc,
    title,
    description,
    price,
    maxQuantity,
}) {
    // if proper number not passed in for maxQuantity or it is actually out of stock
    const isOutOfStock =
        isNaN(parseInt(maxQuantity)) || parseInt(maxQuantity) === 0;

    const [quantity, setQuantity] = useState(isOutOfStock ? 0 : 1);
    const { cart, handleAddQuantity, handleAddToCart } =
        useContext(CartContext);
    const history = useHistory();

    const handleChange = (e) => {
        if (e === '') setQuantity(0); // empty input
        const passedInQuantity = parseInt(e);
        if (isNaN(passedInQuantity)) return; // invalid characters passed in (e.g. letters)
        const isWithinRange =
            0 <= passedInQuantity && passedInQuantity <= parseInt(maxQuantity); // within maximum quantity bound
        if (isWithinRange) setQuantity(passedInQuantity);
    };

    return (
        <Container>
            <Heading mb='16px' size='lg'>
                {title}
            </Heading>
            <Text mb='32px' size='xs'>
                {description}
            </Text>
            <Text color={colors.neutralGray} fontSize='xs'>
                Price
            </Text>
            <Text
                fontSize='2xl'
                mb='16px'
                data-testid='price'
            >{`$${price}`}</Text>
            {isOutOfStock && (
                <Tag
                    bg={colors.primary}
                    color={colors.neutralWhite}
                    mb='16px'
                    px='16px'
                    variant='subtle'
                    data-testid='tag'
                >
                    Out of Stock
                </Tag>
            )}
            <Text color={colors.neutralGray} fontSize='xs'>
                Quantity
            </Text>
            <Flex my='10px'>
                <IconButton
                    onClick={() => {
                        setQuantity(quantity - 1);
                    }}
                    isDisabled={quantity === 0}
                    icon={<MdOutlineArrowBackIosNew />}
                    bg={colors.secondary}
                    opacity='0.5'
                    order='0'
                    size='md'
                    aria-label='Decrease quantity by 1'
                />
                <FormControl
                    id='quantity'
                    isDisabled={isOutOfStock}
                    isInvalid={isNaN(+quantity)}
                    maxW={`${Math.floor(Math.log10(quantity + 1)) * 8 + 60}px`} // expands automatically by expanding 8px for every digit
                    mx='8px'
                    order='1'
                    size='sm'
                    variant='input'
                    >
                    <NumberInput
                        onChange={handleChange}
                        value={quantity}
                        max={isOutOfStock ? 0 : parseInt(maxQuantity)}
                        min={0}
                        allowMouseWheel='true'
                        inputMode='numerical'
                        opacity='0.5'
                        data-testid='quantity'
                    >
                        <NumberInputField />
                    </NumberInput>
                </FormControl>
                <IconButton
                    onClick={() => {
                        setQuantity(quantity + 1);
                    }}
                    isDisabled={
                        isOutOfStock || quantity === parseInt(maxQuantity)
                    }
                    icon={<MdOutlineArrowForwardIos />}
                    bg={colors.secondary}
                    opacity='0.5'
                    order='2'
                    size='md'
                    aria-label='Increase quantity by 1'
                />
                <Button
                    onClick={() => {
                        addToCartOrIncrementQuantity(
                            handleAddQuantity,
                            cart,
                            handleAddToCart,
                            id,
                            imageSrc,
                            description,
                            quantity,
                            title,
                            price
                        );
                        addToCartToast();
                    }}
                    isDisabled={quantity === 0}
                    colorScheme={colors.colorScheme}
                    flexDirection='row'
                    ml='8px'
                    order='3'
                    w='full'
                    data-testid='Add to Cart button'
                >
                    <Text
                        color={colors.neutralWhite}
                        fontSize='sm'
                        fontWeight='semibold'
                        mx='8px'
                    >
                        Add to Cart
                    </Text>
                    <Icon as={BsCartPlus} color={colors.neutralWhite}></Icon>
                </Button>
            </Flex>
            <Button
                onClick={() => {
                    addToCartOrIncrementQuantity(
                        handleAddQuantity,
                        cart,
                        handleAddToCart,
                        id,
                        imageSrc,
                        description,
                        quantity,
                        title,
                        price
                    );
                    history.push('/cart');
                }}
                isDisabled={quantity === 0}
                isFullWidth={true}
                borderColor={colors.primary}
                colorScheme={colors.colorScheme}
                size='sm'
                variant='outline'
                data-testid='Buy now button'
            >
                Buy now
            </Button>
        </Container>
    );
}
