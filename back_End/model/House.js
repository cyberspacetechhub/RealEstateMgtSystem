const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Property = require('./Property');

const HouseSchema = Property.discriminator('House', new Schema({
  bedrooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  squareFootage: {
    type: Number,
    required: true
  },
  docType: {
    type: String,
    required: true
  },
  docImage: {
    type: [String]
  },
  yearBuilt: {
    type: Number,
    required: true
  },
  lotSize: {
    type: Number,
    required: true
  },
  stories: {
    type: Number,
    required: true
  },
  basement: {
    type: String,
    required: true
  },
  amenities: {
    type: [String],
    required: true
  },
  exteriorFeatures: {
    type: [String],
    required: true
  },
  interiorFeatures: {
    type: [String],
    required: true
  },
  livingRoomFeatures: {
    type: [String],
    required: true
  },
  kitchenFeatures: {
    type: [String],
    required: true
  }
}),)

module.exports = HouseSchema;