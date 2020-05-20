![](https://github.com/jbailey4/issue-prioritizer/workflows/CI/badge.svg)

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

Test specs follow the `[name].test.{js|jsx}` naming convention.

CSS files follow the `[component-name].module.scss` naming convention.

There is a rough design sketch in the `design_mocks` folder. Sketches were created using [Excalidraw](https://excalidraw.com/).

## Testing

An example of a Jest snapshot test can be found with the [`<Header />` component test spec](https://github.com/jbailey4/issue-prioritizer/blob/master/src/components/Header/header.test.jsx#L6-L9).

Other test coverage examples can be found in the [`<LoginForm />` test spec](https://github.com/jbailey4/issue-prioritizer/blob/master/src/components/LoginForm/login-form.test.jsx) and the [tests for the `utils` module](https://github.com/jbailey4/issue-prioritizer/blob/master/src/utils.test.js).

## Hypothetical Backend API For Persistent Order of Issues

One possibility is to have the frontend app send a batch update (`PUT`, `PATCH`, mutation, etc.) request to the backend for each custom reordering. Each one of the update requests would contain the 2 items that were affected by the reordering along with the new values for the `priority` field.

For example, if an issue with id 1 was reordered below the issue with id 2, the following could be a possible payload request:

```
PATCH /issues

{
  issues: [
    {
      id: 1,
      priority: 2
    },
    {
      id: 2,
      priority: 1
    }
  ]
}
```

The UI could still optimistically update the issues order, while sending this update request to the backend in background. If the request fails the order could be reverted with a notification shown to the user.

On subsequent visits to the application, the issues that were reordered would now have a `priority` field to sort based off either on the backend or the frontend.
