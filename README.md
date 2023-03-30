# Webapp Introduction
Creating an Amazon Machine Image (AMI) using Packer and shell script
This guide will walk you through creating an Amazon Machine Image (AMI) using Packer and shell script. The resulting AMI can be shared across Dev and Demo accounts, and used to create an EC2 instance using Terraform. Once the instance is created, you can run a Node.js and MYSQL2 Webapp and test the API requests using POSTMAN.


Visual Studio Code or any other IDE
POSTMAN
MySQL or any other database management system
Node.js
AWS account

Terraform..

Steps
Create a Node.js and MYSQL2 Webapp with RESTful APIs to perform CRUD operations on users and products.
Create a .sh file with the necessary dependencies, including Node.js and Mariadb. The commands in the .sh file should include unzipping the Webapp.zip file, installing nginx, and enabling and starting webapp and nginx services.

Configure your MySQL database and connect it to your Webapp.

Test your Webapp locally to make sure it is functioning correctly.
Create a Packer file to build the new AMI, including the source AMI to build from, a provisioner section to run the shell script file created in step 2, and a builders section to create the new AMI.
Run the Packer build command to create the new AMI.
Use Terraform to create a new EC2 instance from the AMI created in step 6.
Obtain the public IP address of the EC2 instance and test the APIs using POSTMAN.
After testing, create a pull request with a detailed description of changes.
Store the Image details in the RDS and meta data in S3 for future use.
API Endpoints
The Webapp includes the following endpoints for performing operations on users and products:

GET
POST
PUT
PATCH
DELETE.
HTTP messages that can be received include:

"200 OK"
"201 Created"
"204 No Content"
"400 Bad Request"
"401 Unauthenticated"
"403 Forbidden"
"500 Internal Server Error"
Conclusion
By following these steps, you can create an AMI for a Node.js and MYSQL2 Webapp and use it to run API tests with POSTMAN. With Terraform, you can easily create an EC2 instance from the AMI, and store the Image details in RDS and meta data in S3 for future use.

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
The following endpoints are available for operations: Change localhost to public ip adress of EC2

http://localhost:3000/v1/user, where you should see: "200 OK".

http://localhost:3000/v1/user/{id} where you should see: "201 Created".

http://localhost:3000/v1/user/self/ where you should see: "204 No Content".

http://localhost:3000/v1/user/self where you should use: "204 No Content".

http://localhost:3000/v1/product, where you should see: "200 OK".

http://localhost:3000/v1/product/{id} where you should see: "201 Created".

http://localhost:3000/v1/product/self/ where you should see: "204 No Content".

http://localhost:3000/v1/{product_id}/self where you should see "200 OK".

http://localhost:3000/v1/{product_id}/self where you should see "201 File Uploaded".

http://localhost:3000/v1/{product_id}/image/{image_id} where you should see "204 No Content"

http://localhost:3000/v1/{product_id}/image/{image_id}  where you should see "204 No Content"


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

Please create a pull request with a detailed description of changes.
