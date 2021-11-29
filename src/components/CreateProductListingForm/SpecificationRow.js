import React, { useContext } from 'react';
import {
	FormControl,
	FormLabel,
	FormHelperText,
	GridItem,
	Input,
} from '@chakra-ui/react';
import { ProductListingFormContext } from '../../util/context';

export default function SpecifactionsRow({
	formLabel,
	formHelperText,
	placeholder,
	rowId,
	tableId,
}) {
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
}
