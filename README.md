# Sylica Frontend

[![Netlify Status](https://api.netlify.com/api/v1/badges/b586c29c-a35b-48d7-a6e7-f0ad9b53ec03/deploy-status)](https://app.netlify.com/sites/sylica/deploys)

We're [live](https://sylica.netlify.app/)!

Sylica is an e-commerce platform for electronic devices.

This is the frontend service for the Sylica project. The project is created with the MERN stack (MongoDB, Express, React, and Node). It was developed by Joy Biswas, Saiful Islam, Mehedi Shohag, and Zeal Patel for our Fall 2021 CSc 45600 Topics In Software Engineering class at The City College of New York.


## Setup

1. Clone the repository

```
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
REACT_APP_PROXY="http://localhost:5000/api" # proxy server (value shown is default)
```

## Repo Structure

All of the source code will be found in `/src` folder.

### Components

Components go in the `/src/components` folder.

### Pages

Pages go in the `/src/pages` folder.

### Utility

Config, global constants, theme, context, helper functions, etc. go in the `/src/util` folder.

### Assets

Images go in the `/src/assets` folder.

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode with coverage.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run test:debug`

Launches the test runner in the debug mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
