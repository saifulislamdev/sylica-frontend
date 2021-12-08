import React from 'react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { render } from '@testing-library/react';

import ActiveProductListings from './ActiveProductListings';
import { axiosInstance } from '../../util/config';
import { act } from 'react-dom/test-utils';

describe('ActiveListings', () => {
    it('should fetch active listings', async () => {
        jest.spyOn(window.localStorage.__proto__, 'getItem');
        window.localStorage.__proto__.getItem = jest
            .fn()
            .mockReturnValueOnce(JSON.stringify({ _id: '1111' }));

        axiosInstance.get = jest.fn().mockResolvedValueOnce({
            data: {
                products: [
                    {
                        _id: '1',
                        description: 'product-1',
                        images: [
                            {
                                altName: 'someimage',
                                name: 'someimage',
                                src: 'someimage',
                            },
                        ],
                        price: 99,
                        quantity: 99,
                        title: 'product-1',
                    },
                ],
            },
        });

        await act(async () => render(<ActiveProductListings />));

        // getByText('product-1');
    });
});
