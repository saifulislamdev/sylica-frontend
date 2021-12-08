import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import LogIn from '../LogIn/LogIn';

it('should render Sign up component', () => {
    const { getByText } = render(
        <Router>
            <LogIn />
        </Router>
    );

    getByText('"Every purchase will be made easy with Sylica"');
    getByText('Email');
    getByText('Password');
    getByText('Not a member?');
    getByText('Sign Up');
});
