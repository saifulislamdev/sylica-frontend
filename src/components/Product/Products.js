import React, { useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import ProductListing from './ProductListing';
import { axiosInstance } from '../../util/config';

export default function Products({
    error,
    isLoaded,
    pageFirstProductIndex,
    pageLastProductIndex,
    products,
    search,
    setError,
    setErrorMessage,
    setLoaded,
    setProducts,
    setProductsPerPage
}) {
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
                setProductsPerPage(0);
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
            {products
                .filter((product, index) => {
                    return (
                        pageFirstProductIndex <= index &&
                        index <= pageLastProductIndex
                    );
                })
                .map((product) => {
                    if (
                        product.title
                            .toLowerCase()
                            .includes(search.toLowerCase())
                    )
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
        <Box></Box>
    );
}
