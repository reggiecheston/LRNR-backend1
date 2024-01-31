const axios = require('axios');
const express = require('express');
require('dotenv').config();
const OPENAI_API_KEY = process.env.apiKey;
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  try {
    const response = await getChatCompletion();
    const message = response.data.choices[0].message;
    res.send(message);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/quiz', (req, res) => {
  res.send('Hello, world!');
});

app.get('/options', (req, res) => {
  res.send('Hello, world!');
});

app.get('/answer', (req, res) => {
  res.send('Hello, world!');
});

async function getChatCompletion() {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: 'Who won the World Series in 2020?' },
          { role: 'assistant', content: 'The Los Angeles Dodgers won the World Series in 2020.' },
          { role: 'user', content: 'Why are you toxic masculine?' },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error response:", error.response);
    throw error;
  }
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});