# API - Requirements Documents

## Allowed HTTP requests

- **PUT**: To create resource.
- **POST**: Update resource.
- **GET**: Get a resource or a list of resources.
- **DELETE**: To delete resource.

## Description of usual HTTP responses

- **200 OK**: the request was successful.
- **201 Created**: the request was successful and a resource was created.
- **400 Bad Request**: the request could not be understood or was missing required parameters.
- **401 Unauthorized**: authentication failed or user doesn't have permissions for requested operation.
- **403 Forbidden**: access denied.
- **404 Not Found**: resource was not found.
- **500, 502, 503, 504**: Server Errors

## Features

### Authentication and Authorization

The Auth APIs enables you to manage all aspects of user identity. If offers endpoints so users can log in, sign up.

#### Register account 
Description: The Register API lets user create an account, and then send an email to verify that account.

- **URL**: /auth/register/internal
- **Method**: POST
- **URL Params**: None
- **Request Body**: 

    ```json
    {
      "username": "username",
      "email": "example@email.com",
      "password": "password"
    }
    ```

- **Success Response**:
  - Code: 201
  - Content:
  ```json
  {
    "message": "A verification email has been sent to ${email}."
  }
  ```
- **Error Response**:
  - Condition: There was a problem with the request. Check the request parameters and JSON format.
  - Code: 400 
  - Content: 
  ```json
  {
    "message": "email should not be empty,email must be an email, password should not be empty,password must be a string"
  }
  ```
  OR
  - Code: 409 Conflict
  - Content:
  ```json
  { "message": "Username already exist. The email address you entered is already associated with another account."}
  ```
#### Verify account
Description: Verify that account is valid.

- **URL**: /auth/verify-account
- **Method**: POST
- **URL Params**: None
- **Request Headers**:
  ``` 
  { "Cookie" : "Authorization=tokenString" }
  ```
- **Success Response**:
  - Code: 200
  - Content: 
  ```json
  { "message": "The account has been verified. Please log in."}
  ```
- **Error Response**: 
  - Code: 401
  - Content: 
  ```json
  { "message": "Wrong authentication token" } 
  ```
  OR 
  - Code: 404 
  - Content: 
  ```json
  { "message": "Authentication token missing" } 
  ```

#### Login by internal account
Description: Used to collect a Token for a registered User.
- **URL**: /login/internal
- **Method**: POST
- **Auth required**: NO
- **Request Body**:
    ```json
    { 
      "username": "username", 
      "password": "password" 
    } 
    ```
- **Success Response**:
  - Code: 200
  - Content: return an token in cookie
  ```json
  { 
    "message": "Login success", 
    "token": "tokenString"
  }
  ```
- **Error Response**: 
  - Condition: If 'username' and 'password' combination is wrong.
  - Code: 400

#### Login by google account
Description: User can login with their google account.

- **URL**: /auth/login/social
- **Method**: POST
- **URL Params**: None
- **Request Body**:
    ```json
    { "idToken": "tokenString" } 
    ```
- **Success Response**:
  - Code: 200
  - Content: Return an token in cookie
  ```json
  {
    "message": "Social Login"
  }
  ```
- **Error Response**:
  - Code: 400
  - Content: 
  ```json
  {
    "message":"Invalid IdToken"
  }
  ```

### User Management
This endpoints require a valid Token to be included in the cookies of the request. A Token can be acquired from the Login.

#### Get all users
Description: Get users in system and return a list of users. 

- **URL**: /users
- **Method**: GET
- **URL Params**: None
- **Request Headers**:
  ``` 
  { "Cookie" : "Authorization=tokenString" }
  ```
- **Success Response**:
  - Code: 200
  - Content: 
  ```
  {
    "data": "Array of users",
    "message": "Get user list"
  } 
  ```
- **Error Response**:
  - Code: 401
  - Content: 
  ```json
  { "message": "Wrong authentication token" } 
  ```

#### Get user by id
Description: Get the details of authenticated user's information by id. 

- **URL**: /users/:username
- **Method**: POST
- **URL Params**: username
- **Request Headers**:
  ``` 
  { "Cookie" : "Authorization=tokenString" }
  ```
- **Request Body**:
    ```json
    { "id": "stringID" } 
    ```
- **Success Response**:
  - Code: 200
  - Content: 
  ```json
  {
    "message":"Get user"
  }
  ```
- **Error Response**:
  - Code: 403
  - Content:
  ```json
  {
    "message":"Access denied"
  }
  ```

#### Update user by admin
Description: For admin to manage user, admin can lock or unlock user.

- **URL**: /users/:username
- **Method**: PUT
- **URL Params**: username
- **Request Headers**:
  ``` 
  { "Cookie" : "Authorization=tokenString" }
  ```
- **Request Body**:
    ```json
    { 
      "id": "stringID",
      "firstName": "string",
      "lastName": "string",
      "gender": "string",
      "dateOfBirth": 0,
      "isLocked": false
    } 
    ```
- **Success Response**:
  - Code: 200
  - Content: 
  ```json
  {
    "message":"Update user by admin"
  }
  ```
- **Error Response**:
  - Code: 401
  - Content:
  ```json
  {
    "message":"You are not admin"
  }
  ```

#### Update user profile
Description: Allow the Authenticated User to update their details.

- **URL**: /users/profile/:username
- **Method**: PUT
- **URL Params**: username
- **Request Headers**:
  ``` 
  { "Cookie" : "Authorization=tokenString" }
  ```
- **Request Body**:
    ```json
    { 
      "id": "stringID",
      "firstName": "",
      "lastName": "",
      "gender": "",
      "dateOfBirth": "",
    } 
    ```
- **Success Response**:
  - Code: 200
  - Content: 
   ```json
  {
    "message":"Update user profile"
  }
  ```
- **Error Response**:
  - Code: 403
  - Content:
  ```json
  {
    "message":"Access denied"
  }
  ```


### Garage Management
This endpoints require a valid Token to be included in the cookies of the request. A Token can be acquired from the Login.

#### List all garages
Description: Get garages in system and return a list of garages. 

- **URL**: /garages
- **Method**: GET
- **URL Params**: None
- **Request Headers**:
  ``` 
  { "Cookie" : "Authorization=tokenString" }
  ```
- **Request Body**:
    ```json
    { 
      "filter": {
        "code": 1234,
        "name": "name",
        "description": "",
        "createdBy": "ObjectId",
      },
      "sortOrder": "asc",
      "sortField": "_id",
      "lastId": "lastIdString",
      "limit": 10
    } 
    ```
- **Success Response**:
  - Code: 200
  - Content: 
  ```
  {
    "data": Array of Garages
    "message": "Garages response"
  } 
  ```
- **Error Response**:
  - Code: 401
  - Content: 
  ```json
  { "message": "Wrong authentication token" } 
  ```

#### Create garage
Description: Create a new garage in system.

- **URL**: /garages
- **Method**: POST
- **URL Params**: None
- **Request Headers**:
  ``` 
  { "Cookie" : "Authorization=tokenString" }
  ```
- **Request Body**:
    ```json
    { 
      "code": "code of garage",
      "name": "name",
      "description": "description",
      "address":"address",
      "location": 
        {
          "coordinates": 
          {
            "lat": 0,
            "lng": 0,
          },
          "googleId": "string"
        }
    } 
    ```
- **Success Response**:
  - Code: 200
  - Content: 
  ```
  {
    "data": garageData,
    "message": "Create new garage"
  } 
  ```
- **Error Response**:
  - Code: 401
  - Content: 
  ```json
  { "message": "Wrong authentication token" } 
  ```

#### Add service to garage
Description: Add service to garage

- **URL**: /garages/services/:garageId
- **Method**: PUT
- **URL Params**: garageId
- **Request Headers**:
  ``` 
  { "Cookie" : "Authorization=tokenString" }
  ```
- **Request Body**:
    ```json
    { 
      "services": ["Array of service's ID"]
    } 
    ```
- **Success Response**:
  - Code: 200
  - Content: 
  ```
  {
    "data": updatedService,
    "message": "Services are added successful"
  } 
  ```
- **Error Response**:
  - Code: 401
  - Content: 
  ```json
  { "message": "Wrong authentication token" } 
  ```

#### Update garage by id
Description: Update garage information

- **URL**: /garages/:garageId
- **Method**: PUT
- **URL Params**: None
- **Request Headers**:
  ``` 
  { "Cookie" : "Authorization=tokenString" }
  ```
- **Request Body**: 
    ```json
    { 
      "name": "name",
      "description": "description",
      "address":"address", // optional
      "location": // optional
        {
          "coordinates": 
          {
            "lat": 0,
            "lng": 0,
          },
          "googleId": "string"
        },
      "isDeleted": false // optional
    } 
    ```
- **Success Response**:
  - Code: 200
  - Content: 
  ```
  {
    "data": updatedService,
    "message": "Garage is updated successful"
  } 
  ```
- **Error Response**:
  - Code: 401
  - Content: 
  ```json
  { "message": "Wrong authentication token" } 
  ```

#### Delete garage
Description: Delete garage in system

- **URL**: /garages/:garageId
- **Method**: DELETE
- **URL Params**: garageId
- **Request Headers**:
  ``` 
  { "Cookie" : "Authorization=tokenString" }
  ```
- **Request Body**: None
- **Success Response**:
  - Code: 200
  - Content: 
  ```json
  {
    "message": "Garage is deleted"
  } 
  ```
- **Error Response**:
  - Code: 401
  - Content: 
  ```json
  { "message": "Wrong authentication token" } 
  ```

#### Delete service of garage
Description: Delete service of garage

- **URL**: /garages/services/:garageId
- **Method**: DELETE
- **URL Params**: garageId
- **Request Headers**:
  ``` 
  { "Cookie" : "Authorization=tokenString" }
  ```
- **Request Body**: 
    ```json
    { 
      "services": ["Array of service's ID"]
    } 
    ```
- **Success Response**:
  - Code: 200
  - Content: 
  ```json
  {
    "data": "${updatedService}",
    "message": "Services are deleted successful"
  } 
  ```
- **Error Response**:
  - Code: 401
  - Content: 
  ```json
  { "message": "Wrong authentication token" } 
  ```

### Service Management

This endpoints require a valid token to be included in the cookies of the request. A token can be acquired from the Login.

#### List all services
Description: Get services in system and return a list of services.

- **URL**: /services
- **Method**: GET
- **URL Params**: None
- **Request Headers**:

  ```
  { "Cookie" : "Authorization=tokenString" }
  ```

- **Request Body**:

    ```json
    { 
      "filter": {
        "code": 1234,
        "name": "service-name",
        "description": "",
        "createdBy": "ObjectId",
      },
      "sortOrder": "asc",
      "sortField": "_id",
      "lastId": "lastIdString",
      "limit": 10
    } 
    ```

- **Success Response**:
  - Code: 200
  - Content:

  ```
  {
    "data": "Array of services",
    "message": "Services response"
  } 
  ```

- **Error Response**:
  - Code: 401
  - Content:
  
  ```json
  { "message": "Wrong authentication token" } 
  ```

#### Create service

Description: Create a new service in system

- **URL**: /services
- **Method**: POST
- **URL Params**: None
- **Request Headers**:

  ``` 
  { "Cookie" : "Authorization=tokenString" }
  ```

- **Request Body**:

    ```json
    { 
      "code": "Code of service",
      "name": "name",
      "description": "description",
      "price": "500"
    } 
    ```

- **Success Response**:
  - Code: 200
  - Content:
  
  ```
  {
    "data": "Created new service",
    "message": "Get user list"
  } 
  ```

- **Error Response**:
  
  - Error 400

    - Code: 400
    - Content:

  ```json
  { "message": "Missing service information" } 
  ```

  - Error 401

    - Code: 401
    - Content:

  ```json
  { "message": "Wrong authentication token" } 
  ```

  - Error 409

    - Code: 409
    - Content:

  ```json
  { "message": "Service already exists" } 
  ```

#### Update service

Description: Update a service in system. After  accessed to the system, administrator can update information of existed service in the system. 

- **URL**: /services/:serviceId
- **Method**: PUT
- **URL Params**: serviceId
- **Request Headers**:

  ``` 
  { "Cookie" : "Authorization=tokenString" }
  ```

  Administrator authorization is required.

- **Request Body**:

    ```json
    { 
      "name": "name",
      "description": "description",
      "price": "500",
      "isDeleted": true
    } 
    ```

- **Success Response**:

After the service updated successful, the update service api will return status code 200 and response  includes the updated service and an message to notify to user.

  - Code: 200
  - Content:
  
  ```
  {
    "data": {Updated service},
    "message": "Service is updated successful"
  } 
  ```

- **Error Response**:
  
  - Error 400

    - Code: 400
    - Content:

  ```json
  { "message": "Missing service information" } 
  ```

#### Delete service

Description: Delete a service in system by administrator authorization. After accessed to the system, administrator can remove an existed service from the system.

- **URL**: /services/:serviceId
- **Method**: DELETE
- **URL Params**: serviceId
- **Request Headers**:

  ``` 
  { "Cookie" : "Authorization=tokenString" }
  ```

- **Request Body**: NONE

- **Success Response**:

When the service is deleted successful from the system, delete service api will return an response include code status 200 and message to notify to user.

  - Code: 200
  - Content:
  
  ```
  {
    "data": "",
    "message": "Service is deleted successful"
  } 
  ```

- **Error Response**:

If errors occur in delete process, the api will return status code 500 and message to notify to user.

  - Error 500

    - Code: 500
    - Content:

  ```json
  { "message": "Delete service failed" } 
  ```
