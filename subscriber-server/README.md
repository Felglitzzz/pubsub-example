# Subscriber Server

[![Test Coverage](https://api.codeclimate.com/v1/badges/7675f7e631d3e3743dbd/test_coverage)](https://codeclimate.com/github/Felglitzzz/pubsub-example/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/7675f7e631d3e3743dbd/maintainability)](https://codeclimate.com/github/Felglitzzz/pubsub-example/maintainability)

## Description

Subscriber Server subscribes to topics and prints message that is published to that topic. 


## Starting the Subscriber Server

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

## Swagger Documentation
```bash
# Run app locally
$ yarn start

# Navigate the swagger documentation link
# If baseUrl = http://localhost:9000, then api documentation is http://localhost:9000/api

$ ${baseUrl}/api
```

## Test

```bash
# unit tests
$ yarn test

# with coverage
$ yarn test:coverage
```
