import app from "./server";
import supertest from "supertest";
const request = supertest(app);

describe("GET /", () => {
  it("responds with json", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
    console.log(response.body);
  });
});

describe("GET /questions", () => {
  it("gets questions endpoint", async () => {
    const response = await request.get("/questions");
    expect(response.status).toBe(200);
    console.log(response.body);
  });

  it("gets response from user input", async () => {
    const response = await request.get(
      "/questions?topic=python&expertise=novice&numQuestions=5&style=normal"
    );
    expect(response.status).toBe(200);
    console.log(response.body);
  });

  it("gets response from user input", async () => {
    const response = await request.get(
      "/questions?topic=javascript&expertise=expert&numQuestions=15&style=jedi"
    );
    expect(response.status).toBe(200);
    console.log(response.body);
  });
});

// test for post request
describe("POST /questions", () => {
  it("posts questions", async () => {
    const response = await request.post("/questions").send({
      questions: [
        {
          question: "What is the capital of France?",
          answer: "Paris",
        },
      ],
    });
    expect(response.status).toBe(201);
    console.log(response.body);
  });
});

// test for non-existent endpoint
describe("GET /*", () => {
  it("gets 404 for non-existent endpoint", async () => {
    const response = await request.get("/*");
    expect(response.status).toBe(404);
  });
});
