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

import { colors } from '../util/constants';
import ProductListingForm from '../components/CreateProductListingForm/ProductListingForm';
import ActiveProductListings from '../components/Product/ActiveProductListings';

function SellProducts() {
    return (
        <>
            <Heading m={4}>Sell Products</Heading>
            <Box
                w='full'
                mb={6}
                borderWidth='1px'
                borderColor={colors.neutralLighterGray}
                borderRadius={8}
            >
                <Tabs colorScheme={colors.colorScheme}>
                    <TabList mt={6} ml={6} mr={6}>
                        <Tab data-testid='active-listings-btn'>
                            Active Listings
                        </Tab>
                        <Tab data-testid='create-listing-btn'>
                            Create Listing
                        </Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <ActiveProductListings />
                        </TabPanel>
                        <TabPanel>
                            <ProductListingForm />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </>
    );
}

export default SellProducts;
