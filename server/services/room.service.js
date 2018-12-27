const Room = require('../models/room.model');

class RoomService {

    async getRoom(roomId) {
        return new Promise((res, rej) => {
            Room.find({id: roomId}, (err, room) => {
                if (err) throw err;
                res(room[0]);
            });
        });
    }

    async getRooms() {
        return new Promise((res, rej) => {
            Room.find({}, (err, rooms) => {
                if (err) throw err;
                res(rooms);
            });
        });
    }

    async addRoom(room) {
        return new Promise((res, rej) => {
            // create a new room
            let newRoom = new Room({
                name: room,
                messages: [],
                users: []
            });

            // save to database
            newRoom.save((err, room) => {
                if (err) throw err;
                res(room);
            });
        });
    }

    async addMessage(data) {
        return new Promise((res, rej) => {
            // create a new room
            Room.updateOne({id: data.roomId}, {$push: {messages: data.chatMessage}}, (err) => {
                if (err) throw err;
                res();
            });
        });
    }

    async addUser(room, user) {
        return new Promise((res, rej) => {
            // create a new room
            Room.update(
                {id: room.id, 'users._id': {$ne: user._id}},
                {$push: {users: user}}, (err, obj) => {
                    if (err) throw err;
                    res(obj.nModified);
                });
        });
    }

    async removeUser(room, user) {
        return new Promise((res, rej) => {
            // create a new room
            Room.update(
                {id: room.id},
                {$pull: {users: user}}, (err, obj) => {
                    if (err) throw err;
                    res(obj.nModified);
                });
        });
    }
}

module.exports = new RoomService();