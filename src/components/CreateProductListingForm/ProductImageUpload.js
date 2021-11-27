import React, { useCallback, useContext } from 'react';
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
import { IoCreateOutline } from 'react-icons/io5';
import { AiOutlineCloudUpload } from 'react-icons/ai';

import { colors } from '../../util/constants';
import { ProductListingFormContext } from '../../util/context';

export default function ProductImageUpload() {
	const { updateImages, images, specificationTables, generalInfo } = useContext(
		ProductListingFormContext
	);

	const onDrop = useCallback((acceptedFiles) => {
		updateImages(acceptedFiles);
	}, []);

	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		onDrop,
	});

	const files = images.map((image) => (
		<ListItem key={image.name}>
			{image.name} ({(image.size / 1024).toFixed(0)} KB)
		</ListItem>
	));

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
				<input {...getInputProps()} />
				<Icon as={AiOutlineCloudUpload} />
				<Text fontWeight='bold' mb={4}>
					Upload images
				</Text>
				<Text>Drag 'n' drop some files here, or click to select files</Text>
			</Flex>
			<Heading size='sz'>Images</Heading>
			<UnorderedList pl={4}>{files}</UnorderedList>

			<Button
				colorScheme={colors.colorScheme}
				size='md'
				w='full'
				rightIcon={<IoCreateOutline />}
			>
				Create Listing
			</Button>
		</VStack>
	);
}
