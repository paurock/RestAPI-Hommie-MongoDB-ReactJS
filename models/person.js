const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create geolocation Schema
const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    index: "2dsphere"
  }
});

//create person schema and model
const PersonSchema = new Schema({
  name: {
    type: String,
    required: [true, "The name field is required"]
  },
  rank: {type: String},
  available: {
    type: Boolean,
    default: false
  },
  geometry: GeoSchema
});

const Person = mongoose.model("person", PersonSchema);

module.exports = Person;
