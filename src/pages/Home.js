import React, { useState } from 'react';
import { Heading } from '@chakra-ui/react';
import Carousel from '../components/Product/Carousel';
import Products from '../components/Product/Products';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [isLoaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    return (
        <>
            <Carousel />
            <Heading m='32px 0px 16px 16px' size='xl'>
                Discover
            </Heading>
            <Products
                error={error}
                isLoaded={isLoaded}
                pageFirstProductIndex={0}
                pageLastProductIndex={products.length - 1}
                products={products}
                search={''}
                setError={setError}
                setErrorMessage={setErrorMessage}
                setLoaded={setLoaded}
                setProducts={setProducts}
                setProductsPerPage={products.length - 1}
            />
        </>
    );
}
