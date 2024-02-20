# LRNR APP (back-end)

#### Author

##### [Reggie Cheston](https://github.com/reggiecheston)

This app is intended to be run alongside the [LRNR APP front-end](https://github.com/reggiecheston/LRNR-FrontEnd).

This project uses Node.js, NPM libraries, and Jest (for testing).

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

You can access the application in your browser via http://localhost:3000

#### Navigation

From the static [**homepage**](http://localhost:3000), you can use the navbar, hamburger menu, or footer links to navigate to the [**quiz generation**](http://localhost:3000/categories) page or the static [**account**](http://localhost:3000/account) page.

#### Quiz Generation

Using the dropdowns you can select between different topics, levels of expertise, number of questions, and style of questions to query the OpenAI API to generate a personalized coding-related quiz. The following table displays the list of dropdown options:

| **Topic**    | **Expertise Level** | **Question Style**     | **Number of Questions** |
| ------------ | ------------------- | ---------------------- | ----------------------- |
| Golang       | Novice              | Master Oogway          | 5                       |
| AWS          | Intermediate        | 1940's Gangster        | 10                      |
| JavaScript   | Expert              | Like I'm an 8-Year-Old | 15                      |
| CI/CD        |                     | Normal                 |                         |
| Home Gardens |                     | Jedi (Master Yoda)     |                         |
| Coffee       |                     | Captain Jack Sparrow   |                         |
| Finger Foods |                     | Matthew McConaughey    |                         |

With each question, you will submit an answer, which will also query the API to evaluate and grade the answer on correctness from 0% - 100%. Once an answer is evaluated, you can navigate to the next question using the _next question_ button.

Once you reach the last question's evaluation and click the _finish test_ button, you'll be redirected to the static results page.

To begin again, you can navigate to the quiz generation page using the _try another quiz_ button or via the navbar or footer links

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
