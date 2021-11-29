import React, { useState } from 'react';
import { ProductListingFormContext } from '../util/context';

const ProductListingFormContextWrapper = ({ children }) => {
	const [generalInfo, setGeneralInfo] = useState({
		title: '',
		vendor: '',
		description: '',
		price: '',
		quantity: '',
		categories: [],
		subCategories: [],
	});
	const [specificationTables, setSpecificationTables] = useState([
		{ heading: '', rows: [[]] },
	]);
	const [images, setImages] = useState([]);

	const updateGeneralInfoText = (e) =>
		setGeneralInfo({
			...generalInfo,
			[e.target.name]: e.target.value,
		});

	const updateGeneralInfoArray = (e) =>
		setGeneralInfo({
			...generalInfo,
			[e.target.name]: e.target.value.split(',').map((val) => val.trim()),
		});

	const appendTableDataObject = () =>
		setSpecificationTables([
			...specificationTables,
			{ heading: '', rows: [[]] },
		]);

	const appendRowDataObject = (tableId) =>
		setSpecificationTables(
			specificationTables.map((table, index) =>
				tableId === index ? { ...table, rows: [...table.rows, []] } : table
			)
		);

	const updateSpecificationsRow = (e, tableId, rowId) => {
		const newTable = specificationTables[tableId];

		if (rowId === 'heading') {
			newTable.heading = e.target.value; // 0th row is heading row, so update heading
		} else {
			newTable.rows[rowId] = e.target.value.split(',').map((val) => val.trim()); // else split the string and store in rows array
		}

		setSpecificationTables(
			specificationTables.map((table, index) =>
				index === tableId ? newTable : table
			)
		);
	};

	const updateImages = (imgs) => setImages([...images, ...imgs]);
	return (
		<ProductListingFormContext.Provider
			value={{
				updateGeneralInfoText,
				updateGeneralInfoArray,
				appendTableDataObject,
				appendRowDataObject,
				updateSpecificationsRow,
				updateImages,
				generalInfo,
				specificationTables,
				images,
			}}
		>
			{children}
		</ProductListingFormContext.Provider>
	);
};

export default ProductListingFormContextWrapper;
