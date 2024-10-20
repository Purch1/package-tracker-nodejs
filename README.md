# Delivery API

This is a Node.js-based API for a delivery application. It provides endpoints for user authentication, delivery management, and more.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Scripts](#scripts)
- [Linting and Formatting](#linting-and-formatting)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and authentication
- Delivery management (CRUD operations)
- Swagger API documentation
- Logging with Winston
- Environment configuration with dotenv
- Input validation with Joi
- Security features using Helmet

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v14 or later)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>

Scripts
This project includes the following scripts:

npm start: Start the application in production mode.
npm run dev: Start the application in development mode.
npm run lint: Run ESLint to check for code quality issues.
npm run lint:fix: Automatically fix ESLint issues.
npm run format: Format code using Prettier.
npm run format:check: Check code formatting with Prettier.