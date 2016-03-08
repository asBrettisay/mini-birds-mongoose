var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose');

var app = express();

app.use(bodyParser.json());
app.use(cors());


mongoose.connect('mongodb://localhost/mini-birds-mongoose');
mongoose.connection.once('open', function() {
  console.log('Connected to Mongo');
});

var port = 8001;
app.listen(port, function() {
  console.log('Long live the King of the North!');
})

app.get('/', function(req, res, next) {
  res.status(200).send('Hi!');
})

module.exports = app;
