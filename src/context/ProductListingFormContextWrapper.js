import React, { useState } from 'react';
import { ProductListingFormContext } from '../util/context';

export const ProductListingFormContextWrapper = ({ children }) => {
	const [productListing, setProductListing] = useState({
		generalInfo: {},
		specifications: [],
		images: [],
	});

	const updateGeneralInfo = (generalInfo) =>
		setProductListing({ ...productListing, generalInfo });

	return (
		<ProductListingFormContext.Provider
			value={{
				productListing,
				updateGeneralInfo,
			}}
		>
			{children}
		</ProductListingFormContext.Provider>
	);
};
