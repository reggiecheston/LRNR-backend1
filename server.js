import OpenAI from "openai";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();
const port = 4000;

const openai = new OpenAI({
  apiKey: process.env.apiKey,
});

app.use(cors());
app.use(express.json());

async function getQuestions(top, exp, num, sty) {
  let topic = top;
  let expertise = exp;
  let numQuestions = num;
  let style = sty;
  let prompt = `Generate ${numQuestions} questions on a ${expertise} level regarding ${topic}. Questions should be simple. Do not answer the questions.
    Please word the questions as if you were ${style}, make sure to integrate this in each question but keep the questions based on ${topic}.
    Each question must be based on ${topic}.
    Format the response as an array with each question being a string value in the array.
    Please do not number the questions.`;
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });
  try {
    console.log(completion.choices[0].message.content);
    return JSON.parse(
      `{"Questions": ${completion.choices[0].message.content}}`
    );
  } catch (error) {
    console.log({
      error: "Invalid response from GPT. Please try again.",
    });
    return {
      error: "Invalid response from GPT. Please try again.",
    };
  }
}

async function getEvaluation(ques, sub) {
  let question = ques;
  let submission = sub;
  let prompt = `Your sole purpose is to evaluate quiz answers. 
  You are a teacher and you are evaluating a student's answer to a question. 
  The question is: '${question}'. The student's answer is: '${submission}'.
  You will tell the student if their answer is correct, incorrect, or partially correct.
  Use a percentage scale to evaluate the student's answer, along with whether it is 
  correct, incorrect, or partially correct. Any answer under 40% correct should be evaluated as incorrect.
  Any answer between 41% and 79% should be evaluated as partially correct. 
  Any answer 80% or above should be evaluated as correct. Include the percentage of correctness next to the evaluation.
  For example: "Partially correct, 60%".
  You will also provide an explanation for your evaluation. The user must give a 
  partially correct answer in order for it to be evaluated as partially correct. 
  If they do not know the answer, they should not be evaluated as partially correct, 
  they should be evaluated as incorrect.
  Be sure to provide a clear explanation for your evaluation. Don't be too harsh, 
  but also don't be too lenient. You want to make sure the student understands why 
  their answer is correct, incorrect, or partially correct.
  Format the response as JSON with 'evaluation' and 'explanation' keys.`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });
  try {
    const parsedResponse = JSON.parse(completion.choices[0].message.content);
    return parsedResponse;
  } catch (error) {
    console.log({
      error: "Invalid response from GPT. Please try again.",
    });
    return {
      error: "Invalid response from GPT. Please try again.",
    };
  }
}

app.get("/", (_req, res) => {
  res.send("Hello LRNR!");
});

app.get("/questions", async (req, res) => {
  const topic = req.query.topic;
  const expertise = req.query.expertise;
  const numQuestions = req.query.numQuestions;
  const style = req.query.style;
  const questions = await getQuestions(topic, expertise, numQuestions, style);
  res.json(questions);
});

app.post("/questions", async (req, res) => {
  const questions = req.body;
  console.log(
    "Received questions for storage or further processing:",
    questions
  );
  res.status(201).send({ message: "Questions submitted successfully" });
});

app.get("/evaluation", async (req, res) => {
  const question = req.query.question;
  const submission = req.query.submission;
  const evaluation = await getEvaluation(question, submission);
  res.json(evaluation);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

export default app;
