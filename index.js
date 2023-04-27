require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
/*
app.route('/api/shorturl')
  .get((req, res, next) => {
    link = req.url;
    randomHash = ''
    let characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let counter = 0;
    let length = Math.floor(Math.random() * 10) + 1;
    while (counter < length) {
      randomHash += characters.charAt(Math.floor(Math.random() * characters.length));
      counter += 1;
    }
    next();
  }, (req, res) => {
    res.json({ original_url: link, short_url: randomHash });
  })

.post((req, res) => {
  res.json({ original_url: req.body.url, short_url: req.body.randomHash });
}); */

app.route('/api/shorturl').post((req, res) => {
  let link = req.body.url;
  let randomHash = ''
  let characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let counter = 0;
  let length = Math.floor(Math.random() * 10) + 1;
  while (counter < length) {
    randomHash += characters.charAt(Math.floor(Math.random() * characters.length));
    counter += 1;
  }
  res.json({ original_url: req.body.url, short_url: randomHash });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
