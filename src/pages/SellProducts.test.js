import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SellProducts from '../../pages/SellProducts';

it('should render active listings', () => {
    render(<SellProducts />);

    expect(screen.getAllByRole('heading')[0]).toHaveTextContent(
        'Sell Products'
    );

    // active listings panel should be enabled on render
    expect(screen.getByTestId('active-listings-btn')).toBeEnabled();

    // TODO: mock active listings call and expect render accordingly
});

it('should switch to create listing and render form', () => {
    render(<SellProducts />);

    expect(screen.getAllByRole('heading')[0]).toHaveTextContent(
        'Sell Products'
    );
    // active listings panel should be enabled on render
    expect(screen.getByTestId('active-listings-btn')).toBeEnabled();

    userEvent.click(screen.getByTestId('create-listing-btn'));

    // upon click Create Listing panel should be enabled
    expect(screen.getByTestId('create-listing-btn')).toBeEnabled();
    expect(
        screen.getByText('Enter general product information')
    ).toBeInTheDocument();
    expect(screen.getByText('Create specifications Table')).toBeInTheDocument();
    expect(screen.getByText('Upload product images')).toBeInTheDocument();
});
