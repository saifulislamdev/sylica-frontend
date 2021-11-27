import React, { useContext } from 'react';
import {
	FormControl,
	FormHelperText,
	FormLabel,
	GridItem,
	Heading,
	Input,
	SimpleGrid,
	Textarea,
	VStack,
} from '@chakra-ui/react';
import { ProductListingFormContext } from '../../util/context';

const GeneralProductInfoForm = ({ setCurrentForm }) => {
	const { updateGeneralInfoText, updateGeneralInfoArray, generalInfo } =
		useContext(ProductListingFormContext);

	return (
		<VStack w='full' h='full' p={6} spacing={6} alignItems='flex-start'>
			<Heading size='md'>Enter general product information </Heading>
			<SimpleGrid columns={2} rowGap={6} columnGap={6} w='full'>
				<GridItem colSpan={1}>
					<FormControl isRequired>
						<FormLabel>Product Title</FormLabel>
						<Input
							id='product-title'
							placeholder='Product Title'
							type='text'
							name='title'
							onChange={updateGeneralInfoText}
							value={generalInfo.title}
						/>
					</FormControl>
				</GridItem>

				<GridItem colSpan={1}>
					<FormControl>
						<FormLabel>Vendor</FormLabel>
						<Input
							id='vendor'
							placeholder='Vendor'
							type='text'
							name='vendor'
							onChange={updateGeneralInfoText}
							value={generalInfo.vendor}
						/>
					</FormControl>
				</GridItem>

				<GridItem colSpan={2}>
					<FormControl>
						<FormLabel>Description</FormLabel>
						<Textarea
							id='description'
							placeholder='description'
							name='description'
							onChange={updateGeneralInfoText}
							value={generalInfo.description}
						/>
					</FormControl>
				</GridItem>

				<GridItem colSpan={1}>
					<FormControl isRequired>
						<FormLabel>Price</FormLabel>
						<Input
							id='price'
							placeholder='000.00'
							type='text'
							name='price'
							onChange={updateGeneralInfoText}
							value={generalInfo.price}
						/>
					</FormControl>
				</GridItem>

				<GridItem colSpan={1}>
					<FormControl>
						<FormLabel>Quantity</FormLabel>
						<Input
							id='quantity'
							placeholder='1'
							type='text'
							name='quantity'
							onChange={updateGeneralInfoText}
							value={generalInfo.quantity}
						/>
					</FormControl>
				</GridItem>

				<GridItem colSpan={1}>
					<FormControl>
						<FormLabel>Categories</FormLabel>
						<Input
							id='categories'
							placeholder='category1, category2,...'
							name='categories'
							onChange={updateGeneralInfoArray}
							value={generalInfo.categories.toString()} // convert array back to string to display
						/>
						<FormHelperText>
							List of categories product belong to separated by commas
						</FormHelperText>
					</FormControl>
				</GridItem>

				<GridItem colSpan={1}>
					<FormControl>
						<FormLabel>Sub-Categories</FormLabel>
						<Input
							id='subCategories'
							placeholder='sub-category1, sub-category2,...'
							name='subCategories'
							onChange={updateGeneralInfoArray}
							value={generalInfo.subCategories.toString()} // convert array back to string to display
						/>
						<FormHelperText>
							List of sub-categories product belong to separated by commas
						</FormHelperText>
					</FormControl>
				</GridItem>
			</SimpleGrid>
		</VStack>
	);
};

export default GeneralProductInfoForm;
