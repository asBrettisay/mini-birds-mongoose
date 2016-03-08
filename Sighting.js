var mongoose = require('mongoose'),

var sightingSchema = new mongoose.Schema({
  name: {type: String, lowercase: true, index: true},
  order: {type: String, maxlength: 20, index: true},
  status: {
    type: String,
    lowercase: true,
    enum: ["extinct", "least concern", "near threatened"]
  },
  numberSeen: {type: String, min: 1},
  confirmed: { type: Boolean, default: false },
})

sightingSchema.pre('update', function(){
  this.update({}, {$set: {updatedAt: new Date()}});
});

module.exports = mongoose.model('Sighting', sightingSchema);
