import React, { useState } from 'react';

import {
	GridItem,
	FormControl,
	FormLabel,
	FormHelperText,
	Input,
} from '@chakra-ui/react';

const SpecifactionsRow = ({
	formLabel,
	formHelperText,
	placeholder,
	rowId,
}) => {
	const [tableData, setTableData] = useState({
		heading: '',
		rows: [],
	});
	const onChangeRowInput = (e) => {
		rowId === 0
			? setTableData({ ...tableData, heading: e.target.value }) // first row is heading so update the heading field
			: setTableData({
					...tableData,
					rows: tableData.rows.map((row, index) =>
						// find the index of the target row and update that row in the array
						index === e.target.rowId
							? e.target.value.split(',').map((val) => val.trim())
							: row
					),
			  });
	};
	return (
		<GridItem colSpan={1}>
			<FormControl>
				<FormLabel>{formLabel}</FormLabel>
				<Input
					placeholder={placeholder}
					onChange={onChangeRowInput}
					rowId={rowId}
				/>
				{formHelperText && <FormHelperText>{formHelperText}</FormHelperText>}
			</FormControl>
		</GridItem>
	);
};

export default SpecifactionsRow;
