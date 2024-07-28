const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

const responseSchema = new mongoose.Schema({
  response: String,
  date: { type: Date, default: Date.now }
});

const Response = mongoose.model('Response', responseSchema);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/styles.css', (req, res) => {
  console.log('Serving styles.css');
  res.sendFile(__dirname + '/public/styles.css');
});

app.use('/script.js', (req, res) => {
  console.log('Serving script.js');
  res.sendFile(__dirname + '/public/script.js');
});

app.use('/images/favicon.jpg', (req, res) => {
  console.log('Serving favicon.jpg');
  res.sendFile(__dirname + '/public/images/favicon.jpg');
});

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/submit', async (req, res) => {
	console.log('Request body:', req.body); 
	try {
	  const newResponse = new Response({ response: req.body.response });
	  await newResponse.save();
	  console.log('Response saved:', newResponse);
	  res.status(200).send();
	} catch (error) {
	  console.error('Error saving response:', error);
	  res.status(500).send('Error saving response');
	}
  });

app.get('/responses', async (req, res) => {
  try {
    const responses = await Response.find().sort({ date: -1 });
    console.log('Responses fetched:', responses);
    res.json(responses);
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).send('Error fetching responses');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});