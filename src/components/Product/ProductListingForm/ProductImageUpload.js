import React from 'react';
import { useDropzone } from 'react-dropzone';
import {
	Button,
	Flex,
	Heading,
	VStack,
	UnorderedList,
	ListItem,
	Text,
} from '@chakra-ui/react';
import { GrFormPrevious } from 'react-icons/gr';
import { IoCreateOutline } from 'react-icons/io5';

import { colors, currentCreateProductForm } from '../../../util/constants';

const ProductImageUpload = ({ setCurrentForm }) => {
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

	const files = acceptedFiles.map((file) => (
		<ListItem key={file.path}>
			{file.path} ({(file.size / 1024).toFixed(0)} KB)
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
				height='132px'
				className='container'
				{...getRootProps({ className: 'dropzone' })}
			>
				<input {...getInputProps()} />
				<Text align='center'>
					Drag 'n' drop some files here, or click to select files
				</Text>
			</Flex>
			<Heading size='sz'>Images</Heading>
			<UnorderedList pl={4}>{files}</UnorderedList>

			<Button
				colorScheme={colors.colorScheme}
				variant='outline'
				size='sm'
				leftIcon={<GrFormPrevious />}
				onClick={() => {
					setCurrentForm(currentCreateProductForm.specifications);
				}}
			>
				Previous
			</Button>
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
};

export default ProductImageUpload;
