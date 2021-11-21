import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, Container, Heading, Text } from '@chakra-ui/react';
import { colors } from '../../util/constants';

import appleMacBookPro from '../../assets/carousel/61908195cdec62705404cdd9.jpeg';

const products = [
    {
        id: '61908195cdec62705404cdd9',
        title: 'Apple MacBook Pro with M1 Pro or M1 Max',
        textColor: '#4D79AB',
    },
    {
        id: '619082bbab9b070b7aa427e2',
        title: 'Microsoft Surface Studio Laptop',
        textColor: '#4B87BC',
    },
    {
        id: '619085efc7ba276cc9296d2f',
        title: 'Apple iPhone 13 Pro',
        textColor: '#00538B',
    },
    {
        id: '619933f8df17017d85561842',
        title: 'Nvidia GeForce RTX 3090',
        textColor: '#33323D',
    },
];

export default function Carousel() {
    const [currProduct, setCurrProduct] = useState(0);
    const history = useHistory();

    const product = products[currProduct];

    return (
        <Container
            bgImage={appleMacBookPro}
            bgSize='auto 512px'
            bgPosition='center'
            bgRepeat='no-repeat'
            borderRadius='16px'
            h='512px'
            m='auto'
            maxW='container.lg'
        >
            <Box
                position='relative'
                left='16px'
                top='100px'
                maxW='container.lg'
            >
                <Heading color={colors.neutralWhite} size='3xl'>
                    Apple MacBook Pro
                    <br />
                    with M1 Pro or M1 Max
                </Heading>
                <Button
                    onClick={() => history.push(`/products/${product.id}`)}
                    borderRadius='6px'
                    boxShadow='0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)'
                    colorScheme={colors.colorSchemeWhite}
                    mt='32px'
                    px='12px'
                    py='10px'
                    size='sm'
                    w='xs'
                >
                    <Text align='center' color={products.textColor} size='sm'>
                        Buy Now
                    </Text>
                </Button>
                <Text
                    align='center'
                    color={colors.neutralWhite}
                    fontWeight='semibold'
                    my='10px'
                    size='sm'
                    w='xs'
                >
                    or
                </Text>
                <Button
                    onClick={() => history.push('/products/')}
                    borderRadius='6px'
                    colorScheme={colors.colorSchemeTransparent}
                    px='12px'
                    py='10px'
                    size='sm'
                    variant='outline'
                    w='xs'
                >
                    <Text align='center' color={colors.neutralWhite} size='sm'>
                        Browse all products
                    </Text>
                </Button>
            </Box>
        </Container>
    );
}
