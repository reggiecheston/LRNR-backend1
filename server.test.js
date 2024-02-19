const request = require("supertest");
const { app, getQuestions, getEvaluation } = require("./server");
const OpenAI = require("openai");

jest.mock("openai");

describe("GET /", () => {
  it("responds with json", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    // expect(response.body).toEqual({ message: "Hello LRNR!" });
  });
});

describe("getQuestions", () => {
  it("should return questions when valid parameters are provided", async () => {
    const mockQuestions = ["Question 1", "Question 2", "Question 3"];
    const mockCompletion = {
      choices: [{ message: { content: JSON.stringify(mockQuestions) } }],
    };
    console.log("mockCompletion", mockCompletion);
    console.log("OpenAI.prototype", OpenAI.prototype);
    OpenAI.prototype.chat.completions.create.mockResolvedValue(mockCompletion);

    const questions = await getQuestions("golang", "novice", "5", "normal");
    expect(questions).toEqual({ Questions: mockQuestions });
  });

  it("should handle error when GPT response is invalid", async () => {
    OpenAI.prototype.chat.completions.create.mockResolvedValue({});

    const questions = await getQuestions("golang", "novice", "5", "normal");
    expect(questions).toEqual({
      error: "Invalid response from GPT. Please try again.",
    });
  });
});

// describe("getEvaluation", () => {
//   it("should return evaluation when valid parameters are provided", async () => {
//     const mockEvaluation = {
//       evaluation: "correct",
//       explanation: "Explanation",
//     };
//     const mockCompletion = {
//       choices: [{ message: { content: JSON.stringify(mockEvaluation) } }],
//     };
//     OpenAI.prototype.chat.completions.create.mockResolvedValue(mockCompletion);

//     const evaluation = await getEvaluation("Question", "Answer");
//     expect(evaluation).toEqual(mockEvaluation);
//   });

//   it("should handle error when GPT response is invalid", async () => {
//     OpenAI.prototype.chat.completions.create.mockResolvedValue({});

//     const evaluation = await getEvaluation("Question", "Answer");
//     expect(evaluation).toEqual({
//       error: "Invalid response from GPT. Please try again.",
//     });
//   });
// });
