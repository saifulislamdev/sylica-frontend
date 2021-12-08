import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import ProductPagination from './ProductPagination';

const PRODUCTS = [
    {
        title: 'Apple MacBook Pro 14"',
        description:
            'The new MacBook Pro delivers game-changing performance for pro users. With the powerful M1 Pro to supercharge pro-level workflows while getting amazing battery life.¹ And with an immersive 14-inch Liquid Retina XDR display and an array of pro ports, you can do more than ever with MacBook Pro.²',
        price: 1999.99,
        quantity: 30,
    },
    {
        title: 'Microsoft Surface Laptop Studio',
        description:
            'Set your imagination free on the most powerful Surface Laptop, designed to light up the best of Windows 11. Boundary-pushing design lets you flex your creative muscle on the sleek 14.4“⁴ touchscreen, making seamless transitions from laptop to entertainment-ready stage to portable creative canvas',
        price: 2099.99,
        quantity: 0,
    },
    {
        title: 'Apple iPhone 13 Pro',
        description:
            'iPhone 13 Pro. The biggest Pro camera system upgrade ever. Super Retina XDR display with ProMotion for a faster, more responsive feel. Lightning-fast A15 Bionic chip. Superfast 5G.¹ Durable design and a huge leap in battery life.',
        price: 999.99,
        quantity: 30,
    },
    {
        title: 'HP - ENVY Desktop',
        description:
            'Fuel your creativity: Unleash your creativity with a powerful Intel® processor. With impressive power and exceptional efficiency, you can bring your creative vision to life like never before.',
        price: 949.99,
        quantity: 30,
    },
    {
        title: 'Samsung Galaxy Z Fold3',
        description:
            'Unfold a world of possibilities with Samsung Galaxy Z Fold3 5G. You can do it all on this incredible device that’s so much more than a phone — it’s a compact yet powerful tablet that helps you master your busy life. Bring your workspace anywhere with a foldable, expansive screen that gives you multiple windows that make multitasking a breeze.',
        price: 1899.99,
        quantity: 30,
    },
];

describe('ProductPagination', () => {
    const currPage = 0;
    const pageFirstProductIndex = 0;
    const pageLastProductIndex = PRODUCTS.length - 1;
    const productsPerPage = 4;
    const productsPerPageOptions = [0, 4, 8, 16, 24];
    const setCurrPage = jest.fn();
    const setPageFirstProductIndex = jest.fn();
    const setPageLastProductIndex = jest.fn();
    const setProductsPerPage = jest.fn();
    const totalProducts = PRODUCTS.length;

    it('Renders correctly', () => {
        const { getByLabelText, getByTestId } = render(
            <ProductPagination
                currPage={currPage}
                pageFirstProductIndex={pageFirstProductIndex}
                pageLastProductIndex={pageLastProductIndex}
                productsPerPage={productsPerPage}
                productsPerPageOptions={productsPerPageOptions}
                setCurrPage={setCurrPage}
                setPageFirstProductIndex={setPageFirstProductIndex}
                setPageLastProductIndex={setPageLastProductIndex}
                setProductsPerPage={setProductsPerPage}
                totalProducts={totalProducts}
            />
        );
        expect(getByTestId('options')).toHaveTextContent(16); // displays number of items per page
        const prevButton = getByLabelText('Go to previous products view');
        expect(prevButton).toBeDisabled();
        // const nextButton = getByLabelText('Go to next products view');
        // expect(nextButton).not.toBeDisabled();
    });

    it('Allows for switching pages with previous and next buttons', () => {
        const { getByLabelText } = render(
            <ProductPagination
                currPage={currPage}
                pageFirstProductIndex={pageFirstProductIndex}
                pageLastProductIndex={pageLastProductIndex}
                productsPerPage={productsPerPage}
                productsPerPageOptions={productsPerPageOptions}
                setCurrPage={setCurrPage}
                setPageFirstProductIndex={setPageFirstProductIndex}
                setPageLastProductIndex={setPageLastProductIndex}
                setProductsPerPage={setProductsPerPage}
                totalProducts={totalProducts}
            />
        );
        const nextButton = getByLabelText('Go to next products view');
        // expect(nextButton).not.toBeDisabled();
        fireEvent.click(nextButton);
        const prevButton = getByLabelText('Go to previous products view');
        // expect(prevButton).not.toBeDisabled();
        fireEvent.click(prevButton);
    });

    it('Disables next page button when end of product listings is reached', () => {
        const { getByLabelText } = render(
            <ProductPagination
                currPage={currPage}
                pageFirstProductIndex={pageFirstProductIndex}
                pageLastProductIndex={3}
                productsPerPage={productsPerPage}
                productsPerPageOptions={productsPerPageOptions}
                setCurrPage={setCurrPage}
                setPageFirstProductIndex={setPageFirstProductIndex}
                setPageLastProductIndex={setPageLastProductIndex}
                setProductsPerPage={setProductsPerPage}
                totalProducts={4}
            />
        );
        const nextButton = getByLabelText('Go to next products view');
        expect(nextButton).toBeDisabled();
    });
});

// FIXME: change number of products per page, text on bottom right
