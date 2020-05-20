# Github Issue Prioritizer

Provides a simple interface to select a Github repo an user has access to and lists the associated issues. The issues can be prioritized in any order by dragging and dropping one issue below/above another.

After reordering issues in the desired priority, the order will persist for the current browser session. Once the browser or tab is closed you must re-login and reorder your issues again. By default issues will be ordered by their created date in a descending order.

Logging into the application only requires a Github API Key, which can be created in your [tokens settings page](https://github.com/settings/tokens).

## Installation

This project uses yarn to manage dependencies, run the following command to install the required dependencies to run the app:

`yarn install`

## Usage

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

## Technology Used

- React
- Redux
- SASS
- CSS Modules
- Jest
- React Testing Library
- Prettier

## Application Overview

The core of the application can be found in the `src` folder at the root of the project.

The `src` folder contains the following subdirectories:

- `components`
  - `Header` - basic application header that is shown on all screens
  - `IssuesTable` - holds the logic for displaying and allowing reordering of issues for a particular repo
  - `LoginForm` - allows the user to enter their Github API key
  - `ReposList` - displays a list of repos the current logged in user has access to
- `store`
  - contains the various reducers, action creators, and store setup logic for the application

Test specs following the `[name].test.{js|jsx}` naming convention.

CSS files following the `[component-name].module.scss` naming convention.
