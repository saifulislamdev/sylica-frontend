import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Icon,
    Image,
    Tag,
    Text,
} from '@chakra-ui/react';
import { BsCartPlus } from 'react-icons/bs';

import { API_BASE_URL } from '../../util/config';
import { colors } from '../../util/constants';
import { CartContext } from '../../util/context';
import { addToCartOrIncrementQuantity } from '../../util/helpers';

export default function ProductListing({
    description,
    id,
    imageSrc,
    price,
    quantity,
    title,
}) {
    const { cart, handleAddQuantity, handleAddToCart } =
        useContext(CartContext);
    const history = useHistory();
    const isOutOfStock = isNaN(parseInt(quantity)) || parseInt(quantity) === 0;

    return (
        <Container
            border='1px'
            borderColor={colors.neutralLighterGray}
            borderRadius='12px'
            cursor='pointer'
            m='16px'
            w='min(288px, 100vw)'
        >
            <Box onClick={() => history.push(`/products/${id}`)}>
                <Box h='min(140px, 100vh)'>
                    {isOutOfStock && (
                        <Tag
                            bg={colors.primary}
                            color={colors.neutralWhite}
                            left='10px'
                            pos='relative'
                            top='50px'
                            variant='subtle'
                            zIndex='2'
                            data-testid='tag'
                        >
                            Out of Stock
                        </Tag>
                    )}
                    <Image
                        src={`${API_BASE_URL}${imageSrc}`}
                        fallbackSrc='https://via.placeholder.com/150'
                        border='1px'
                        borderColor='transparent'
                        borderRadius='12px'
                        fit='fill'
                        loading='lazy'
                        m='auto'
                        maxH='min(120px, 100vh)'
                        maxW='min(220px, 100vw)'
                        mt='16px'
                        alt={`Image of ${title}`}
                    ></Image>
                </Box>
                <Heading mt='16px' size='xs'>
                    {title}
                </Heading>
                <Text noOfLines='4' size='xs'>
                    {description}
                </Text>
                <Text color={colors.neutralGray} mt='12px' size='xs'>
                    Price
                </Text>
                <Text size='xs' mb='12px' data-testid='price'>
                    ${String(price).includes('.') ? `${price}` : `${price}.00`}
                </Text>
            </Box>
            <Button
                onClick={() => {
                    addToCartOrIncrementQuantity(
                        handleAddQuantity,
                        cart,
                        handleAddToCart,
                        id,
                        `${API_BASE_URL}${imageSrc}`, // had to send with API_BASE_URL otherwise wouldn't show img
                        description,
                        title,
                        price
                    );
                }}
                isDisabled={isOutOfStock}
                borderRadius='6px'
                colorScheme={colors.colorScheme}
                isFullWidth='true'
                mb='12px'
                py='16px'
                size='xs'
                data-testid='Add to Cart button'
            >
                <Flex align='center' direction='row' justify='center'>
                    <Text
                        color={colors.neutralWhite}
                        fontWeight='semibold'
                        mx='8px'
                        size='xs'
                    >
                        Add to Cart
                    </Text>
                    <Icon as={BsCartPlus} color={colors.neutralWhite}></Icon>
                </Flex>
            </Button>
        </Container>
    );
}
