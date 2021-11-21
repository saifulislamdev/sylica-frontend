import React, { useState } from 'react';
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

const ProductDetail = ({
    productTitle,
    productDescription,
    price,
    maxQuantity,
}) => {
    // if proper number not passed in for maxQuantity or it is actually out of stock
    const isOutOfStock =
        isNaN(parseInt(maxQuantity)) || parseInt(maxQuantity) === 0;

    const [quantity, setQuantity] = useState(isOutOfStock ? 0 : 1);

    const handleChange = (e) => {
        if (e === '') setQuantity(0); // empty input
        const passedInQuantity = parseInt(e);
        if (isNaN(passedInQuantity)) return; // invalid characters passed in (e.g. letters)
        const isWithinRange = 0 <= passedInQuantity && passedInQuantity <= parseInt(maxQuantity); // within maximum quantity bound
        if (isWithinRange) setQuantity(passedInQuantity);
    }

    return (
        <Container>
            <Heading mb='16px' size='lg'>
                {productTitle}
            </Heading>
            <Text mb='32px' size='xs'>
                {productDescription}
            </Text>
            <Text color={colors.neutralGray} fontSize='xs'>
                Price
            </Text>
            <Text fontSize='2xl' mb='16px'>{`$${price}`}</Text>
            {isOutOfStock && (
                <Tag
                    bg={colors.primary}
                    color={colors.neutralWhite}
                    mb='16px'
                    px='16px'
                    variant='subtle'
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
                    // onClick={} // TODO: implemented later
                    isDisabled={quantity === 0}
                    colorScheme={colors.colorScheme}
                    flexDirection='row'
                    ml='8px'
                    order='3'
                    w='full'
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
                // onClick={} // TODO: implemented later
                isDisabled={quantity === 0}
                isFullWidth={true}
                borderColor={colors.primary}
                colorScheme={colors.colorScheme}
                size='sm'
                variant='outline'
            >
                Buy now
            </Button>
        </Container>
    );
};

export default ProductDetail;
