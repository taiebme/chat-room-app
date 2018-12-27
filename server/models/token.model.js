
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create room schema
const tokenSchema = new Schema({
    value: { type: String, required: true }
});

// create a model and using the schema
const Token = mongoose.model('Token', tokenSchema);


module.exports = Token;