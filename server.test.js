const request = require("supertest");
const { app, getQuestions, getEvaluation } = require("./server");
const OpenAI = require("openai");

jest.mock("openai");

describe("GET /", () => {
  it("responds with json", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    console.log(response.body);
    // expect(response.body).toEqual({ message: "Hello LRNR!" });
  });
});
