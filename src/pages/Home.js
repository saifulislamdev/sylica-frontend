import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Container, Heading } from '@chakra-ui/react';
import Products from '../components/Product/Products';
import { colors } from '../util/constants';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [isLoaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const history = useHistory();

    const productIds = new Map([
        ['61908195cdec62705404cdd9', true],
        ['619082bbab9b070b7aa427e2', true],
        ['619085efc7ba276cc9296d2f', true],
        ['619933f8df17017d85561842', true],
    ]);

    return (
        <>
            <Heading m='16px' size='xl'>
                Discover
            </Heading>
            <Products
                error={error}
                homePageProductIds={productIds}
                isForHomePage={true}
                isLoaded={isLoaded}
                pageFirstProductIndex={0}
                pageLastProductIndex={productIds.size - 1}
                products={products}
                search={''}
                setError={setError}
                setErrorMessage={setErrorMessage}
                setLoaded={setLoaded}
                setProducts={setProducts}
                setProductsPerPage={() => {}}
            />
            <Container centerContent maxW='full'>
                <Button
                    onClick={() => history.push('/products/')}
                    borderRadius='6px'
                    colorScheme={colors.colorScheme}
                    isFullWidth={true}
                    m='16px'
                >
                    Browse all products
                </Button>
            </Container>
        </>
    );
}
