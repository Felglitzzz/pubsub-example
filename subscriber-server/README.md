# Subscriber Server

[![Test Coverage](https://api.codeclimate.com/v1/badges/7675f7e631d3e3743dbd/test_coverage)](https://codeclimate.com/github/Felglitzzz/pubsub-example/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/7675f7e631d3e3743dbd/maintainability)](https://codeclimate.com/github/Felglitzzz/pubsub-example/maintainability)

## Description

Subscriber Server subscribes to topics and prints message that is published to that topic.

## Hosted API Link
[Click Here](https://subscriber-server.herokuapp.com/)

- first subscriber endpoint 1 - `/test1`
- second subscriber endpoint - `/test2`


Based on the requirement of the subscribing server to print message published, anyone clicking this link will need to have access to the console. Otherwise, run server locally


## Swagger Documentation
Click [here](https://subscriber-server.herokuapp.com/api) to view the API Documentation


## Running the Subscriber Server Locally

```bash
# clone the repo
$ git clone https://github.com/Felglitzzz/pubsub-example.git

# cd to subscriber server
$ cd subscriber-server/

# Install Dependencies
$ yarn install

# Create .env file and pattern it after .env-sample file. This step can be ignored though as there are default values for the environment variables
$ touch .env

# Run the application
yarn start:dev

```

## Test

```bash
# run unit tests
$ yarn test

# run unit tests with coverage
$ yarn test:coverage
```
