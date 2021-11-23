import React, { useState, useContext } from 'react';
import {
	Button,
	SimpleGrid,
	GridItem,
	FormControl,
	FormLabel,
	FormHelperText,
	Input,
	Textarea,
	VStack,
	Heading,
} from '@chakra-ui/react';
import { GrFormNext } from 'react-icons/gr';
import { colors, currentCreateProductForm } from '../../../util/constants';
import { ProductListingFormContext } from '../../../util/context';

const GeneralProductInfoForm = ({ setCurrentForm }) => {
	const [generalInfo, setGeneralInfo] = useState({
		title: '',
		vendor: '',
		description: '',
		price: '',
		quantity: '',
		categories: [],
		subCategories: [],
	});

	const { updateGeneralInfo } = useContext(ProductListingFormContext);

	const onChangeText = (e) =>
		setGeneralInfo({ ...generalInfo, [e.target.name]: e.target.value });

	const onChangeArrayInput = (e) =>
		setGeneralInfo({
			...generalInfo,
			[e.target.name]: e.target.value.split(',').map((val) => val.trim()),
		});

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
							onChange={onChangeText}
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
							onChange={onChangeText}
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
							onChange={onChangeText}
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
							onChange={onChangeText}
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
							onChange={onChangeText}
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
							onChange={onChangeArrayInput}
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
							onChange={onChangeArrayInput}
						/>
						<FormHelperText>
							List of sub-categories product belong to separated by commas
						</FormHelperText>
					</FormControl>
				</GridItem>
			</SimpleGrid>

			<Button
				rightIcon={<GrFormNext />}
				colorScheme={colors.colorScheme}
				variant='outline'
				size='sm'
				onClick={() => {
					updateGeneralInfo(generalInfo);
					setCurrentForm(currentCreateProductForm.specifications);
				}}
			>
				Next
			</Button>
		</VStack>
	);
};

export default GeneralProductInfoForm;