const roomService = require('../services/room.service');

class AuthController {

    async getRooms(req, res) {
        const result = await roomService.getRooms();
        if(result){
            res.status(200).json({rooms: result});
        }
        else {
            res.status(500).json({error:'invalid email or password'});
        }

    }

    async getRoom(req, res) {
        const result = await roomService.getRoom(req.params.roomId);
        if(result){
            res.status(200).json({room: result});
        }
        else {
            res.status(500).json({error:'invalid email or password'});
        }

    }

    async addRoom(req, res) {
        const result = await roomService.addRoom(req.body.name);
        if(result) {
            res.status(200).json(result)
        }
    }
}


module.exports = new AuthController();