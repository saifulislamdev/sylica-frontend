import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ProductListingFormContextWrapper from '../../context/ProductListingFormContextWrapper';
import GeneralProductInfoForm from './GeneralProductInfoForm';

describe('GeneralProductInfoForm', () => {
    it('should render form', () => {
        const { getByText } = render(
            <ProductListingFormContextWrapper>
                <GeneralProductInfoForm />
            </ProductListingFormContextWrapper>
        );

        getByText('Enter general product information');
        getByText('Product Title');
        getByText('Vendor');
        getByText('Price');
        getByText('Quantity');
        getByText('Description');
        getByText('Categories');
        getByText('Sub-Categories');
    });
});
