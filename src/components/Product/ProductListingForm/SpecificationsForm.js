import React, { useState } from 'react';
import { Button, VStack, HStack, Heading } from '@chakra-ui/react';
import SpecificationsTable from './SpecificationsTable';
import { colors, currentCreateProductForm } from '../../../util/constants';

import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

const SpecificationsForm = ({ setCurrentForm }) => {
	const [tables, setTables] = useState([<SpecificationsTable tableId={0} />]);

	const onAddTableClick = (e) => {
		setTables([...tables, <SpecificationsTable tableId={tables.length} />]);
	};

	return (
		<VStack w='full' h='full' p={6} spacing={6} alignItems='flex-start'>
			<Heading size='md'> Create specifications Table </Heading>

			{tables}

			<Button size='sm' variant='ghost' onClick={onAddTableClick}>
				Add Table{' '}
			</Button>

			<HStack>
				<Button
					colorScheme={colors.colorScheme}
					variant='outline'
					size='sm'
					leftIcon={<GrFormPrevious />}
					onClick={() => {
						setCurrentForm(currentCreateProductForm.generalInfo);
					}}
				>
					Previous
				</Button>
				<Button
					rightIcon={<GrFormNext />}
					colorScheme='teal'
					variant='outline'
					size='sm'
					onClick={() => {
						setCurrentForm(currentCreateProductForm.images);
					}}
				>
					Next
				</Button>
			</HStack>
		</VStack>
	);
};

export default SpecificationsForm;
