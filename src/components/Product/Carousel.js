import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    IconButton,
    Spacer,
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
import nvidiaGeForceRTX3090 from '../../assets/carousel/619082bbab9b070b7aa427e2.jpeg';

const products = [
    {
        id: '61908195cdec62705404cdd9',
        img: appleMacBookPro,
        title: 'Apple MacBook Pro with M1 Pro or M1 Max',
        textColor: '#4D79AB',
    },
    {
        id: '619082bbab9b070b7aa427e2',
        img: microsoftSurfaceStudioLaptop,
        title: 'Microsoft Surface Studio Laptop',
        textColor: '#4B87BC',
    },
    {
        id: '619085efc7ba276cc9296d2f',
        img: appleiPhone13Pro,
        title: 'Apple iPhone 13 Pro',
        textColor: '#00538B',
    },
    {
        id: '619933f8df17017d85561842',
        img: nvidiaGeForceRTX3090,
        title: 'Nvidia GeForce RTX 3090',
        textColor: '#33323D',
    },
];

export default function Carousel() {
    const [currProduct, setCurrProduct] = useState(0);
    const history = useHistory();

    const product = products[currProduct];

    return (
        <>
            <Container
                bgColor={colors.primary} // in case there is an issue with the image
                bgImage={appleMacBookPro}
                bgSize='auto 512px'
                bgPosition='center'
                bgRepeat='no-repeat'
                borderRadius='16px'
                h='512px'
                m='auto'
                maxW='container.lg'
            >
                <Box>
                    <Box
                        position='relative'
                        left='48px'
                        top='100px'
                        // maxW='container.lg'
                    >
                        <Heading color={colors.neutralWhite} size='3xl'>
                            Apple MacBook Pro
                            <br />
                            with M1 Pro or M1 Max
                        </Heading>
                        <Button
                            onClick={() =>
                                history.push(`/products/${product.id}`)
                            }
                            borderRadius='6px'
                            boxShadow='0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)'
                            colorScheme={colors.colorSchemeWhite}
                            mt='32px'
                            px='12px'
                            py='10px'
                            size='sm'
                            w='xs'
                        >
                            <Text
                                align='center'
                                color={products.textColor}
                                size='sm'
                            >
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
                        <Box position='absolute' left='0'>
                            <IconButton
                                onClick={() => {
                                    setCurrProduct(
                                        currProduct > 0
                                            ? currProduct - 1
                                            : products.length - 1
                                    );
                                }}
                                icon={<MdOutlineArrowBackIosNew />}
                                borderRadius='6px'
                                isDisabled={products.length < 2}
                                isRound='false'
                                size='md'
                                variant='ghost'
                                aria-label='View previous product in carousel'
                            ></IconButton>
                        </Box>
                        <Box position='absolute' left='calc(100% - 40px)' top='0'>
                            <IconButton
                                onClick={() => {
                                    setCurrProduct(
                                        currProduct < products.length - 1
                                            ? currProduct + 1
                                            : 0
                                    );
                                }}
                                icon={<MdOutlineArrowForwardIos />}
                                borderRadius='6px'
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
        </>
    );
}
