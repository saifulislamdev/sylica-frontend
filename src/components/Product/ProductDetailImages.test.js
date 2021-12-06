import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import ProductDetailImages from './ProductDetailImages';

const images = [
    {
        src: '/products/images/00dca6e72ae5506507e7270ea7a62792.jpeg',
        name: 'Apple MacBook Pro 14" Laptop Front View',
    },
    {
        src: '/products/images/e38be691b33159f714e391102d782ef3.jpeg',
        name: 'Apple MacBook Pro 14" Laptop Top View',
    },
    {
        src: '/products/images/376bcac4f0be5a12b63d617c0e6348fe.jpeg',
        name: 'Apple MacBook Pro 14" Laptop Side Open View',
    },
];

describe('ProductDetailImages', () => {
    it('Loads with all images', () => {
        const { getByLabelText } = render(
            <ProductDetailImages images={images} maxQuantity={123} />
        );
        const imagesInDOM = document.getElementsByTagName('img');
        expect(imagesInDOM).toHaveLength(images.length + 1); // loads all images
        [...imagesInDOM].forEach((image, i) => {
            if (i !== 0) expect(image.src).toContain(images[i - 1].src);
            else expect(image.src).toContain(images[0].src);
        }); // visually loads all images
        const prevImgButton = getByLabelText('Look at previous image'); // loads 1 of 2 buttons
        expect(prevImgButton).not.toBeDisabled();
        const nextImgButton = getByLabelText('Look at next image'); // loads 2 of 2 buttons
        expect(nextImgButton).not.toBeDisabled();
    });

    it('Disables image changer buttons when there is only 1 image', () => {
        const { getByLabelText } = render(
            <ProductDetailImages
                images={images.slice(0, 1)}
                maxQuantity={123}
            />
        );
        const prevImgButton = getByLabelText('Look at previous image');
        expect(prevImgButton).toBeDisabled();
        const nextImgButton = getByLabelText('Look at next image');
        expect(nextImgButton).toBeDisabled();
    });

    it('Has the correct alt text for each image', () => {
        render(<ProductDetailImages images={images} maxQuantity={123} />);
        const imagesInDOM = document.getElementsByTagName('img');
        [...imagesInDOM].forEach((image, i) => {
            if (i !== 0) expect(image.alt).toContain(images[i - 1].name);
            else expect(image.alt).toContain(images[0].name);
        });
    });

    it('Displays "Out of Stock" text when appropriate', () => {
        const { queryByText: queryByTextInStock } = render(
            <ProductDetailImages images={images} maxQuantity={123} />
        ); // not out of stock
        expect(queryByTextInStock('Out of Stock')).not.toBeInTheDocument();

        const { queryByText: queryByTextOutOfStock } = render(
            <ProductDetailImages images={images} maxQuantity={0} />
        ); // out of stock
        expect(queryByTextOutOfStock('Out of Stock')).toBeInTheDocument();
    });

    it('Changes current image by clicking the desired image', () => {
        render(<ProductDetailImages images={images} maxQuantity={123} />);
        const imagesInDOM = document.getElementsByTagName('img');
        /* Click on each image and verify that it becomes the main image of the component */
        [...imagesInDOM].slice(1).forEach((image, i) => {
            fireEvent.click(imagesInDOM[i + 1]);
            const mainImage = document.getElementsByTagName('img')[0];
            expect(mainImage.src).toContain(images[i].src);
        });
    });
});
