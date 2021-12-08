import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';

import ProductListing from './ProductListing';
import { CartContext } from '../../util/context';
import { renderWithRouter } from '../../util/test';

const PRODUCT = {
    description:
        'The new MacBook Pro delivers game-changing performance for pro users. With the powerful M1 Pro to supercharge pro-level workflows while getting amazing battery life.¹ And with an immersive 14-inch Liquid Retina XDR display and an array of pro ports, you can do more than ever with MacBook Pro.²',
    id: '61908195cdec62705404cdd9',
    imageSrc: '/products/images/00dca6e72ae5506507e7270ea7a62792.jpeg',
    price: 1999.99,
    quantity: 100,
    title: 'Apple MacBook Pro 14"',
};

describe('ProductListing', () => {
    it('Renders with basic contents of component', () => {
        const { getByTestId, getByText } = render(
            <ProductListing
                description={PRODUCT.description}
                id={PRODUCT.id}
                imageSrc={PRODUCT.imageSrc}
                price={PRODUCT.price}
                quantity={PRODUCT.quantity}
                title={PRODUCT.title}
            />
        );

        getByText(PRODUCT.title);
        getByText(PRODUCT.description);
        expect(getByTestId('price')).toHaveTextContent(PRODUCT.price);
        expect(getByTestId('Add to Cart button')).not.toBeDisabled();
    });

    it('Renders differently when product is out of stock', () => {
        const { getByTestId } = render(
            <ProductListing
                description={PRODUCT.description}
                id={PRODUCT.id}
                imageSrc={PRODUCT.imageSrc}
                price={PRODUCT.price}
                quantity={0}
                title={PRODUCT.title}
            />
        );

        const tag = getByTestId('tag');
        expect(tag).toHaveTextContent('Out of Stock'); // tag that appears only when product is out of stock

        const addToCartBtn = getByTestId('Add to Cart button');
        expect(addToCartBtn).toBeDisabled(); // cannot add out of stock items to cart
    });

    it('Renders with image', () => {
        const { getByRole } = render(
            <ProductListing
                description={PRODUCT.description}
                id={PRODUCT.id}
                imageSrc={PRODUCT.imageSrc}
                price={PRODUCT.price}
                quantity={PRODUCT.quantity}
                title={PRODUCT.title}
            />
        );

        const image = getByRole('img');
        expect(image.src).toContain(PRODUCT.imageSrc);
    });

    it('Directs to product page of the listing when clicked on anywhere outside of "Add to Cart" button', () => {
        let { getByRole } = renderWithRouter(
            <ProductListing
                description={PRODUCT.description}
                id={PRODUCT.id}
                imageSrc={PRODUCT.imageSrc}
                price={PRODUCT.price}
                quantity={PRODUCT.quantity}
                title={PRODUCT.title}
            />
        );

        const image = getByRole('img');
        fireEvent.click(image);
        expect(window.location.pathname).toEqual(`/products/${PRODUCT.id}`);
    });

    it('Changes cart context after clicking "Add to Cart" button', () => {
        const cart = [];
        const setCart = jest.fn();
        const calculateTotalItemsInCart = jest.fn();
        const handleAddQuantity = jest.fn();
        const handleAddToCart = jest.fn();
        const handleRemoveItemFromCart = jest.fn();
        const calculateTotalPriceInCart = jest.fn();

        const { getByTestId } = renderWithRouter(
            <CartContext.Provider
                value={{
                    cart,
                    setCart,
                    calculateTotalItemsInCart,
                    handleAddQuantity,
                    handleAddToCart,
                    handleRemoveItemFromCart,
                    calculateTotalPriceInCart,
                }}
            >
                <ProductListing
                    description={PRODUCT.description}
                    id={PRODUCT.id}
                    imageSrc={PRODUCT.imageSrc}
                    price={PRODUCT.price}
                    quantity={PRODUCT.quantity}
                    title={PRODUCT.title}
                />
            </CartContext.Provider>
        );

        const addToCartBtn = getByTestId('Add to Cart button');
        fireEvent.click(addToCartBtn);
        expect(handleAddToCart).toHaveBeenCalledTimes(1);
    });
});
