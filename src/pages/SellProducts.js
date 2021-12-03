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
                                description='The new MacBook Pro delivers game-changing performance for pro users. With the powerful M1 Pro to supercharge pro-level workflows while getting amazing battery life.¹ And with an immersive 14-inch Liquid Retina XDR display and an array of pro ports, you can do more than ever with MacBook Pro.²'
                                imageSrc='https://www.apple.com/v/macbook-pro-14-and-16/b/images/meta/macbook-pro-14-and-16_overview__fz0lron5xyuu_og.png'
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
