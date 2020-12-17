# Garage Booking - Product Specification

## Purpose

The purpose of this document is to present a detailed description of the Web Garage Services Booking. It will explain:

- The purpose and features of the website.
- The interfaces of the system
- What the system will do.
- The constraints under which it must operate and how the system react to external stimuli.

The document is intended for both stakeholders and the developers of the system.

## Glossary

### Term

#### Definition

- **Database**: A collection of all the information monitored by this system.
- **Administrator**: Person who can monitor and control the system.
- **Users**: can update personal information and create booking.
- **Field**: A cell within a form.
- **Product Specification**: A document that completely describes all of the functions of a proposed system and the constraints under which it must operate.
- **Stakeholder**: Any person with an interest in the project who is not a developer.

## Product Summary

Garage Booking provides 2 separated sites: Admin site (only for admin) and User site (for registered users)

An administrator can monitor and control the system by:

- **Manage users**: view all users, lock or unlock users, edit user profiles.
- **Manage services**: view all available services, create, update and delete a service.
- **Manage garages**: view all garages, create, update and delete a garage.
- **Manage booking**: view all bookings, create, update and delete a booking.

User's site is where users can view garages and services that our system provides and start booking for a garage

## Architecture Design

### ERD

![ERD](https://github.com/qbaonguyen98/nashtech-de-nodejs-assignment-3/blob/docs/docs/assets/a3-ERD.png)

### Back-end

#### Technologies

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Inversify](https://inversify.io/)

Project structure:

```text
src
├── controllers/
├── dtos/
├── exceptions/
├── interfaces/
├── middlewares/
├── models/
├── repositories/
├── routes/
├── services/
├── tests/
├── utils/
├── inversify.config.ts
├── types.ts
├── server.ts
└── app.ts
```

### Front-end

Technologies used: Angular, Material CSS

Project structure:

```text
app
├── configs/
├── core/
├── data/
├── layout/
├── modules/
│   └── auth/
│       └── page/
│           │── login/
│           └── register/
├── app-routing.module.ts
├── app.component.html
├── app.component.scss
├── app.component.ts
├── app.module.ts
└── material.module.ts
```

## Functional Specifications

### Administrator use case

**Use case:** Login to system with internal account.

**Brief Description**
The administrator logins by the supplied account to get authorization accesses to the Garage Services Booking Dashboard System with Admin role.

Initial Step-By-Step Description:

1. The administrator clicks to the Login button on the top left of the website.
2. The system navigates to the login page.
3. The Administrator enters the correct username into the username text box.
4. The system validates the username input is supplied by the Administrator and display the error in case the input is incorrect.
5. The Administrator enter the correct password into the password text box.
6. The system validates the password input is supplied by the Administrator and display the error in case the input is incorrect.
7. The Administrator clicks the sign up button.
8. The system navigates to the homepage if the account entered by Administrator is correct. In contrast, the system displays the error message.

**Use case:** Admin manages all registered users.

**Brief Description**
After logging in, admin can see a list of registered users.

Initial Step-By-Step Description:

1. After logging in by admin, the system will automatically fetch users data from server.
2. Fetched data will be displayed as a table of users with 3 field: full name, email, last login.

#### User Use Cases

**Use case:** Register an internal account.

**Brief Description**
User registers an internal account.

Initial Step-By-Step Description:

1. User clicks on the Register button on the top right of the home page
2. User enters username, email and password
3. The system validates user inputs
4. User clicks Create button
5. The system sends verification email to user
6. User click on the verification link
7. Account created

### Login

**Use case:** Login with an internal account.

**Brief Description**
User login with a registered internal account.

Initial Step-By-Step Description:

1. User clicks on the Login button on the top right of the home page.
2. User enter username and password.
3. The system validates user inputs.
4. User clicks on the Login button.
5. The system redirect user to user page or admin page if login successfully. If not, the system displays error message.

**Use case:** Login with a Google account.

**Brief Description**
User logins with a Google account.

Initial Step-By-Step Description:

1. User clicks on the Login button on the top right of the home page.
2. User click on Login with google button.
3. User enter Google account and password.
4. The system redirect user to user page or admin page if login successfully. If not, the system displays error message.

## System Features

### Authentication

- Register for an internal account and login
- Login with google account

### User

- Admin can get all users with 3 fields: full name, email, last login.
- User can get their own detail information with 9 fields: first name, last name, gender, date of birth, username, email, account type, last login, is locked or not.
- User can update their user profile with 4 fields: first name, last name, gender, date of birth.
- Admin can edit user profile, lock or unlock user and delete user.
