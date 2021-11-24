import React, { useState, useContext } from 'react';
import { Button, Divider, SimpleGrid } from '@chakra-ui/react';
import SpecificationsRow from './SpecifactionsRow';
import { ProductListingFormContext } from '../../../util/context';

const SpecificationsTable = ({ tableId }) => {
	const { appendRowDataObject } = useContext(ProductListingFormContext);
	const [rows, setRows] = useState([
		<SpecificationsRow
			formLabel='Row 1'
			formHelperText='Specification row: key-value pair separated by comma'
			placeholder='CPU, Intel i9-1100k'
			rowId={0}
			tableId={tableId}
		/>,
	]);

	const onClickAddRow = (e) => {
		appendRowDataObject(tableId); // appends an empty array in specificationsTables[tableId].rows
		setRows([
			...rows,
			<SpecificationsRow
				formLabel={`Row ${rows.length + 1}`}
				formHelperText='Specification row: key-value pair separated by comma'
				placeholder='CPU, Intel i9-1100k'
				rowId={rows.length}
				tableId={tableId}
			/>,
		]);
	};
	return (
		<SimpleGrid columns={1} rowGap={6} columnGap={6} w='full'>
			<SpecificationsRow
				formLabel='Heading'
				placeholder='Heading'
				rowId='heading'
				tableId={tableId}
			/>
			{rows}
			<Button variant='ghost' size='sm' w='80px' onClick={onClickAddRow}>
				Add Row
			</Button>
			<Divider size='full' />
		</SimpleGrid>
	);
};

export default SpecificationsTable;
