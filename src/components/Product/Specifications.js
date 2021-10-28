import React from 'react';
import { Heading, Table, Tbody, Tr, Td } from '@chakra-ui/react';

import '../../styles/Specifications.css';

const Specifications = ({ specifications }) => {
	return (
		<div>
			<Heading className='specification__heading' size='lg'>
				Specifications
			</Heading>
			{specifications.map((table) => {
				return (
					<div className='specification__table'>
						<Heading size='md'>{Object.keys(table)[0]}</Heading>
						<Table>
							<Tbody>
								{table[Object.keys(table)[0]].map((row) => {
									return (
										<Tr>
											<Td w='50%'>{Object.keys(row)[0]}</Td>
											{!isNaN(+row[Object.keys(row)[0]]) ? (
												<Td isNumeric w='50%'>
													{row[Object.keys(row)[0]]}
												</Td>
											) : (
												<Td w='50%'>{row[Object.keys(row)[0]]}</Td>
											)}
										</Tr>
									);
								})}
							</Tbody>
						</Table>
					</div>
				);
			})}
		</div>
	);
};

export default Specifications;
