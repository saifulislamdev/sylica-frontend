import React from 'react';
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

export default function ProductListing({
    description,
    id,
    imageSrc,
    price,
    quantity,
    title,
}) {
    const history = useHistory();
    const isOutOfStock = isNaN(parseInt(quantity)) || parseInt(quantity) === 0;

    return (
        <Container
            onClick={() => history.push(`/products/${id}`)}
            border='1px'
            borderColor={colors.neutralLighterGray}
            borderRadius='12px'
            cursor='pointer'
            m='16px'
            w='min(270px, 100vw)'
        >
            <Box h='min(150px, 100vh)' w='min(240px, 100vw)'>
                {isOutOfStock && (
                    <Tag
                        bg={colors.primary}
                        color={colors.neutralWhite}
                        left='10px'
                        pos='relative'
                        top='50px'
                        variant='subtle'
                        zIndex='2'
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
            <Text size='xs' mb='12px'>
                ${String(price).includes('.') ? `${price}` : `${price}.00`}
            </Text>
            <Button
                // onClick={} // TODO: implemented later and refactor to avoid repetition
                isDisabled={isOutOfStock}
                borderRadius='6px'
                colorScheme={colors.colorScheme}
                isFullWidth='true'
                mb='12px'
                py='16px'
                size='xs'
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
