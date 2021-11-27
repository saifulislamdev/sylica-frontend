import React from 'react';

import GeneralProductInfoForm from './GeneralProductInfoForm';
import ProductImageUpload from './ProductImageUpload';
import SpecificationsForm from './SpecificationsForm';

export default function CreateProductListingForm() {
	return (
		<>
			<GeneralProductInfoForm />
			<SpecificationsForm />
			<ProductImageUpload />
		</>
	);
}
