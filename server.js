const axios = require('axios');
const express = require('express');
require('dotenv').config();
const OPENAI_API_KEY = process.env.apiKey;
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  try {
    const response = await getChatCompletion();
    //ensures the message is a string not object
    const message = response.data.choices[0].message.content || 'No message received';
    res.send(`<!DOCTYPE html><html><head><title>API Response</title></head><body><h1>${message}</h1></body></html>`);
  } catch (error) {
    console.log('Error:', error);
    res.send('<h1>Error occurred</h1>');
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