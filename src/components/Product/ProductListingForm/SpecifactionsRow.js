import React from 'react';

import {
	GridItem,
	FormControl,
	FormLabel,
	FormHelperText,
	Input,
	IconButton,
} from '@chakra-ui/react';
import { IoCloseOutline } from 'react-icons/io5';

const SpecifactionsRow = ({ formLabel, formHelperText, placeholder, id }) => {
	return (
		<GridItem colSpan={1}>
			<FormControl>
				<FormLabel>{formLabel}</FormLabel>
				<Input id={id} placeholder={placeholder} />
				{formHelperText && <FormHelperText>{formHelperText}</FormHelperText>}
			</FormControl>
		</GridItem>
	);
};

export default SpecifactionsRow;
