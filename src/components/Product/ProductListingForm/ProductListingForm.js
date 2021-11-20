import React, { useState } from 'react';
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
import GeneralProductInfoForm from './GeneralProductInfoForm';
import SpecificationsForm from './SpecificationsForm';
import ProductImageUpload from './ProductImageUpload';
import { currentCreateProductForm } from '../../../util/constants';

const CreateProductListingForm = () => {
	const [currentForm, setCurrentForm] = useState(
		currentCreateProductForm.generalInfo
	);

	const renderCurrentForm = () => {
		switch (currentForm) {
			case currentCreateProductForm.generalInfo:
				return <GeneralProductInfoForm setCurrentForm={setCurrentForm} />;

			case currentCreateProductForm.specifications:
				return <SpecificationsForm setCurrentForm={setCurrentForm} />;

			case currentCreateProductForm.images:
				return <ProductImageUpload setCurrentForm={setCurrentForm} />;

			default:
				return <GeneralProductInfoForm setCurrentForm={setCurrentForm} />;
		}
	};
	return renderCurrentForm();
	// <VStack w='full' h='full' alignItems='flex-start'>
	// 	<GeneralProductInfoForm setCurrentForm={setCurrentForm} />;
	// 	<SpecificationsForm setCurrentForm={setCurrentForm} />;
	// 	<ProductImageUpload setCurrentForm={setCurrentForm} />;
	// </VStack>
};

export default CreateProductListingForm;
