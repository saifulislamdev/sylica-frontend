import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    Heading,
    IconButton,
    Text,
} from '@chakra-ui/react';
import {
    MdOutlineArrowBackIosNew,
    MdOutlineArrowForwardIos,
} from 'react-icons/md';
import { colors } from '../../util/constants';

import appleiPhone13Pro from '../../assets/carousel/619085efc7ba276cc9296d2f.jpeg';
import appleMacBookPro from '../../assets/carousel/61908195cdec62705404cdd9.jpeg';
import microsoftSurfaceStudioLaptop from '../../assets/carousel/619082bbab9b070b7aa427e2.jpeg';
import nvidiaGeForceRTX3090 from '../../assets/carousel/619933f8df17017d85561842.jpeg';

export const products = [
    {
        id: '61908195cdec62705404cdd9',
        img: appleMacBookPro,
        imgType: 'jpeg',
        title: [['Apple MacBook Pro'], ['with M1 Pro or M1 Max']], // every subarray represents a new line
        color: '#4D79AB', // color of text in "Buy Now" and bg color until img hasn't loaded
    },
    {
        id: '619082bbab9b070b7aa427e2',
        img: microsoftSurfaceStudioLaptop,
        imgType: 'jpeg',
        title: [['Microsoft Surface'], ['Studio Laptop']],
        color: '#4B87BC',
    },
    {
        id: '619085efc7ba276cc9296d2f',
        img: appleiPhone13Pro,
        imgType: 'jpeg',
        title: [['Apple'], ['iPhone 13 Pro']],
        color: '#00538B',
    },
    {
        id: '619933f8df17017d85561842',
        img: nvidiaGeForceRTX3090,
        imgType: 'jpeg',
        title: [['Nvidia GeForce'], ['RTX 3090']],
        color: '#33323D',
    },
];

export default function Carousel() {
    const [currProduct, setCurrProduct] = useState(0);
    const currProductRef = useRef(currProduct);
    currProductRef.current = currProduct;
    const history = useHistory();

    const viewPrevProduct = () => {
        setCurrProduct(
            currProductRef.current > 0
                ? currProductRef.current - 1
                : products.length - 1
        );
    };
    const viewNextProduct = () => {
        setCurrProduct(
            currProductRef.current < products.length - 1
                ? currProductRef.current + 1
                : 0
        );
    };

    useEffect(() => {
        const updateProductInCarousel = setInterval(() => {
            viewNextProduct();
        }, 5000);
        return () => {
            clearInterval(updateProductInCarousel);
        };
    }, []);

    const product = products[currProduct];

    return (
        <Container
            bgColor={product.color}
            bgImage={product.img}
            bgSize='auto 512px'
            bgPosition='center'
            bgRepeat='no-repeat'
            borderRadius='16px'
            h='512px'
            m='auto'
            maxW='container.lg'
            data-testid='container'
        >
            <Box>
                <Box
                    left='48px'
                    position='relative'
                    top='100px'
                    maxW='container.lg'
                >
                    <Heading
                        color={colors.neutralWhite}
                        size='3xl'
                        whiteSpace='pre-line'
                    >
                        {product.title.reduce(
                            (prevText, currText) => prevText + '\n' + currText
                        )}
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
                        <Text align='center' color={products.color} size='sm'>
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
                        <Text
                            align='center'
                            color={colors.neutralWhite}
                            size='sm'
                        >
                            Browse all products
                        </Text>
                    </Button>
                </Box>
                <Box position='relative' top='50%'>
                    <Box left='0' position='absolute'>
                        <IconButton
                            onClick={viewPrevProduct}
                            borderRadius='6px'
                            colorScheme={colors.colorSchemeTransparent}
                            icon={<MdOutlineArrowBackIosNew />}
                            isDisabled={products.length < 2}
                            isRound='false'
                            size='md'
                            variant='ghost'
                            aria-label='View previous product in carousel'
                        ></IconButton>
                    </Box>
                    <Box left='calc(100% - 40px)' position='absolute' top='0'>
                        <IconButton
                            onClick={viewNextProduct}
                            borderRadius='6px'
                            colorScheme={colors.colorSchemeTransparent}
                            icon={<MdOutlineArrowForwardIos />}
                            isDisabled={products.length < 2}
                            isRound='false'
                            size='md'
                            variant='ghost'
                            aria-label='View next product in carousel'
                        ></IconButton>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}
