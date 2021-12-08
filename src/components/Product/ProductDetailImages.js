import React, { useState } from 'react';
import { Box, Container, Flex, IconButton, Image, Tag } from '@chakra-ui/react';
import {
    MdOutlineArrowBackIosNew,
    MdOutlineArrowForwardIos,
} from 'react-icons/md';

import { API_BASE_URL } from '../../util/config';
import { colors } from '../../util/constants';

export default function ProductDetailImages({ images, maxQuantity }) {
    const [currImage, setCurrImage] = useState(0);

    const isOutOfStock =
        isNaN(parseInt(maxQuantity)) || parseInt(maxQuantity) === 0;
    const totalImages = images.length;

    return (
        <Container
            border='1px'
            borderColor={colors.neutralLighterGray}
            borderRadius='16px'
            centerContent
            maxW='container.md'
        >
            <Box>
                {isOutOfStock && (
                    <Tag
                        bg={colors.primary}
                        color={colors.neutralWhite}
                        colorScheme={colors.primary}
                        mt='10px'
                        pos='absolute'
                        variant='subtle'
                    >
                        Out of Stock
                    </Tag>
                )}
                <Box h={['xs', 'md', 'md', 'md', 'md']}>
                    <Image
                        src={`${API_BASE_URL}${images[currImage].src}`}
                        fallbackSrc='https://via.placeholder.com/350'
                        border='1px'
                        borderColor='transparent'
                        borderRadius='16px'
                        loading='lazy'
                        maxH='100%'
                        maxW='100%'
                        mt='16px'
                        alt={images[currImage].name}
                    ></Image>
                </Box>
            </Box>
            <Flex align='center' direction='row' justify='center' w='95%'>
                <IconButton
                    onClick={() => {
                        setCurrImage(
                            currImage > 0 ? currImage - 1 : totalImages - 1
                        );
                    }}
                    isDisabled={totalImages < 2}
                    icon={<MdOutlineArrowBackIosNew />}
                    borderColor={colors.primary}
                    size='xs'
                    variant='outline'
                    aria-label='Look at previous image'
                />
                <Flex align='center' direction='row' justify='center' mb='16px'>
                    {images.map((image, i) => {
                        return (
                            <Image
                                onClick={() => {
                                    setCurrImage(i);
                                }}
                                src={`${API_BASE_URL}${image.src}`}
                                fallbackSrc='https://via.placeholder.com/350'
                                h='auto'
                                cursor='pointer'
                                loading='lazy'
                                m={totalImages < 20 ? '2px' : '1px'}
                                maxH='120px'
                                maxW={`min(75px, ${90 / totalImages}%)`}
                                w='auto'
                                alt={image.name}
                                key={`imageOption${i}`}
                            ></Image>
                        );
                    })}
                </Flex>
                <IconButton
                    onClick={() => {
                        setCurrImage(
                            currImage < totalImages - 1 ? currImage + 1 : 0
                        );
                    }}
                    isDisabled={totalImages < 2}
                    icon={<MdOutlineArrowForwardIos />}
                    borderColor={colors.primary}
                    size='xs'
                    variant='outline'
                    aria-label='Look at next image'
                ></IconButton>
            </Flex>
        </Container>
    );
}
