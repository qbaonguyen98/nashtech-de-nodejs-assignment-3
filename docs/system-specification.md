# API - Requirements Documents

## Allowed HTTP requests

**PUT**: To create resource.
**POST**: Update resource.
**GET**: Get a resource or a list of resources.
**DELETE**: To delete resource.

## Description of usual HTTP responses

**200 OK**: the request was successful.
**201 Created**: the request was successful and a resource was created.
**400 Bad Request**: the request could not be understood or was missing required parameters.
**401 Unauthorized**: authentication failed or user doesn't have permissions for requested operation.
**403 Forbidden**: access denied.
**404 Not Found**: resource was not found.
**500, 502, 503, 504**: Server Errors

## Features

### Authentication and Authorization

The Auth APIs enables you to manage all aspects of user identity. If offers endpoints so users can log in, sign up.

#### Register account

Introduction: The Register API lets user create an account, and then send an email to verify that account.

**URL**: /auth/register/internal
**Method**: POST
**URL Params**: None
**Request Body**:

```json
{
  "username": "username",
  "email": "example@email.com",
  "password": "password"
}
```

**Success Response**:

- Code: 201
- Content:

```json
{
  "message": "A verification email has been sent to ${email}."
}
```

**Error Response**:

- Code: 400
- Content: Bad Request
  OR
- Code: 409 Conflict
- Content:

```json
{
  "message": "Username already exist. The email address you entered is already associated with another account."
}
```

#### Verify account

Introduction: Verify that account is valid.

**URL**: /auth/verify-account
**Method**: POST
**URL Params**: None
**Request Headers**:

```json
{
  "Cookie": "Authorization=tokenString"
}
```

**Success Response**:

- Code: 200
- Content:

```json
{ "message": "The account has been verified. Please log in." }
```

**Error Response**:

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

Introduction: Used to collect a Token for a registered User.
**URL**: /login/internal
**Method**: POST
**Auth required**: NO
**Request Body**:

```json
{
  "username": "username",
  "password": "password"
}
```

**Success Response**:

- Code: 200
- Content: return an token in cookie

```json
{
  "message": "Login success",
  "token": "tokenString"
}
```

**Error Response**: If 'username' and 'password' combination is wrong.

- Code: 400
- Content: Bad request

#### Login by google account

Introduction: User can login with their google account.
**URL**: /auth/login/social
**Method**: POST
**URL Params**: None
**Request Body**:

```json
{ "idToken": "tokenString" }
```

**Success Response**:

- Code: 200
- Content: Return an token in cookie

```json
{
  "message": "Social Login"
}
```

**Error Response**:

- Code: 400
- Content:

```json
{
  "message": "Invalid IdToken"
}
```

#### Forgot Password

#### Reset Password

#### Change Password

### User Management

This endpoints require a valid Token to be included in the cookies of the request. A Token can be acquired from the Login.

#### Get all users

Introduction: Get users in system and return a list of users.
**URL**: /users
**Method**: GET
**URL Params**: None
**Request Headers**:

```json
{ "Cookie": "Authorization=tokenString" }
```

**Success Response**:

- Code: 200
- Content:

```json
{
  "data": "Array of users",
  "message": "Get user list"
}
```

**Error Response**:

- Code: 401
- Content:

```json
{ "message": "Wrong authentication token" }
```

#### Get user by id

Introduction: Get the details of authenticated user's information by id.
**URL**: /users/:username
**Method**: POST
**Auth required**: YES
**URL Params**: username
**Request Headers**:

```json
{ "Cookie": "Authorization=tokenString" }
```

**Request Body**:

```json
{ "id": "stringID" }
```

**Success Response**:

- Code: 200
- Content:

```json
{
  "message": "Get user"
}
```

**Error Response**:

- Code: 403
- Content:

```json
{
  "message": "Access denied"
}
```

#### Update user by admin

Introduction:
**URL**: /users/:username
**Method**: PUT
**URL Params**: username
**Request Headers**:

```json
{ "Cookie": "Authorization=tokenString" }
```

**Request Body**:

```json
{
  "id": "stringID",
  "firstName": "",
  "lastName": "",
  "gender": "",
  "dateOfBirth": "",
  "isLocked": boolean
}
```

**Success Response**:

- Code: 200
- Content:

```json
{
  "message": "Update user by admin"
}
```

**Error Response**:

- Code: 401
- Content:

```json
{
  "message": "You are not admin"
}
```

#### Update user profile

Introduction: Allow the Authenticated User to update their details.
**URL**: /users/profile/:username
**Method**: PUT
**Auth required**: YES
**URL Params**: username
**Request Headers**:

```json
{ "Cookie": "Authorization=tokenString" }
```

**Request Body**:

```json
{
  "id": "stringID",
  "firstName": "",
  "lastName": "",
  "gender": "",
  "dateOfBirth": ""
}
```

**Success Response**:

- Code: 200
- Content:

```json
{
  "message": "Update user profile"
}
```

**Error Response**:

- Code: 403
- Content:

```json
{
  "message": "Access denied"
}
```

### Garage Management

This endpoints require a valid Token to be included in the cookies of the request. A Token can be acquired from the Login.

#### List all garages

Introduction: Get garages in system and return a list of garages.
**URL**: /garages
**Method**: GET
**URL Params**: None
**Request Headers**:

```json
{ "Cookie": "Authorization=tokenString" }
```

**Request Body**:

```json
{
  "filter": {
    "code": 1234,
    "name": "name",
    "description": "",
    "createdBy": "ObjectId"
  },
  "sortOrder": "asc",
  "sortField": "_id",
  "lastId": "lastIdString",
  "limit": 10
}
```

**Success Response**:

- Code: 200
- Content:

```json
{
  "data": "Array of users",
  "message": "Get user list"
}
```

**Error Response**:

- Code: 401
- Content:

```json
{ "message": "Wrong authentication token" }
```

#### Create garage

Introduction: Create a new garage in system
**URL**: /garages
**Method**: POST
**URL Params**: None
**Request Headers**:

```json
{ "Cookie": "Authorization=tokenString" }
```

**Request Body**:

```json
{
      "code": "code of garage",
      "name": "name",
      "description": "description",
      "address":"address",
      "location":
{
          "coordinates": {
            "lat": ,
            "lng
          }
        }
    }
```

**Success Response**:

- Code: 200
- Content:

```json
{
  "data": "Array of users",
  "message": "Get user list"
}
```

**Error Response**:

- Code: 401
- Content:

```json
{ "message": "Wrong authentication token" }
```

#### Update garage

#### Update garage by id

#### Delete garage

### Service Management

This endpoints require a valid Token to be included in the cookies of the request. A Token can be acquired from the Login.

#### List all services

#### List service by id

#### Create service

#### Update service

#### Delete service

### Booking Management

This endpoints require a valid Token to be included in the cookies of the request. A Token can be acquired from the Login.

#### List all bookings

#### Create booking
