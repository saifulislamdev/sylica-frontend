import React, { useEffect, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import ProductListing from '../components/Product/ProductListing';
import { axiosInstance } from '../util/config';

export default function Products() {
    const [products, setProducts] = useState({});
    const [isLoaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        axiosInstance
            .get('/products/getProducts')
            .then((res) => {
                setProducts(
                    res.data.products.map((product) => {
                        // store only what's necessary
                        return {
                            description: product.description,
                            id: product._id,
                            images: product.images,
                            price: product.price,
                            quantity: product.quantity,
                            title: product.title,
                        };
                    })
                );
                setLoaded(true);
            })
            .catch((err) => {
                setErrorMessage(err.response.data.msg); // msg is the field for error message from backend
                setError(true);
            });
    }, []);

    return !error && isLoaded && products ? (
        <Flex
            align='center'
            justify={['center', 'center', 'center', 'center', 'flex-start']}
            wrap='wrap'
        >
            {products.map((product) => {
                return (
                    <ProductListing
                        description={product.description}
                        id={product.id}
                        imageSrc={product.images[0].src}
                        price={product.price}
                        quantity={product.quantity}
                        title={product.title}
                    />
                );
            })}
        </Flex>
    ) : (
        <Text color='red' pl='16px'>
            {errorMessage}
        </Text>
    );
}
