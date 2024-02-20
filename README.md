# LRNR APP (back-end)

#### Author

##### [Reggie Cheston](https://github.com/reggiecheston)

This app is intended to be run alongside the [LRNR APP front-end](https://github.com/reggiecheston/LRNR-FrontEnd).

This project uses Node.js, NPM libraries, Jest, and the OpenAI API.

## Getting Started

- Clone repository:

```bash
    git clone https://github.com/reggiecheston/LRNR-backend1
```

- Open the directory in your preferred code editor

#### In the root directory:

- Install dependencies:

```bash
    npm install
```

- Run application:

```bash
    npm start
```

## User Guide

#### Requests

The **_server.js_** file outlines requests:

> **GET /:**
> Returns a simple greeting from the server.
> **GET /questions:**
> Fetches generated questions based on the specified topic, expertise level, number of questions, and style.
> **POST /questions:**
> Endpoint for submitting questions for storage or further processing (demonstration purposes).
> **GET /evaluation:**
> Evaluates a submitted answer to a question, providing a correctness percentage and an explanation.

## Testing

### Back-end (jest)

- Navigate into the root of the back-end directory:

```bash
    cd LRNR-backend1
```

- Run the following command to run Jest tests:

```bash
    NODE_OPTIONS="$NODE_OPTIONS --experimental-vm-modules" npx jest
```

You can find the jest tests themselves in **_server.test.js_**

Enjoy!

---

##### Resources

##### [React.js docs](https://legacy.reactjs.org/docs/getting-started.html)

##### [NPM docs](https://docs.npmjs.com/)
