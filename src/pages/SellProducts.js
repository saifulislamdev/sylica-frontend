import React from 'react';
import {
    Box,
    Heading,
    Tab,
    Tabs,
    TabList,
    TabPanel,
    TabPanels,
} from '@chakra-ui/react';
import ActiveProductListing from '../components/Product/ActiveProductListing';
import { colors } from '../util/constants';
import ProductListingForm from '../components/CreateProductListingForm/ProductListingForm';

function SellProducts() {
    return (
        <Box
            w='full'
            mb={6}
            borderWidth='1px'
            borderColor={colors.neutralLighterGray}
            borderRadius={8}
        >
            <Heading m={4}>Sell Products</Heading>
            <Tabs colorScheme={colors.colorScheme}>
                <TabList mt={6} ml={6} mr={6}>
                    <Tab data-testid='active-listings-btn'>Active Listings</Tab>
                    <Tab data-testid='create-listing-btn'>Create Listing</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        {[1, 2, 3, 4, 5, 6, 7].map((x) => (
                            <ActiveProductListing
                                title='MacBook Pro 14"'
                                price='199.99'
                                maxQuantity='34'
                                description='lorefj;aklfjdas;klf jdklfjdsaklfh ;lkdshf kdfhdsj;fh djlfhsdfj lfdhfjkfdh fdkjlfhdjkf hsdj dlfhfjdf ljfhdjkf hsdlfhjsfls df '
                                imageSrc='http://localhost:5000/api/products/images/00dca6e72ae5506507e7270ea7a62792.jpeg'
                            />
                        ))}
                    </TabPanel>
                    <TabPanel>
                        <ProductListingForm />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}

export default SellProducts;
