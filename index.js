require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const dns = require("dns");
const url = require('url');
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint

app.route('/api/shorturl').post((req, res) => {
    const parsedUrl = url.parse(req.body.url);
    let randomHash = ''
    let characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let counter = 0;
    let length = Math.floor(Math.random() * 10) + 1;
    while (counter < length) {
      randomHash += characters.charAt(Math.floor(Math.random() * characters.length));
      counter += 1;
    }
  req.body.randomHash = randomHash;
    dns.lookup(parsedUrl.hostname, (error, address, family) => {
      if (error) {
        res.json({error: 'invalid url'});
      } else {
        res.json({ original_url: req.body.url, short_url: req.body.randomHash });
      }
    });
  });


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
