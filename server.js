import OpenAI from "openai";
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

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
  let prompt =
    `Generate ${numQuestions} questions on a ${expertise} level regarding ${topic}. Questions should be simple. Do not answer the questions.
    Please word the questions as if you were ${style}, make sure to integrate this in each question but keep the questions based on ${topic}.
    Each question must be based on ${topic}.
    Format the response as an array with each question being a string value in the array.
    Please do not number the questions.`;
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });
  try {
    console.log(completion.choices[0].message.content)
    return JSON.parse(`{"Questions": ${completion.choices[0].message.content}}`);
  } catch (error) {
    console.log({
      error: "Invalid response from GPT. Please try again."
    });
    return {
      error: "Invalid response from GPT. Please try again."
    }
  }
}

async function getEvaluation(ques, sub) {
  let question = ques;
  let submission = sub;
  let prompt = `Please provide answer for the following question: '${question}' then compare that answer to the possible submission: '${submission}' to determine if that submission is an acceptable answer with an explanation why.
    Make sure you do not repeat the submission or question in your response.
    Make sure you do not use quotation marks in your evaluation or explanation.
    Make sure to format the response as a JSON object with only two values: 'evaluation' and 'explanation'.
    Make sure the evaluation value is either 'correct' or 'incorrect'.
    Please do not use any line breaks in your response.`;
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });
  try {
    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.log({
      error: "Invalid response from GPT. Please try again."
    });
    return {
      error: "Invalid response from GPT. Please try again."
    }
  }
}

app.get('/', (_req, res) => {
  res.send('Hello LRNR!');
});

app.get('/questions', async (req, res) => {
  const topic = req.query.topic;
  const expertise = req.query.expertise;
  const numQuestions = req.query.numQuestions;
  const style = req.query.style;
  const questions = await getQuestions(topic, expertise, numQuestions, style);
  res.json(questions);
});

app.post('/questions', async (req, res) => {
  const questions = req.body; 
  console.log('Received questions for storage or further processing:', questions);
  res.status(201).send({ message: 'Questions submitted successfully' });
});

app.get('/evaluation', async (req, res) => {
  const question = req.query.question;
  const submission = req.query.submission;
  const evaluation = await getEvaluation(question, submission);
  res.json(evaluation);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
