# Sylica Frontend

This is the frontend service for the Sylica project. It was developed by Joy Biswas, MD Islam, Saiful Islam, Mehedi Shohag, and Zeal Patel for our Topics In Software Engineering class.

Sylica is an e-commerce platform for electronic devices.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

1. Clone the repository
```bash
git clone https://github.com/saifulislamdev/sylica-frontend.git
```
1. Install dependencies
Run the following to install the dependencies
```bash
npm i
```
1. Setup env file. 
Create an .env file in the root of the repository with the following environment variables.
```
# Port can be interchanged (e.g. 5000)
REACT_APP_PROXY="http://localhost:5000/api"
```

## Repo Structure
All of the source code will be found in `/src` folder.

### Components
Components go in the `/src/components` folder.

### Pages
Pages go in the `/src/pages` folder.

### Styles
Styles for components and pages should go in the `/src/styles` folder.

### Assets
Images go in the `/src/assets` folder.

### Tests
Tests go in the `/src/__tests__` folder.

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
