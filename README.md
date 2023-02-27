# Webapp Introduction
Creating a api request using Nodejs and MYSQL2 and checking it in POSTMAN..
sa
## Prerequisites

1.Visual studio code (IDE)
2.POSTMAN
3.Database - MySQL
4.Node.js
 #p1

## Dependencies to be installed 

- npm i 
- start app by npm start


<h4>Important Commands to run the server and test</h4>

## Scripts
- `npm start`: starts the development server
- `jest test`: runs test suite

## Endpoints
The following endpoints are available for operations:

GET - http://localhost:3000/v1/user/{id}

POST - http://localhost:3000/v1/user

PUT - http://localhost:3000/v1/user/{id}

GET - http://localhost:3000/v1/user/{id}

GET - http://localhost:3000/v1/product/{id}

POST - http://localhost:3000/v1/product

PUT - http://localhost:3000/v1/product/{id}

GET - http://localhost:3000/v1/product/{id}

PATCH - http://localhost:3000/v1/product/{id}

DELETE - http://localhost:3000/v1/product/{id}


## Responds with following HTTP messages

"200 OK - The request was successful."

"201 Created - A new resource was created as a result of the request, often sent in response to a POST or some PUT requests."

"204 No Content - The request was successful, but there's no need for the client to navigate away from its current page."

"400 Bad Request - The server could not process the request due to an invalid syntax."

"401 Unauthenticated - The client must provide authentication to receive the requested response."

"403 Forbidden - The client does not have access to the requested resource."

"500 Internal Server Error - The server encountered an issue it couldn't handle."


Instructions:

Step 1: Clone the repository or download and unzip the source repository.

Step 2: Create appropriate files in the IDE and write the code to test the API call in Postman.

Step 3: Open Postman to Test the API's

Step 4: Check the Database after each and every API is called to see the status in Database.

Test the api

http://localhost:3000/v1/user, where you should see: "200 OK".

http://localhost:3000/v1/user/{id} where you should see: "201 Created".

http://localhost:3000/v1/user/self/ where you should see: "204 No Content".

http://localhost:3000/v1/user/self where you should use: "204 No Content".

http://localhost:3000/v1/product, where you should see: "200 OK".

http://localhost:3000/v1/product/{id} where you should see: "201 Created".

http://localhost:3000/v1/product/self/ where you should see: "204 No Content".


Please create a pull request with a detailed description of changes.
