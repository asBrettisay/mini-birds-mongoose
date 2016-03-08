var mongoose = require('mongoose'),
    Sighting = require('../Sighting.js');


mongoose.connect('mongodb://localhost/mini-birds-mongoose');



module.exports = {
  create: function(req, res, next) {
    var sighting = new Sighting(req.body);
    sighting.save(function(err) {
      if (err) {
        res.status(500).send();
        console.log(err);
      } else {
        res.status(200).json(sighting);
      }
    });
  },

  index: function(req, res, next) {
    Sighting.find(function(err, sighting) {
      res.status(200).send(sighting);
    })
  },


  show: function(req, res, next) {

    console.log('Showing...')
    Sighting.findById(req.query.id, function(err, sighting) {
      if (err) {
        console.log(err)
        res.status(500).send();
      } else {
        res.status(200).json(sighting);
      }
    })
  },


  update: function(req, res, next) {
    console.log('Updating..')
    Sighting.update({_id: req.query.id}, req.body, function(err, s) {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        res.status(200).send(s);
      }
    })
  },


  destroy: function(req, res, next) {
    Sighting.remove(req.query.id, function(err, s) {
      if (err) {
        res.status(500).send();
        console.log(err)
      } else {
        res.status(200).send();
      }
    })
  }
}
