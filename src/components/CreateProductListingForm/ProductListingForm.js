import React, { useState } from 'react';
import { currentCreateProductForm } from '../../util/constants';

import GeneralProductInfoForm from './GeneralProductInfoForm';
import ProductImageUpload from './ProductImageUpload';
import SpecificationsForm from './SpecificationsForm';

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
	// return renderCurrentForm();

	return (
		<>
			<GeneralProductInfoForm setCurrentForm={setCurrentForm} />
			<SpecificationsForm setCurrentForm={setCurrentForm} />
			<ProductImageUpload setCurrentForm={setCurrentForm} />
		</>
	);
};

export default CreateProductListingForm;
