import React from 'react';
import { Box, Heading, Table, Tbody, Td, Tr } from '@chakra-ui/react';

const Specifications = ({ specifications }) => {
    return (
        <>
            <Heading size='lg' m='16px'>
                Specifications
            </Heading>
            {specifications.map((table, t) => {
                return (
                    <Box key={`table${t}`} p='16px'>
                        <Heading size='md'>{table.heading}</Heading>
                        <Table>
                            <Tbody>
                                {table.rows.map((row, r) => {
                                    return (
                                        <Tr key={`table${t}row${r}`}>
                                            <Td w='50%'>{row[0]}</Td>
                                            {!isNaN(+row[1]) ? (
                                                <Td isNumeric w='50%'>
                                                    {row[1]}
                                                </Td>
                                            ) : (
                                                <Td w='50%'>{row[1]}</Td>
                                            )}
                                        </Tr>
                                    );
                                })}
                            </Tbody>
                        </Table>
                    </Box>
                );
            })}
        </>
    );
};

export default Specifications;
