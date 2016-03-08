var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    Sighting = require('./Sighting'),
    sightings = require('./controllers/sightingsCtrl');


var app = express();

app.use(bodyParser.json());
app.use(cors());

var port = 8001;
app.listen(port, function() {
  console.log('Long live the King of the North!');
});

app.post('/api/sighting', sightings.create);

app.get('/api/sighting', function(req, res, next) {
  if (req.query === '{}') {
    sightings.index(req, res, next)
  } else {
    sightings.index(req, res, next)
  }
});

app.put('/api/sighting', sightings.update);

app.delete('/api/sighting', sightings.destroy);



module.exports = app;
