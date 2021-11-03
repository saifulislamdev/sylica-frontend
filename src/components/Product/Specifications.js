import React from 'react';
import { Box, Heading, Table, Tbody, Tr, Td } from '@chakra-ui/react';

const Specifications = ({ specifications }) => {
    return (
        <div>
            <Heading size='lg' m='16px'>
                Specifications
            </Heading>
            {specifications.map((table) => {
                return (
                    <Box p='16px'>
                        <Heading size='md'>{Object.keys(table)[0]}</Heading>
                        <Table>
                            <Tbody>
                                {table[Object.keys(table)[0]].map((row) => {
                                    return (
                                        <Tr>
                                            <Td w='50%'>
                                                {Object.keys(row)[0]}
                                            </Td>
                                            {!isNaN(
                                                +row[Object.keys(row)[0]]
                                            ) ? (
                                                <Td isNumeric w='50%'>
                                                    {row[Object.keys(row)[0]]}
                                                </Td>
                                            ) : (
                                                <Td w='50%'>
                                                    {row[Object.keys(row)[0]]}
                                                </Td>
                                            )}
                                        </Tr>
                                    );
                                })}
                            </Tbody>
                        </Table>
                    </Box>
                );
            })}
        </div>
    );
};

export default Specifications;
