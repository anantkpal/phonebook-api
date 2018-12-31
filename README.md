# Phonebook API

## Major frameworks/libs/node modules used

 * [Express](https://expressjs.com/)
 * [Jest](https://jestjs.io/)
 * [Passport](http://www.passportjs.org/)
 * [MongoDB](https://www.mongodb.com/)
 
## Pre-requisites

* Latest version of node installed on the system

    Ref: https://nodejs.org/
* Latest version of mongodb installed or you can use docker setup bundled as part of the code

## Scripts

### `npm install`
Installs missing node modules

### `npm run eslint`
Runs the eslint on the source and logs the reports

### `npm run test`
Runs the tests in watch mode using jest. Tests are run with coverage.

### `npm run test:ci`
Runs the tests using jest and exists with error code based on tests outcome and coverage thresholds are met or not.

### `npm run build`
Builds the assets for production deployment in `dist`

### `npm run start`
starts the server in the development mode

## Docker setup

To make app functional, we need mongo db up and running. This can be achieved either by using local mongo setup or docker.

This code includes docker setup as well

### To run the app in docker setup
``docker-compose up app``

### To run the integration tests & other tests in docker setup
``docker-compose up test``

