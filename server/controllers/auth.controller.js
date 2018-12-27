const authService = require('../services/auth.service');

class AuthController {

    // signIn
    async signIn(req, res) {
        let user;
        try {
            user = await authService.signIn(req.body.email, req.body.password);
        } catch (e) {
            res.status(401).json({message: 'Invalid email or password'});
        }
        res.status(200).json(this.getResponseUser(user));
    }

    async signUp(req, res) {
        let user;
        try {
            user = await authService.signUp(req.body);
        } catch (e) {
            res.status(500).json({message: 'User already exist'});
        }
        res.status(200).json(this.getResponseUser(user));

    }

    getResponseUser(user) {
        return {
            _id: user._id,
            nickname: user.nickname,
            token: user.token
        };
    }

    async isValidToken(token) {
        return authService.isValidToken(token);
    }

}


module.exports = new AuthController();