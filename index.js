require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const dns = require("dns");
const url = require('url');
const mongoose = require('mongoose');
// Basic Configuration
const { Schema } = mongoose;
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const urlDataSchema = new Schema({
  original_url: String,
  short_url: String
})

let UrlData = mongoose.model('Url_Data', urlDataSchema);

let savedData;

const dataSave = (url, shortUrl) => {
  savedData = new UrlData({ original_url: url, short_url: shortUrl });
  savedData.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
}

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
      res.json({ error: 'invalid url' });
    } else {
      dataSave(req.body.url, req.body.randomHash);
      res.json({ original_url: req.body.url, short_url: req.body.randomHash });
    }
  });
});

app.get('/api/shorturl/<short_url>', (req, res) => {
  const redirect = UrlData.find({ short_url: req.params.short_url }, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
    res.redirect(redirect);
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
