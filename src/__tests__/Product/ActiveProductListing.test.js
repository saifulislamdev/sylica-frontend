import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ActiveProductListing from '../../components/Product/ActiveProductListing';

it('should load the component with active status', async () => {
    const { getByText } = render(
        <ActiveProductListing
            id='61908195cdec62705404cdd9'
            title='Apple MacBook Pro 14"'
            description='The new MacBook Pro delivers game-changing performance for pro users. With the powerful M1 Pro to supercharge pro-level workflows while getting amazing battery life.¹ And with an immersive 14-inch Liquid Retina XDR display and an array of pro ports, you can do more than ever with MacBook Pro.²'
            imageSrc='http://localhost:5000/api/products/images/00dca6e72ae5506507e7270ea7a62792.jpeg'
            price='1999.99'
            maxQuantity='23'
        />
    );

    getByText('Active');
    getByText('Apple MacBook Pro 14"');
    getByText(
        'The new MacBook Pro delivers game-changing performance for pro users. With the powerful M1 Pro to supercharge pro-level workflows while getting amazing battery life.¹ And with an immersive 14-inch Liquid Retina XDR display and an array of pro ports, you can do more than ever with MacBook Pro.²'
    );
    getByText(1999.99);
    getByText(23);
});

it('should load the component with sold out status', async () => {
    const { getByText } = render(
        <ActiveProductListing
            id='61908195cdec62705404cdd9'
            title='Apple MacBook Pro 14"'
            description='The new MacBook Pro delivers game-changing performance for pro users. With the powerful M1 Pro to supercharge pro-level workflows while getting amazing battery life.¹ And with an immersive 14-inch Liquid Retina XDR display and an array of pro ports, you can do more than ever with MacBook Pro.²'
            imageSrc='http://localhost:5000/api/products/images/00dca6e72ae5506507e7270ea7a62792.jpeg'
            price='1999.99'
            maxQuantity='0'
        />
    );
    getByText('Sold Out');
    getByText('Apple MacBook Pro 14"');
    getByText(
        'The new MacBook Pro delivers game-changing performance for pro users. With the powerful M1 Pro to supercharge pro-level workflows while getting amazing battery life.¹ And with an immersive 14-inch Liquid Retina XDR display and an array of pro ports, you can do more than ever with MacBook Pro.²'
    );
    getByText(1999.99);
    getByText(0);
});
