import React from 'react';
import '@testing-library/jest-dom';
import { act, fireEvent, render } from '@testing-library/react';
import Carousel, { products } from './Carousel';
import { renderWithRouter } from '../../util/test';

const TIMER_INCREMENT = 5000; // page in carousel automatically changes every 5 seconds

describe('Carousel', () => {
    it('Directs to product page of current product in Carousel after clicking "Buy Now"', () => {
        let { getByText } = renderWithRouter(<Carousel />);
        const buyNowBtn = getByText('Buy Now');
        fireEvent.click(buyNowBtn);
        expect(window.location.pathname).toEqual(`/products/${products[0].id}`);
    });

    it('Directs to products page after clicking "Browse all products"', () => {
        let { getByText } = renderWithRouter(<Carousel />);
        const viewProductsBtn = getByText('Browse all products');
        fireEvent.click(viewProductsBtn);
        expect(window.location.pathname).toEqual('/products/');
    });

    it('Loads all images in carousel', () => {
        jest.useFakeTimers(); // fake timer to change carousel page
        const { getByTestId, getByText } = render(<Carousel />);
        for (let i = 0; i < products.length; i++) {
            getByText(
                products[i].title.reduce(
                    (prevText, currText) => prevText + ' ' + currText
                )
            ); // e.g. Apple MacBook Pro with M1 Pro or M1 Max
            expect(getByTestId('container')).toHaveStyle(
                `background-image: url(${products[i].id}.${products[i].imgType})`
            ); // loads bg img
            act(() => {
                jest.advanceTimersByTime(TIMER_INCREMENT);
            }); // change to next carousel page
        }
        jest.useRealTimers(); // set back to original use of timers
    });

    it('Works with previous carousel page button', () => {
        const { getByLabelText, getByTestId } = render(<Carousel />);
        expect(getByTestId('container')).toHaveStyle(
            `background-image: url(${products[0].id}.${products[0].imgType})`
        ); // loads first carousel page bg img
        const prevButton = getByLabelText('View previous product in carousel');
        fireEvent.click(prevButton);
        const lastCarouselPage = products[products.length - 1];
        expect(getByTestId('container')).toHaveStyle(
            `background-image: url(${lastCarouselPage.id}.${lastCarouselPage.imgType})`
        ); // loads last carousel page bg img
    });

    it('Works with next carousel page button', () => {
        const { getByLabelText, getByTestId } = render(<Carousel />);
        expect(getByTestId('container')).toHaveStyle(
            `background-image: url(${products[0].id}.${products[0].imgType})`
        ); // loads first carousel page img
        const nextButton = getByLabelText('View next product in carousel');
        for (let i = 0; i < products.length - 1; i++)
            // click next button until last page is reached
            fireEvent.click(nextButton);
        const lastCarouselPage = products[products.length - 1];
        expect(getByTestId('container')).toHaveStyle(
            `background-image: url(${lastCarouselPage.id}.${lastCarouselPage.imgType})`
        ); // loads last carousel page img
    });
});
