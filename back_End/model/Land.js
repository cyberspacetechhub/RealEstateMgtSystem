const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Property = require('./Property');

const LandSchema = Property.discriminator('Land', new Schema({
  plots: {
    type: String,
    required: true
  },
  docType: {
    type: String,
    required: true
  },
  docImages: {
    type: [String],
    required: true
  },
  ownershipType: {
    type: String,
    required: true
  }
}));

module.exports = LandSchema;