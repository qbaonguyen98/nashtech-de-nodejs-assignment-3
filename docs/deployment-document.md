# Garage Services Booking - Deployment Document

## Introduction

- The purpose of this `Installation and Deployment Guide` is to describe in technical terms the steps necessary to install the software and make it operational.
- The following explanations can be improved over time, if you see something
  missing, a feedback is welcome.

## Revision history

| Version/Change request number | Version date | Description of changes | Author          |
| ----------------------------- | ------------ | ---------------------- | --------------- |
|                               | 16/12/2020   | First draft            | Nguyen Minh Huy |

## Intended audience and reading suggestions

This `Installation and Deployment Guide` is intended to be used by technical stakeholders of the project who will be responsible for `planning`, `performing`, or `maintaining` the installation or deployment, such as the `Systems Administrator`, `Chief Information Officer (CIO)`, `Analysts`, or `Developers`.
It is intended that stakeholders and software support personnel can read this document and coordinate their efforts in the installation/deployment of the application.

## Server Configurations

### Roles, Features, and Packages

[Garage Booking System](https://github.com/qbaonguyen98/nashtech-de-nodejs-assignment-3) is mostly written in `TypeScript`, with some packages in `Node.js`

- [bcrypt@5.0.0](https://github.com/kelektiv/node.bcrypt.js/) `hashing account password`
- [express@4.17.1](https://github.com/expressjs/express) `web application framework`
- [inversify@@5.0.1](https://github.com/inversify) `inversion of control (IoC) container for TypeScript and JavaScript`
- [mongoose@5.11.3](https://github.com/automattic/mongoose) `a straight-forward, schema-based solution to model your application data`
- [nodemailer@6.4.16](https://github.com/nodemailer/nodemailer) `a module for Node.js to send emails`
- [swagger-jsdoc@6.0.0-rc.3](https://github.com/Surnet/swagger-jsdoc) `simplify API development for users, teams, and enterprises`
- more and more at [package.json](https://github.com/qbaonguyen98/nashtech-de-nodejs-assignment-3/blob/master/package.json)

### Configuration

- NODE_ENV `setting environment for developing or staging/testing`
- EMAIL_HOST `email host for nodemailer transporter`
- EMAIL_PORT `email port for nodemailer transporter`
- EMAIL_LOGIN `email login account`
- EMAIL_PASSWORD `email login password`
- TOKEN_SECRET `generating a token for authorization`
- JWT_SECRET `generating a token for authentication`
- TOKEN_LIFE `expires time of jwt token`
- CLIENT_URL `url of client side`
- PORT `server port for developing or testing`
- MONGO_DB `mongo database url`

## Installation Steps

First, you need to install `git` v2.00.0~. If you don't have it installed, visit [git's download page](https://git-scm.com/)

You will need `node.js`, make sure you have `node.js` on your device

```bash
node --version
```

Or install it at [node.js homepage](https://nodejs.org/en/)

If you using `Windows`, we recommend installing via [chocolatey](https://chocolatey.org/), a popular package manager for `Windows`.

This system also requires `python` and `windows build tools`, which can be installed using `chocolatey` as well.

```bash
choco install microsoft-build-tools python
```

With `macos` you should install by using [homebrew](https://docs.brew.sh/Installation), or `apt-get` on `linux`

Once installed, clone this repository by running the following command:

```bash
git clone https://github.com/qbaonguyen98/nashtech-de-nodejs-assignment-3
```

### Installing Locally

Installing packages with command:

```bash
npm install
```

Or using [yarn](https://yarnpkg.com/)

```bash
yarn install
```

## Testing the Installation

When finished, make sure you have created an `.env` file on root directory like the `.env.sample` file, [check here](https://github.com/qbaonguyen98/nashtech-de-nodejs-assignment-3/blob/master/.env.sample)

After that, run this system on `development`

```bash
npm run dev
```

Or build the project from `TypeScript` to `JavaScript` with

```bash
npm start
```

This project will listening on your local with port was settled on `.env`

```bash
info: Successfully connect to MongoDB {"timestamp": ""}
info: 🚀 App is listening on the port 3000 {"timestamp": ""}
```

## Docker Deployment

First, you must install [Docker Desktop](https://www.docker.com/products/docker-desktop) on your device, and check if it installed with command:

```bash
docker --version
```

Next, look at `docker-compose.yml` file on your root directory. After that, open `terminal` on your project and run:

```bash
docker-compose build
```

Congratulations, after few minutes to build your project, `docker image` was created successfully

Run this command to run `docker` with `.env` configs:

```bash
docker-compose --env-file ./.env up
```

## Heroku Deployment

### Prerequisites

- An existing Node.js application
- [Heroku account](https://signup.heroku.com/)
- [Heroku CLI](https://cli.heroku.com/)

### Overview

`Heroku Node.js` support will only be applied when the application has a `package.json` file in the root directory

### Specify the version of node

Your `package.json` file will look something like this:

```json
"engines": {
    "node": "14.x"
},
```

### Build your app and run it locally

Run the npm run start to build your app and run it with `NODE_ENV` set to `production`

```bash
npm run start
```

Start your app locally using the `heroku local` command, which is installed as part of the `Heroku CLI`

```bash
heroku local web
```

Your app should now be running on `http://localhost:<your-port>`.

## Deploy your application to Heroku

After you commit your changes to git, you can deploy your app to `Heroku`

```bash
git add .
git commit -m "added: Procfile"
heroku login
Enter your Heroku credentials.
...
heroku create
git push heroku master
...
-----> Node.js app detected
...
-----> Launching... done
       http://<your-app-name>.herokuapp.com deployed to Heroku
```

To open the app in your browser, type:

```bash
heroku open
```

For more details, read through [Heroku Documentation](https://devcenter.heroku.com/articles/deploying-nodejs#how-to-keep-build-artifacts-out-of-git).
