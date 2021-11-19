import React from 'react';
import {
	Button,
	SimpleGrid,
	GridItem,
	FormControl,
	FormLabel,
	FormHelperText,
	Input,
	Container,
	Textarea,
	VStack,
	Heading,
	Text,
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { GrFormNext } from 'react-icons/gr';
import { colors, currentCreateProductForm } from '../../../util/constants';
import SpecificationsTable from './SpecificationsTable';

const GeneralProductInfoForm = ({ setCurrentForm }) => {
	return (
		<VStack w='full' h='full' p={6} spacing={6} alignItems='flex-start'>
			<Heading size='md'>Enter general product information </Heading>
			<SimpleGrid columns={2} rowGap={6} columnGap={6} w='full'>
				<GridItem colSpan={1}>
					<FormControl isRequired>
						<FormLabel>Product Title</FormLabel>
						<Input id='product-title' placeholder='Product Title' type='text' />
					</FormControl>
				</GridItem>

				<GridItem colSpan={1}>
					<FormControl>
						<FormLabel>Vendor</FormLabel>
						<Input id='vendor' placeholder='Vendor' type='text' />
					</FormControl>
				</GridItem>

				<GridItem colSpan={2}>
					<FormControl>
						<FormLabel>Description</FormLabel>
						<Textarea id='description' placeholder='description' />
					</FormControl>
				</GridItem>

				<GridItem colSpan={1}>
					<FormControl isRequired>
						<FormLabel>Price</FormLabel>
						<Input id='price' placeholder='000.00' type='text' />
					</FormControl>
				</GridItem>

				<GridItem colSpan={1}>
					<FormControl>
						<FormLabel>Quantity</FormLabel>
						<Input id='quantity' placeholder='1' type='text' />
					</FormControl>
				</GridItem>

				<GridItem colSpan={1}>
					<FormControl>
						<FormLabel>Categories</FormLabel>
						<Input id='categories' placeholder='category1, category2,...' />
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
						/>
						<FormHelperText>
							List of sub-categories product belong to separated by commas
						</FormHelperText>
					</FormControl>
				</GridItem>
			</SimpleGrid>

			<Button
				rightIcon={<GrFormNext />}
				colorScheme='teal'
				variant='outline'
				size='sm'
				onClick={() => {
					setCurrentForm(currentCreateProductForm.specifications);
				}}
			>
				Next
			</Button>
		</VStack>
	);
};

export default GeneralProductInfoForm;
