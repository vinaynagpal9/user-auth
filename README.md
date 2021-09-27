# User Auth Module with Roles

This repo contains the code for the User Auth Module.

## Prerequisites

* Install NodeJS, if not installed

        * wget -qO- https://deb.nodesource.com/setup_8.x | bash -
        * sudo apt-get install -y nodejs

* Install npm, if not installed

        * sudo apt-get install npm

## To run the project

Steps to run it as a service.

	Step 0: start notification service on port 3001 / configured port using .env file 

	Step 1: npm install

	Step 2: npm start

## To lint the project

Steps to lint the project before commiting.

	* npm run lint

## Development info

The connection is managed in /model/db.js. It is opened at application start, and closed on application termination. In this file we also monitor the connected, error and disconnected events.

## Testing

Postman collection for testing out created endpoints.

Link: https://www.getpostman.com/collections/6c338a24403e8b2d07ae

## cURL Commands

	* curl -X POST -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMDAwMjMzM2ExMTIwNTEyM2VmMzkyOCIsInBob25lTm8iOiI5MDQxMzA2MjE5Iiwicm9sZSI6MCwiYWRtaW5Ub2tlbiI6IiIsImlhdCI6MTUyNzA5OTk5MiwiZXhwIjoxNTI3MTAwODkyfQ.ldV8Wz9s9U6Gq7jGJsId_XYAB4J3OC1jCdek7S-8xo0' --header "Content-Type: application/json" --data '{"phoneNo":"9041306219", "otp":"801078"}' http://localhost:3000/verifyUser


	* curl -X GET 'http://localhost:3000/verifyUser?phoneNo=9041306219'


