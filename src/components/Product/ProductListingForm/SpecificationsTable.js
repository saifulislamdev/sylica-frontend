import React, { useState } from 'react';
import { Button, Divider, SimpleGrid } from '@chakra-ui/react';
import SpecificationsRow from './SpecifactionsRow';

const SpecificationsTable = ({ tableId }) => {
	const [specificationTablesData, setSpecificationTablesData] = useState([]);

	const [rows, setRows] = useState([
		<SpecificationsRow
			formLabel='Row 1'
			formHelperText='Specification row: key-value pair separated by comma'
			placeholder='CPU, Intel i9-1100k'
			rowId={0}
		/>,
	]);

	const onClickAddRow = (e) => {
		setRows([
			...rows,
			<SpecificationsRow
				formLabel={`Row ${rows.length + 1}`}
				formHelperText='Specification row: key-value pair separated by comma'
				placeholder='CPU, Intel i9-1100k'
				rowId={rows.length}
			/>,
		]);
	};
	return (
		<SimpleGrid columns={1} rowGap={6} columnGap={6} w='full'>
			<SpecificationsRow formLabel='Heading' placeholder='Heading' />
			{rows}
			<Button variant='ghost' size='sm' w='80px' onClick={onClickAddRow}>
				Add Row
			</Button>
			<Divider size='full' />
		</SimpleGrid>
	);
};

export default SpecificationsTable;
