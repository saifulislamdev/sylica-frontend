import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';

const AllTheProviders = ({ children }) => {
    return (
        /* add providers here */
        { children }
        /* add providers here */
    );
};

// re-export everything
export * from '@testing-library/jest-dom';
export * from '@testing-library/react';

export const renderWithContext = (ui, options) =>
    render(ui, { wrapper: AllTheProviders, ...options });

export const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: Router });
};
