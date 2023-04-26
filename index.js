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

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.route('/api/shorturl')
  .get((req, res, next) => {
    url = req.url;
    randomHash = ''
    let characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let counter = 0;
    while (counter < length) {
      randomHash += characters.charAt(Math.floor(Math.random() * characters.length));
      counter += 1;
    }
    next();
  }, (req, res) => {
    res.json({ original_url: url, short_url: randomHash });
  })
  .post((req, res) => {
    res.json({ original_url: req.body.url, short_url: randomHash });
  });

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
