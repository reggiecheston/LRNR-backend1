const axios = require('axios');
const express = require('express');
require('dotenv').config();
const OPENAI_API_KEY = process.env.apiKey;
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  axios.get('https://api.openai.com/v1/chat/completions')
    .then((response) => {
      const message = response.data.choices[0].message;
      res.send(`<h1>${message}</h1>`);
    })
    .catch((error) => {
      console.log('Error:', error);
      res.send('<h1>Error occurred</h1>');
    });
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

    console.log(response.data.choices[0]);
  } catch (error) {
    console.error(error);
  }
}

function getInfo() {
  const url = 'https://api.openai.com/v1/chat/completions';
  return axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    })
    .then((response) => {
      console.log(response.data.choices[0].message);
    })
    .catch((error) => console.log('error', error));
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  getChatCompletion();
  getInfo();
});


// print itt into page then fetch from that page
// start making pages