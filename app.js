const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const responseSchema = new mongoose.Schema({
  response: String,
  date: { type: Date, default: Date.now }
});

const Response = mongoose.model('Response', responseSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/submit', async (req, res) => {
  const newResponse = new Response({ response: req.body.response });
  await newResponse.save();
  res.status(200).send(); 
});

app.get('/responses', async (req, res) => {
  const responses = await Response.find().sort({ date: -1 });
  res.json(responses);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
