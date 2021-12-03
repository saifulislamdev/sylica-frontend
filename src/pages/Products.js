import React, { useState } from 'react';
import { Box, Input, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';
import Products from '../components/Product/Products';
import ProductPagination from '../components/Product/ProductPagination';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [isLoaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    /* Configuring products on different pages of the products page */
    const [currPage, setCurrPage] = useState(0);
    const [productsPerPage, setProductsPerPage] = useState(16);
    const [pageFirstProductIndex, setPageFirstProductIndex] = useState();
    const [pageLastProductIndex, setPageLastProductIndex] = useState();
    const productsPerPageOptions = [0, 4, 8, 16, 24];

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setProductsPerPage(productsPerPageOptions.at(-1));
        setCurrPage(0);
    };

    return !error ? (
        <>
            {/* Search */}
            <Box p='16px'>
                <Input
                    onChange={handleSearchChange}
                    value={search}
                    placeholder='Search Products...'
                    borderRadius='6px'
                    isFullWidth='true'
                    isDisabled={!products}
                    size='md'
                    variant='outline'
                ></Input>
            </Box>
            <Products
                error={error}
                isLoaded={isLoaded}
                pageFirstProductIndex={pageFirstProductIndex}
                pageLastProductIndex={pageLastProductIndex}
                products={products}
                search={search}
                setError={setError}
                setErrorMessage={setErrorMessage}
                setLoaded={setLoaded}
                setProducts={setProducts}
                setProductsPerPage={setProductsPerPage}
            />
            <ProductPagination
                currPage={currPage}
                pageFirstProductIndex={pageFirstProductIndex}
                pageLastProductIndex={pageLastProductIndex}
                productsPerPage={productsPerPage}
                productsPerPageOptions={productsPerPageOptions}
                setCurrPage={setCurrPage}
                setPageFirstProductIndex={setPageFirstProductIndex}
                setPageLastProductIndex={setPageLastProductIndex}
                setProductsPerPage={setProductsPerPage}
                totalProducts={products.length}
            />
        </>
    ) : (
        <Text color='red' pl='16px'>
            {errorMessage}
        </Text>
    );
}
