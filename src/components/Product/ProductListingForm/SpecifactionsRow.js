import React, { useContext } from 'react';

import {
	GridItem,
	FormControl,
	FormLabel,
	FormHelperText,
	Input,
} from '@chakra-ui/react';
import { ProductListingFormContext } from '../../../util/context';

const SpecifactionsRow = ({
	formLabel,
	formHelperText,
	placeholder,
	tableId,
	rowId,
}) => {
	const { updateSpecificationsRow } = useContext(ProductListingFormContext);
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
				/>
				{formHelperText && <FormHelperText>{formHelperText}</FormHelperText>}
			</FormControl>
		</GridItem>
	);
};

export default SpecifactionsRow;
