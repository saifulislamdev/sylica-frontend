import React, { useContext } from 'react';
import {
	FormControl,
	FormLabel,
	FormHelperText,
	GridItem,
	Input,
} from '@chakra-ui/react';
import { ProductListingFormContext } from '../../util/context';

const SpecifactionsRow = ({
	formLabel,
	formHelperText,
	placeholder,
	rowId,
	tableId,
}) => {
	const { specificationTables, updateSpecificationsRow } = useContext(
		ProductListingFormContext
	);
	return (
		<GridItem colSpan={1}>
			<FormControl>
				<FormLabel>{formLabel}</FormLabel>
				<Input
					placeholder={placeholder}
					onChange={(e) => {
						updateSpecificationsRow(e, tableId, rowId);
					}}
					rowId={rowId}
					value={specificationTables[tableId].rows[rowId]}
				/>
				{formHelperText && <FormHelperText>{formHelperText}</FormHelperText>}
			</FormControl>
		</GridItem>
	);
};

export default SpecifactionsRow;
