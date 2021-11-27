import React, { useContext, useState } from 'react';
import { Button, Container, Heading, VStack } from '@chakra-ui/react';
import { colors } from '../../util/constants';
import { ProductListingFormContext } from '../../util/context';

import Specifications from '../Product/Specifications';
import SpecificationsTable from './SpecificationsTable';

export default function SpecificationsForm() {
	const { appendTableDataObject, specificationTables } = useContext(
		ProductListingFormContext
	);
	const [tables, setTables] = useState([<SpecificationsTable tableId={0} />]);

	const onAddTableClick = (e) => {
		appendTableDataObject();
		setTables([...tables, <SpecificationsTable tableId={tables.length} />]);
	};

	return (
		<VStack w='full' h='full' p={6} spacing={6} alignItems='flex-start'>
			<Heading size='md'> Create specifications Table </Heading>

			{tables}

			<Button size='sm' variant='ghost' onClick={onAddTableClick}>
				Add Table{' '}
			</Button>

			<Container
				borderColor={colors.neutralLighterGray}
				borderWidth='1px'
				borderRadius={6}
				maxW='full'
			>
				<Specifications specifications={specificationTables} />
			</Container>
		</VStack>
	);
}
