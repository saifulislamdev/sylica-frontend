import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Specifications from '../../components/Product/Specifications';

describe('Specifications', () => {
    it('Loads an empty table', () => {
        render(<Specifications specifications={[]} />);
        expect(screen.getByRole('heading')).toHaveTextContent('Specifications'); // loads heading for component
        expect(screen.queryByRole('table')).not.toBeInTheDocument(); // no table is loaded
    });

    it('Loads one table with one row', () => {
        render(
            <Specifications
                specifications={[
                    {
                        heading: 'Table One',
                        rows: [
                            [
                                'TableOneRowOneColumnOne',
                                'TableOneRowOneColumnTwo',
                            ],
                        ],
                    },
                ]}
            />
        );
        /* Component */
        expect(screen.getAllByRole('heading')[0]).toHaveTextContent(
            'Specifications'
        ); // loads heading for component

        /* Table */
        expect(screen.getAllByRole('table')).toHaveLength(1); // loads one table
        expect(screen.getAllByRole('heading')[1]).toHaveTextContent(
            'Table One'
        ); // loads table heading

        /* Rows in table */
        expect(screen.getAllByRole('row')).toHaveLength(1); // loads one row

        /* Columns in table */
        expect(screen.getAllByRole('gridcell')).toHaveLength(2); // loads two columns
        expect(screen.getAllByRole('gridcell')[0]).toHaveTextContent(
            'TableOneRowOneColumnOne'
        ); // text in first column (of only row)
        expect(screen.getAllByRole('gridcell')[1]).toHaveTextContent(
            'TableOneRowOneColumnTwo'
        ); // text in second column (of only row)
    });

    it('Loads multiple tables with multiple rows', () => {
        render(
            <Specifications
                specifications={[
                    {
                        heading: 'Table One',
                        rows: [
                            [
                                'TableOneRowOneColumnOne',
                                'TableOneRowOneColumnTwo',
                            ],
                            [
                                'TableOneRowTwoColumnOne',
                                'TableOneRowTwoColumnTwo',
                            ],
                            [
                                'TableOneRowThreeColumnOne',
                                'TableOneRowThreeColumnTwo',
                            ],
                        ],
                    },
                    {
                        heading: 'Table Two',
                        rows: [
                            [
                                'TableTwoRowOneColumnOne',
                                'TableTwoRowOneColumnTwo',
                            ],
                            [
                                'TableTwoRowTwoColumnOne',
                                'TableTwoRowTwoColumnTwo',
                            ],
                        ],
                    },
                ]}
            />
        );
        /* Component */
        expect(screen.getAllByRole('heading')[0]).toHaveTextContent(
            'Specifications'
        ); // loads heading for component

        /* Table */
        expect(screen.getAllByRole('table')).toHaveLength(2); // loads two tables
        expect(screen.getAllByRole('heading')[1]).toHaveTextContent(
            'Table One'
        ); // loads table one heading
        expect(screen.getAllByRole('heading')[2]).toHaveTextContent(
            'Table Two'
        ); // loads table two heading
        expect(screen.getAllByRole('heading')).toHaveLength(3); // the only headings that exist are for component and two tables

        /* Rows in table */
        expect(screen.getAllByRole('row')).toHaveLength(5); // loads five rows
        expect(screen.getAllByRole('row')[0]).toHaveTextContent(
            'TableOneRowOneColumnTwo'
        ); // loads row in first table
        expect(screen.getAllByRole('row')[3]).toHaveTextContent(
            'TableTwoRowOneColumnOne'
        ); // loads row in second table

        /* Columns in table */
        expect(screen.getAllByRole('gridcell')).toHaveLength(10); // loads two columns for five rows
        expect(screen.getAllByRole('gridcell')[0]).toHaveTextContent(
            'TableOneRowOneColumnOne'
        ); // text in first column of first row in first table
        expect(screen.getAllByRole('gridcell')[1]).toHaveTextContent(
            'TableOneRowOneColumnTwo'
        ); // text in second column of first row in first table
        expect(screen.getAllByRole('gridcell')[7]).toHaveTextContent(
            'TableTwoRowOneColumnTwo'
        ); // text in second column of first row in second table
    });
});
