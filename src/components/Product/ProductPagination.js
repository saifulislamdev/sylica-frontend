import React from 'react';
import { Box, Flex, IconButton, Select, Spacer, Text } from '@chakra-ui/react';
import {
    MdOutlineArrowBackIosNew,
    MdOutlineArrowForwardIos,
} from 'react-icons/md';
import { colors } from '../../util/constants';

export default function ProductPagination({
    currPage,
    pageFirstProductIndex,
    pageLastProductIndex,
    productsPerPage,
    productsPerPageOptions,
    setCurrPage,
    setPageFirstProductIndex,
    setPageLastProductIndex,
    setProductsPerPage,
    totalProducts,
}) {
    setPageFirstProductIndex(currPage * productsPerPage); // index in products array for first image shown on page
    setPageLastProductIndex(
        Math.min(
            currPage * productsPerPage + productsPerPage - 1,
            totalProducts - 1
        )
    ); // index in products array for last image shown on page

    const pageFirstProductNum =
        productsPerPage === 0 ? 0 : pageFirstProductIndex + 1; // number of first product in page out of all products (e.g. x-4 of 6)
    const pageLastProductNum = pageLastProductIndex + 1; // number of last product in page out of all products (e.g. 1-x of 6)

    const handleProductsPerPageChange = (e) => {
        const newProductsPerPage = parseInt(e.target.value);
        if (newProductsPerPage > totalProducts || newProductsPerPage === 0) {
            // If all products will fit entirely into 1 page or if 0 products should be shown
            setCurrPage(0);
            setProductsPerPage(newProductsPerPage);
        } else
            for (let c = currPage; c > -1; c--) {
                const currPageLastProductIndex =
                    c * newProductsPerPage + newProductsPerPage - 1;
                if (currPageLastProductIndex < totalProducts) {
                    setCurrPage(c);
                    setProductsPerPage(newProductsPerPage);
                }
            }
    };

    return (
        <Flex align='center' p='16px'>
            <Flex align='center' justify='flex-start'>
                <Text color={colors.neutralGray} fontSize='sm' w='auto'>
                    Show items per page
                </Text>
                <Select
                    onChange={handleProductsPerPageChange}
                    value={productsPerPage}
                    borderColor={colors.neutralLighterGray}
                    borderRadius='6px'
                    mx='8px'
                    size='sm'
                    w='auto'
                >
                    {productsPerPageOptions.map((option) => {
                        return <option value={option}>{option}</option>;
                    })}
                </Select>
            </Flex>
            <Spacer />
            <Flex align='center' justify='flex-end'>
                <Text align='right' color={colors.neutralGray} fontSize='sm'>
                    {`${pageFirstProductNum}-${pageLastProductNum} of ${totalProducts}`}
                </Text>
                <Box mx='8px'>
                    <IconButton
                        onClick={() => {
                            setCurrPage(currPage - 1);
                        }}
                        icon={<MdOutlineArrowBackIosNew />}
                        borderRadius='6px'
                        isDisabled={currPage === 0}
                        isRound='false'
                        size='xs'
                        variant='ghost'
                        aria-label='Go to previous products view'
                    />
                    <IconButton
                        onClick={() => {
                            setCurrPage(currPage + 1);
                        }}
                        icon={<MdOutlineArrowForwardIos />}
                        borderRadius='6px'
                        isDisabled={
                            pageLastProductIndex >= totalProducts - 1 ||
                            productsPerPage === 0
                        }
                        isRound='false'
                        size='xs'
                        variant='ghost'
                        aria-label='Go to next products view'
                    />
                </Box>
            </Flex>
        </Flex>
    );
}
