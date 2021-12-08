import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import SignUp from '../SignUp/SignUp';

it('should render Sign up component', () => {
    const { getByText } = render(
        <Router>
            <SignUp />
        </Router>
    );
    getByText('Create an account');
    getByText('"Every purchase will be made easy with Sylica"');
    getByText('Create Account');
    getByText('First Name');
    getByText('Last Name');
    getByText('Email');
    getByText('Password');
    getByText('Repeat Password');
    getByText('Password must be at least 8 characters long');
    getByText('Create Account');
    getByText('Already a member?');
    getByText('Sign In');
});
