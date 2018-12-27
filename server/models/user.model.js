const uuid = require('uuid/v1');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;



// create user schema
const userSchema = new Schema({
    nickname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: String
});

// custom method to add user token
userSchema.methods.setToken = function() {
    // set uuid
    this.token = uuid();

    return this.token;
};
// create a model and using the schema
const User = mongoose.model('User', userSchema);


module.exports = User;