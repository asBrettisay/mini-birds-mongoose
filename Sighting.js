var mongoose = require('mongoose'),

var sightingSchema = new mongoose.Schema({
  name: {type: String, lowercase: true},
  order: {type: String, maxlength: 20},
  status: {enum: {type: String, lowercase: true}},
  confirmed: {type: Boolean, default: false},
  numberSeen: {type: Number, min: 1}
})

sightingSchema.pre('update', function() {
  this.update({}, {$set: {updatedAt: new Date()}});
}
