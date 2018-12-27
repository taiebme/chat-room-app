const roomService = require('../services/message.service');

class AuthController {

    async newMessage(req, res) {
        const result = await roomService.newMessage(req.body);
        if(result){
            res.status(200).json(result);
        }
        else {
            res.status(500).json({error:'invalid email or password'});
        }

    }
}


module.exports = new AuthController();