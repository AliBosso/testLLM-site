const express = require('express');
const bodyParser = require('body-parser');
const openai = require('openai');

const app = express();
const port = 3000;

// Set up OpenAI API
const apiKey = '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';
const openaiClient = new openai.OpenAIApi({
  apiKey: apiKey
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to chatbot response
app.post('/chat', async (req, res) => {
  try {
    const question = req.body.question;
    const response = await openaiClient.completions.create({
      model: 'text-davinci-003',
      prompt: `Generate a response to the following question: "${question}"`,
      max_tokens: 50
    });

    res.json({
      response: response.choices[0].text.trim()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'An error occurred while processing your request.'
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
