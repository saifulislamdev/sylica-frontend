import React from 'react';

import ProductListingFormContextWrapper from '../../context/ProductListingFormContextWrapper';
import GeneralProductInfoForm from './GeneralProductInfoForm';
import ProductImageUpload from './ProductImageUpload';
import SpecificationsForm from './SpecificationsForm';

export default function CreateProductListingForm() {
	return (
		<>
			<ProductListingFormContextWrapper>
				<GeneralProductInfoForm />
				<SpecificationsForm />
				<ProductImageUpload />
			</ProductListingFormContextWrapper>
		</>
	);
}
