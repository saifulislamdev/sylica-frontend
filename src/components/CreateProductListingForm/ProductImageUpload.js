import React, { useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import {
	Button,
	Flex,
	Heading,
	Icon,
	ListItem,
	Text,
	UnorderedList,
	VStack,
} from '@chakra-ui/react';
import { GrFormPrevious } from 'react-icons/gr';
import { IoCreateOutline } from 'react-icons/io5';
import { AiOutlineCloudUpload } from 'react-icons/ai';

import { colors, currentCreateProductForm } from '../../util/constants';
import { ProductListingFormContext } from '../../util/context';
import { axiosInstance } from '../../util/config';

const ProductImageUpload = ({ setCurrentForm }) => {
	const { getRootProps, getInputProps } = useDropzone();
	const { updateImages, images, specificationTables, generalInfo } = useContext(
		ProductListingFormContext
	);

	const files = images.map((image) => (
		<ListItem key={image.name}>
			{image.name} ({(image.size / 1024).toFixed(0)} KB)
		</ListItem>
	));

	const onCreateProductClick = async () => {
		const config = {
			headers: {
				'content-type': 'multipart/form-data',
			},
		};
		const data = new FormData();
		data.append('title', generalInfo.title);
		data.append('vendor', generalInfo.vendor);
		data.append('description', generalInfo.description);
		data.append('price', parseFloat(generalInfo.price));
		data.append('quantity', parseFloat(generalInfo.quantity));
		data.append('categories', generalInfo.categories);
		data.append('subCategories', generalInfo.subCategories);
		data.append('imageFiles', images);
		data.append('specifications', specificationTables);

		const reqBody = {
			...generalInfo,
			price: parseFloat(generalInfo.price),
			quantity: parseFloat(generalInfo.quantity),
			specifications: specificationTables,
			images,
		};
		console.log(data);
		console.log(reqBody);

		axiosInstance
			.post(`/products`, data, config)
			.then((res) => console.log(res.body))
			.catch((err) => console.log(err.response.data.msg));
	};

	return (
		<VStack w='full' h='full' p={6} spacing={6} alignItems='flex-start'>
			<Heading size='md'>Upload product images</Heading>
			<Flex
				bg={colors.neutralLighterGray}
				borderWidth='1px'
				borderColor={colors.neutralGray}
				borderRadius={6}
				borderStyle='dashed'
				alignItems='center'
				justifyContent='center'
				w='full'
				height='152px'
				className='container'
				direction='column'
				{...getRootProps()}
				cursor='pointer'
			>
				<input
					{...getInputProps()}
					onChange={(e) => updateImages(e.target.files)}
				/>
				<Icon as={AiOutlineCloudUpload} />
				<Text fontWeight='bold' mb={4}>
					Upload images
				</Text>
				<Text>Drag 'n' drop some files here, or click to select files</Text>
			</Flex>
			<Heading size='sz'>Images</Heading>
			<UnorderedList pl={4}>{files}</UnorderedList>

			{/* <Button
				colorScheme={colors.colorScheme}
				variant='outline'
				size='sm'
				leftIcon={<GrFormPrevious />}
				onClick={() => {
					setCurrentForm(currentCreateProductForm.specifications);
				}}
			>
				Previous
			</Button> */}
			<Button
				colorScheme={colors.colorScheme}
				size='md'
				w='full'
				rightIcon={<IoCreateOutline />}
				onClick={onCreateProductClick}
			>
				Create Listing
			</Button>
		</VStack>
	);
};

export default ProductImageUpload;
