# Publisher Server

[![Test Coverage](https://api.codeclimate.com/v1/badges/7675f7e631d3e3743dbd/test_coverage)](https://codeclimate.com/github/Felglitzzz/pubsub-example/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/7675f7e631d3e3743dbd/maintainability)](https://codeclimate.com/github/Felglitzzz/pubsub-example/maintainability)

## Description

Publisher Server registers subscribers and publish messages to available topics. It also keeps track of `topic -> subscribers` within the system

## Tools
- [Nest](https://docs.nestjs.com/) - A framework for building efficient, scalable and modular Node.js server-side applications
- [PostgreSQL](https://www.postgresql.org/) - A powerful, open source object-relational database system
- [TypeORM](https://typeorm.io/#/) - Typescript based ORM


## Starting the Publisher Server

```bash
# clone the repo
$ git clone https://github.com/Felglitzzz/pubsub-example.git

# cd to publisher server
$ cd publisher-server/

# Install Dependencies
$ yarn install

# Create .env file and pattern it after .env-sample file. Ensure db credentials is added to .env in this step
$ touch .env

# Run Migration
$ yarn migrate

# Run the application
yarn start:dev

```

## Swagger Documentation
```bash
# Run app locally
$ yarn start

# Navigate the swagger documentation link
# If baseUrl = http://localhost:8000, then api documentation is http://localhost:8000/api

$ ${baseUrl}/api
```

## Test

```bash
# unit tests
$ yarn test

# with coverage
$ yarn test:coverage
```
