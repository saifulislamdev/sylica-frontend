import React from 'react';
import {
	Flex,
	Box,
	Heading,
	Spacer,
	Select,
	IconButton,
} from '@chakra-ui/react';
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { colors } from '../../util/Constants';

export default function Navbar() {
	return (
		<Flex p='4' alignItems='center'>
			<Box>
				<Heading>Sylica</Heading>
			</Box>
			<Spacer />
			<Box p='4'>
				<Select placeholder='Account'>
					<option value='option1'>Option 1</option>
					<option value='option2'>Option 2</option>
					<option value='option3'>Option 3</option>
				</Select>
			</Box>
			<Box p='4'>
				<IconButton icon={<AiOutlineUser />} bg={colors.secondary} />
			</Box>
			<Box p='4'>
				<IconButton icon={<AiOutlineShoppingCart />} />
			</Box>
		</Flex>
	);
}
