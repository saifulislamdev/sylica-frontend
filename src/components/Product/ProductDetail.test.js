import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { renderWithRouter } from '../../util/test';

import ProductDetail from './ProductDetail';
import { CartContext } from '../../util/context';

const PRODUCT = {
    title: 'Apple MacBook Pro 14"',
    description:
        'The new MacBook Pro delivers game-changing performance for pro users. With the powerful M1 Pro to supercharge pro-level workflows while getting amazing battery life.¹ And with an immersive 14-inch Liquid Retina XDR display and an array of pro ports, you can do more than ever with MacBook Pro.²',
    price: 1999.99,
    quantity: 30,
};

describe('ProductDetail', () => {
    it('Should render with basic details', () => {
        const { getByTestId, getByLabelText, getByText } = render(
            <ProductDetail
                title={PRODUCT.title}
                description={PRODUCT.description}
                price={PRODUCT.price}
                maxQuantity={PRODUCT.quantity}
            />
        );
        getByText(PRODUCT.title);
        getByText(PRODUCT.description);
        getByText('Quantity');
        expect(getByTestId('price')).toHaveTextContent(PRODUCT.price);
        const decrQuantityBtn = getByLabelText('Decrease quantity by 1');
        expect(decrQuantityBtn).not.toBeDisabled(); // quantity should be 1
        fireEvent.click(decrQuantityBtn);
        expect(decrQuantityBtn).toBeDisabled(); // should not allow decreasing quantity passed 0
    });

    it('Allows for increasing quantity until max quantity is reached', () => {
        const { getByLabelText, getByTestId } = render(
            <ProductDetail
                title={PRODUCT.title}
                description={PRODUCT.description}
                price={PRODUCT.price}
                maxQuantity={PRODUCT.quantity}
            />
        );
        const incrQuantityBtn = getByLabelText('Increase quantity by 1');
        const quantityInputField = getByTestId('quantity');
        for (let i = 1; i < PRODUCT.quantity; i++) {
            expect(quantityInputField.getAttribute('value')).toEqual(`${i}`); // quantity
            expect(incrQuantityBtn).not.toBeDisabled();
            fireEvent.click(incrQuantityBtn);
        }
        expect(quantityInputField.getAttribute('value')).toEqual(
            `${PRODUCT.quantity}`
        ); // quantity
        expect(incrQuantityBtn).toBeDisabled(); // max quantity reached
    });

    it('Should render differently when product is out of stock', () => {
        const { getByLabelText, getByTestId } = render(
            <ProductDetail
                title={PRODUCT.title}
                description={PRODUCT.description}
                price={PRODUCT.price}
                maxQuantity={0}
            />
        );
        expect(getByTestId('tag')).toHaveTextContent('Out of Stock'); // tag that appears only when product is out of stock

        const decrQuantityBtn = getByLabelText('Decrease quantity by 1');
        expect(decrQuantityBtn).toBeDisabled(); // should not allow decreasing quantity passed 0

        const quantityInputField = getByTestId('quantity');
        expect(quantityInputField.getAttribute('value')).toEqual('0');

        const incrQuantityBtn = getByLabelText('Increase quantity by 1');
        expect(incrQuantityBtn).toBeDisabled(); // should not allow increasing quantity when out of stock (max quantity reached)

        const addToCartBtn = getByTestId('Add to Cart button');
        expect(addToCartBtn).toBeDisabled(); // cannot add out of stock items to cart

        const buyNowBtn = getByTestId('Buy now button');
        expect(buyNowBtn).toBeDisabled(); // cannot buy out of stock items
    });

    it('Changes cart context after clicking "Add to Cart" and "Buy Now"', () => {
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
                <ProductDetail
                    title={PRODUCT.title}
                    description={PRODUCT.description}
                    price={PRODUCT.price}
                    maxQuantity={PRODUCT.quantity}
                />
            </CartContext.Provider>
        );
        const addToCartBtn = getByTestId('Add to Cart button');
        fireEvent.click(addToCartBtn);
        expect(handleAddToCart).toHaveBeenCalledTimes(1);

        const buyNowBtn = getByTestId('Buy now button');
        fireEvent.click(buyNowBtn);
        expect(handleAddToCart).toHaveBeenCalledTimes(2);
    });
});
