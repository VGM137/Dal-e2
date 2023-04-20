const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");

require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/generate-image', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const configuration = new Configuration({
      apiKey: process.env.DALLE_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    console.log(response.data)
    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error generating image');
  }
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});




/* 
Basic structure for a Node.js server

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
 */
