[![Build Status](https://travis-ci.org/Meyllos/opim-api.svg?branch=develop)](https://travis-ci.org/Meyllos/opim-api)
[![Coverage Status](https://coveralls.io/repos/github/Meyllos/opim-api/badge.svg?branch=develop)](https://coveralls.io/github/Meyllos/opim-api?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/9fabecc3f5dd5db86c53/maintainability)](https://codeclimate.com/github/Meyllos/opim-api/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/9fabecc3f5dd5db86c53/test_coverage)](https://codeclimate.com/github/Meyllos/opim-api/test_coverage)
# OPIM - API
This app allows you to access, manage and share all your valuable information safely, anytime, anywhere.

## Getting Started 
To get the project up and running on your local machine, please follow these instructions.
### Prerequisites
Make sure you have node -v 10 and above installed Or follow these steps to install node

Node installation on OS X

```
$ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)" 
```
Node installation on Linux

```
sudo apt-get install python-software-properties
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
```
Node installation on Windows

Download the intaller from the [official Node.js website](http://nodejs.org/) 

### Clone the project from github

$ git clone https://github.com/Meyllos/opim-api.git

### Install the required dependencies found in package.json

```
 $ npm install
```

### Start the server

```
 $ npm start
```

### Running the tests

Testing and Getting the code coverage report with nyc
```
 $ npm test
```
Testing the code style with eslint
```
 $ ./node_modules/.bin/eslint server
```


### Deployment

The application server has been hosted on Heroku with the first phase endpoints of the application (Authentifications) : 

#### Authentifications

Method|End point | Public |Action
-----------|----------|--------------|------
POST | https://opim.herokuapp.com/opim-api/v1/auth/signup | True | Sign up a user
POST | https://opim.herokuapp.com/opim-api/v1/auth/signin | True | Sign in a user
PATCH | https://opim.herokuapp.com/opim-api/v1/auth/email-verification/?token= | True  | Account activation

#### Sign up body - model
``{
 'email' : 'example@gmail.com',
 'password': '123456',
 'passwordConfirmation': '123456'
}``

#### Sign in body - model
``{
 'email' : 'example@gmail.com',
 'password': '123456'
}``

#### Email verificationa - no body required


The application template is hosted on github pages
<a href="https://meyllos.github.io/opim-frontend/UI/">https://meyllos.github.io/opim-frontend/UI/</a> <br/>


### Management 

The development phases of the project (project stories) are on pivotaltracker
 : <a href="https://www.pivotaltracker.com/n/projects/2407861"> https://www.pivotaltracker.com/n/projects/2407861 </a> 

### Author
<ul>
  <li> Chadrack ruhara  </li>
 </ul>

