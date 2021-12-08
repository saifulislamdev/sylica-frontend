import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ActiveProductListing from './ActiveProductListing';
import { axiosInstance } from '../../util/config';

describe('ActiveProductListing', () => {
    it('should load the component with active status', async () => {
        const { getByText, findByRole } = render(
            <ActiveProductListing
                id='61908195cdec62705404cdd9'
                title='Apple MacBook Pro 14"'
                description='some description'
                imageSrc='/path/to/some/image'
                price='1999.99'
                maxQuantity='23'
            />
        );

        getByText('Active');
        getByText('Apple MacBook Pro 14"');
        getByText('some description');
        getByText(1999.99);
        getByText(23);
        expect(await findByRole('img')).toHaveAttribute(
            'src',
            'http://localhost:5000/api/path/to/some/image'
        );
    });

    it('should load the component with sold out status', async () => {
        const { getByText } = render(
            <ActiveProductListing
                id='61908195cdec62705404cdd9'
                title='Apple MacBook Pro 14"'
                description='some description'
                imageSrc='/path/to/image'
                price='1999.99'
                maxQuantity='0'
            />
        );

        getByText(0);
    });

    it('should open delete dialog box', () => {
        const { getByText } = render(
            <ActiveProductListing
                id='61908195cdec62705404cdd9'
                title='Apple MacBook Pro 14"'
                description='some description'
                imageSrc='/path/to/image'
                price='1999.99'
                maxQuantity='0'
            />
        );

        userEvent.click(getByText('Remove Listing')); // open dialog box

        getByText("Are you sure? You can't undo this action afterwards.");
        getByText('Cancel');
        getByText('Delete');
    });

    it('should close delete dialog box', () => {
        const { getByText } = render(
            <ActiveProductListing
                id='61908195cdec62705404cdd9'
                title='Apple MacBook Pro 14"'
                description='some description'
                imageSrc='/path/to/image'
                price='1999.99'
                maxQuantity='0'
            />
        );

        userEvent.click(getByText('Remove Listing')); // open dialog box
        userEvent.click(getByText('Cancel')); // close dialog box

        getByText('Apple MacBook Pro 14"'); // expect product to be rendered back
    });

    it('should delete product', async () => {
        const { getByText, findByText } = render(
            <ActiveProductListing
                id='61908195cdec62705404cdd9'
                title='Apple MacBook Pro 14"'
                description='some description'
                imageSrc='/path/to/image'
                price='1999.99'
                maxQuantity='0'
            />
        );
        axiosInstance.delete = jest.fn().mockResolvedValueOnce({
            data: {
                msg: 'Product deleted successfully!',
            },
        }); // mock successful api call
        const toast = jest.fn();

        userEvent.click(getByText('Remove Listing')); // open dialog box
        userEvent.click(getByText('Delete'));
        localStorage.getItem = jest.fn().mockReturnValueOnce('some token');
    });
    it('should show err message if delete fails', async () => {
        const { getByText } = render(
            <ActiveProductListing
                id='61908195cdec62705404cdd9'
                title='Apple MacBook Pro 14"'
                description='some description'
                imageSrc='/path/to/image'
                price='1999.99'
                maxQuantity='0'
            />
        );
        axiosInstance.delete = jest.fn().mockRejectedValueOnce(''); // mock successful api call
        const toast = jest.fn();
        const setIsOpen = jest.fn();

        userEvent.click(getByText('Remove Listing')); // open dialog box
        userEvent.click(getByText('Delete'));
        localStorage.getItem = jest.fn().mockReturnValueOnce('some token');
    });
});
