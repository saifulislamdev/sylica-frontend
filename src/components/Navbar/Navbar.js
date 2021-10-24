import React from 'react';
import {
	Flex,
	Box,
	Heading,
	Spacer,
	Select,
	IconButton,
	Badge,
} from '@chakra-ui/react';
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { colors } from '../../util/Constants';

const Navbar = () => {
	return (
		<Flex
			p='4'
			alignItems='center'
			position='sticky'
			top='0'
			bg='white'
			zIndex='10'
		>
			<Box>
				<Heading>Sylica</Heading>
			</Box>
			<Spacer />
			<Box p='4'>
				<Select placeholder='Account'>
					<option value='Your Orders'>Your Orders</option>
					<option value='Sell Product'>Sell Product</option>
				</Select>
			</Box>
			<Box p='4'>
				<IconButton icon={<AiOutlineUser />} bg={colors.secondary} />
			</Box>
			<Box p='4'>
				<IconButton icon={<AiOutlineShoppingCart />} />
				<Badge
					variant='outline'
					colorScheme='teal'
					style={{
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: '50%',
						backgroundColor: 'white',
						position: 'relative',
						top: '-15px',
						right: '10px',
					}}
					fontSize='0.9em'
				>
					{2}
				</Badge>
			</Box>
		</Flex>
	);
};

export default Navbar;
