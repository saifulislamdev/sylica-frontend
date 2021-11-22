import React, { useState } from 'react';
import { ProductListingFormContext } from '../util/context';

export const ProductListingFormContextWrapper = ({ children }) => {
	const [productListing, setProductListing] = useState([]);
};
