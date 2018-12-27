const User = require('../models/user.model');
const Token = require('../models/token.model');

class AuthService {

    async signIn(email, password) {
        return new Promise((res, rej) => {
            // authentication process
            User.find({email, password}, (err, obj) => {
                if (err || !obj[0]) rej();
                res(obj[0]);
            });
        });
    }

    async signUp(user) {
        return new Promise((res, rej) => {
            // create a new user
            let newUser = new User(user);

            // set user token
            newUser.setToken((err) => {
                if (err) rej(err);
            });
            let newToken = new Token({value: newUser.token});

            // save to database
            newUser.save((err, user) => {
                if (err || !user) rej(err);
                newToken.save((err, token) => {
                    if (err) rej(err);
                    else if (!token) rej(err);
                    else res(user);
                });

            });
        });


    }


    async isValidToken(token) {
        return new Promise((res, rej) => {
            // create a new user
            Token.find({value: token}, (err, obj) => {
                if (err) rej(err);
                res(!!obj[0]);
            });
        });
    }

}

module.exports = new AuthService();