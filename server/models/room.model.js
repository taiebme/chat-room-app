
const uuid = require('uuid/v1');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create room schema
const roomSchema = new Schema({
    id: Number,
    name: { type: String, required: true },
    messages: [],
    users: []
});

// implement pre function in order to determine if user exist already
roomSchema.pre('save', function(next) {
    // Only increment when the document is new
    if (this.isNew) {
        User.count().then(res => {
            this.id = res + 1; // Increment count
            next();
        });
    } else {
        next();
    }
});

// create a model and using the schema
const User = mongoose.model('Room', roomSchema);


module.exports = User;