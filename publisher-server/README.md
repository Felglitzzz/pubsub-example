# Publisher Server

[![Test Coverage](https://api.codeclimate.com/v1/badges/7675f7e631d3e3743dbd/test_coverage)](https://codeclimate.com/github/Felglitzzz/pubsub-example/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/7675f7e631d3e3743dbd/maintainability)](https://codeclimate.com/github/Felglitzzz/pubsub-example/maintainability)

## Description

Publisher Server registers subscribers and publish messages to available topics. It also keeps track of `topic -> subscribers` within the system

## Hosted API Link
[Click Here](https://publisher-server.herokuapp.com)

## Swagger Documentation
Click [here](https://publisher-server.herokuapp.com/api) to view the API Documentation

## Tools
- [Nest](https://docs.nestjs.com/) - A framework for building efficient, scalable and modular Node.js server-side applications
- [PostgreSQL](https://www.postgresql.org/) - A powerful, open source object-relational database system
- [TypeORM](https://typeorm.io/#/) - Typescript based ORM


## Running the Publisher Server Locally

```bash
# clone the repo
$ git clone https://github.com/Felglitzzz/pubsub-example.git

# cd to publisher server
$ cd publisher-server/

# Install Dependencies
$ yarn install

# Create .env file and pattern it after .env-sample file. Ensure db credentials are added to .env in this step
$ touch .env

# Run migration
$ yarn migrate

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
