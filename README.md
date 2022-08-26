# playwright_baseframework
Setup with config, tags, retries and helper functions and sample tests to get started with automation

NPM scripts to run 
-------------------

For tests >>>> npm run juliemrCalc

For report Generation >>>> npm run report

For recording tests >>>> npm run recordTest


## Features

🛠 Built with [playwright-ui] and [typescript]  
⚡️ Zero database dependencies  
👮‍♂️ Page Object Model   
🔥 Playwright POC with helper utils, test data file and sample test to understand this tool
💻 CI/CD with GitHub Action In progress


## Getting Started

Playwright enables reliable end-to-end testing for modern web apps.

Any browser • Any platform • One API
Cross-browser. Playwright supports all modern rendering engines including Chromium, WebKit, and Firefox.

Cross-platform. Test on Windows, Linux, and macOS, locally or on CI, headless or headed.

Cross-language. Use the Playwright API in TypeScript, JavaScript, Python, .NET, Java.

Test Mobile Web. Native mobile emulation of Google Chrome for Android and Mobile Safari. The same rendering engine works on your Desktop and in the Cloud.

### Prerequisites

The only requirement for this project is to have [Node.js](https://nodejs.org/en/) **version 14** installed on your machine. Refer to the [.node-version](./.node-version) file for the exact version.

TypeScript will be added as a local dependency to the project, so no need to install it.

### Installation

```shell
yarn install
```

### Run the app

```shell
yarn dev
```

### Run Playwright Tests

```shell
yarn cypress:open
```

> 🚩 **Note**
>
> If you have changed the default ports, then you need to update Cypress configuration file (`cypress.json`) locally.
> There are three properties that you need to update in `cypress.json`: `baseUrl`, `apiUrl`, and `url`.
> The port number in `baseUrl` corresponds to `PORT` variable in `.env` file. Similarly, the port number in `apiUrl` and `url` correspond to `REACT_APP_BACKEND_PORT`.
> For example, if you have changed `PORT` to `13000` and `REACT_APP_BACKEND_PORT` to `13001` in `.env` file, then your `cypress.json` should look similar to the following snippet:
>
> ```json
> {
>   "baseUrl": "http://localhost:13000",
>   /* Omitted for brevity */
>   "env": {
>     "apiUrl": "http://localhost:13001",
>     /* Omitted for brevity */
>     "codeCoverage": {
>       "url": "http://localhost:13001/__coverage__"
>     }
>   },
>   "experimentalStudio": true
> }
> ```
>
> Avoid committing the modified `cypress.json` into Git since the CI environments still expect the application to be run on default ports.

## Tests

| Type | Location                                 |
| ---- | ---------------------------------------- |
| api  | [cypress/tests/api](./cypress/tests/api) |
| ui   | [cypress/tests/ui](./cypress/tests/ui)   |
| unit | [`src/__tests__`](./src/__tests__)       |

## Database

- The local JSON database is located in [data/database.json](./data/database.json) and is managed with [lowdb].

- The database is [reseeded](./data/database-seed.json) each time the application is started (via `yarn dev`). Database seeding is done in between each [Cypress End-to-End test](./cypress/tests).

- Updates via the React frontend are sent to the [Express][express] server and handled by a set of [database utilities](backend/database.ts)

- Generate a new database using `yarn db:seed`.

- An [empty database seed](./data/empty-seed.json) is provided along with a script (`yarn start:empty`) to view the application without data.



