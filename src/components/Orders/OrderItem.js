import React, { useEffect, useState } from 'react';
import {
    Flex,
    Box,
    Image,
    Text,
    Heading,
    Button,
    VStack,
} from '@chakra-ui/react';
import { useHistory } from 'react-router';
import { axiosInstance } from '../../util/config';
import { API_BASE_URL } from '../../util/config';
import { colors } from '../../util/constants';
const OrderItem = ({ productId }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState('');
    const getProductInfo = () => {
        axiosInstance.get(`/products/${productId}`).then((res) => {
            const { title, description, images } = res.data.product;
            setTitle(title);
            setDescription(description);
            setImages(images[0]);
        });
    };

    const history = useHistory();

    useEffect(() => {
        getProductInfo();
    }, []);
    return (
        <Flex maxW='full' p={4} mb={6} align='center'>
            <Image
                src={`${API_BASE_URL}${images.src}`}
                fallbackSrc='https://via.placeholder.com/350'
                alt={images.name}
                borderRadius='16px'
                boxSize='150px'
                objectFit='contain'
                maxH='100%'
                maxW='100%'
            />

            <Box p={4}>
                <Heading size='l'>{title}</Heading>
                <Text>{description}</Text>
                <Button onClick={() => history.push(`/products/${productId}`)}>
                    View Item
                </Button>
            </Box>
            <VStack>
                <Button
                    size='sm'
                    w='full'
                    bg={colors.primary}
                    colorScheme={colors.colorScheme}
                    onClick={() => history.push(`/products/${productId}`)}
                >
                    Buy it again
                </Button>
            </VStack>
        </Flex>
    );
};

export default OrderItem;
