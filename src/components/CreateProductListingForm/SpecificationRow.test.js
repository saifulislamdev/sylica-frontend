import { render } from '@testing-library/react';
import ProductListingFormContextWrapper from '../../context/ProductListingFormContextWrapper';
import SpecificationRow from './SpecificationRow';

describe('SpecificationRow', () => {
    it('should render form', () => {
        const { getByText } = render(
            <ProductListingFormContextWrapper>
                <SpecificationRow
                    formLabel='Row 1'
                    formHelperText='Enter comma separated values'
                />
            </ProductListingFormContextWrapper>
        );

        getByText('Row 1');
        getByText('Enter comma separated values');
    });
});
