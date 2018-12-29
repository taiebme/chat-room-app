const roomService = require('./services/room.service');

// using socket.io for real-time app functionality
const socket = require('socket.io');


const webSocket = (server) => {

    const io = socket.listen(server);

    // connection socket.io event
    io.sockets.on('connection', (socket) => {

        // using socket in order to join specific clients, chat rooms and also catchaning and emitting events

        // user joined to room event
        socket.on('joinRoom', (data) => {
            let user = {nickname: data.user.nickname, _id: data.user._id};
            roomService.addUser(data.room, user).then((userAdded) => {
                if (userAdded) {
                    socket.join(data.room.id);
                    io.in(data.room.id).emit('new user', user);
                }
            });
        });

        // user joined to room event
        socket.on('joinRooms', () => {
            socket.join('rooms');
        });

        // user joined to room event
        socket.on('leaveRoom', (data) => {
            let user = {nickname: data.user.nickname, _id: data.user._id};
            roomService.removeUser(data.room, user).then((userRemoved) => {
                if (userRemoved) {
                    socket.leave(data.room.id);
                    io.in(data.room.id).emit('user left', user);
                }
            });
        });

        // new room event
        socket.on('room', (data) => {
            // emitting the 'new room' event to the clients in the rooms page
            io.in('rooms').emit('new room', {id: data.id, name: data.name});
        });


        // new message event
        socket.on('message', (data) => {
            // emitting the 'new message' event to the clients in particular room
            roomService.addMessage(data).then(() => {
                io.in(data.roomId).emit('new message', data.chatMessage);
            });


        });

    });
};

module.exports = webSocket;